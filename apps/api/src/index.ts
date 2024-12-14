import { serve } from "@hono/node-server";
import { config } from "dotenv-safe";
import { createRouter } from "./router";

config();

const router = createRouter();
const port = parseInt(process.env.PORT!);

serve({
  fetch: router.fetch,
  port,
});

console.log(`🔥 API server is running on port: http://localhost:${port}`);

export type AppType = typeof router;
