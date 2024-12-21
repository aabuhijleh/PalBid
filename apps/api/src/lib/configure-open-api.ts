import { env } from "../config/env";
import type { AppOpenAPI } from "./types";

export default async function configureOpenAPI(app: AppOpenAPI) {
  const { apiReference } = await import("@scalar/hono-api-reference"); // ESM module, needs to be imported dynamically

  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Tasks API",
    },
  });

  app.get(
    "/reference",
    apiReference({
      baseServerURL: env.NODE_ENV === "production" ? env.API_URL : undefined,
      theme: "kepler",
      layout: "classic",
      spec: {
        url: "/doc",
      },
    }),
  );
}
