import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../src/lib/auth";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// CORS — allow Vite dev server to send cookies
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://localhost:5174",
            (process.env.BETTER_AUTH_URL || "").replace(/\/$/, ""),
            (process.env.VITE_BETTER_AUTH_URL || "").replace(/\/$/, ""),
        ].filter(Boolean) as string[],
        credentials: true,
    })
);

// Better Auth handles its own body parsing — mount before express.json for auth routes
// Using app.use avoids Express 5 wildcard path-to-regexp issues (/*splat vs /*)
app.use("/api/auth", toNodeHandler(auth));

// Fallback for any nested path that needs explicit wildcard (Express 5: /api/auth/{*any})
app.all("/api/auth/{*any}", toNodeHandler(auth));

// JSON parsing for your own API routes (add below)
app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "kori-auth" });
});

app.listen(PORT, () => {
    console.log(`[kori] auth server listening on http://localhost:${PORT}`);
    console.log(`[kori] Better Auth handler at http://localhost:${PORT}/api/auth/*`);
});
