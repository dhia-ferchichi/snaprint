import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  nitro: false, // 👈 Disables Lovable's default Cloudflare engine override
  vite: {
    plugins: [
      nitro({
        preset: "vercel", // 👈 Forces compilation for Vercel Serverless Functions
      }),
    ],
  },
});
