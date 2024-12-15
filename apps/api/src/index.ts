import { serve } from "@hono/node-server";
import { env } from "./config/env";
import { createRouter } from "./router";

const router = createRouter();

serve({
  fetch: router.fetch,
  port: env.PORT,
});

console.log(`🔥 API server is running on port: http://localhost:${env.PORT}`);

export type AppType = typeof router;
