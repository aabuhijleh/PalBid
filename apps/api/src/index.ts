import { serve } from "@hono/node-server";
import { env } from "./config/env";
import app from "./app";

serve({
  fetch: app.fetch,
  port: env.PORT,
});

console.log(`🔥 API server is running on port: http://localhost:${env.PORT}`);
