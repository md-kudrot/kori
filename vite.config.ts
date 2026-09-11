import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        proxy: {
            "/api/auth": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
})

