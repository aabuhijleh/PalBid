import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Session } from "hono-sessions";

export interface SessionData {
  userId: string;
}

export interface AppBindings {
  Variables: {
    session: Session<SessionData>;
    session_key_rotation: boolean;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
