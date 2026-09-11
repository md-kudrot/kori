import "dotenv/config";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Support both MONGODB_URI (canonical) and Mongodb_URI (existing .env key)
const mongoUri = process.env.MONGODB_URI || process.env.Mongodb_URI;

if (!mongoUri) {
    throw new Error("MONGODB_URI / Mongodb_URI is not set in .env");
}

const client = new MongoClient(mongoUri);
const db = client.db("kori");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: (process.env.BETTER_AUTH_URL || "http://localhost:5173").replace(/\/$/, ""),
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "buyer",
                input: true,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 7 * 24 * 60 * 60,
        },
    },
    plugins: [jwt()],
    trustedOrigins: [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5174",
        (process.env.BETTER_AUTH_URL || "").replace(/\/$/, ""),
        (process.env.VITE_BETTER_AUTH_URL || "").replace(/\/$/, ""),
    ].filter(Boolean) as string[],
});
