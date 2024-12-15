import type { Session } from "hono-sessions";

export interface SessionData {
  userId: string;
}

export interface ServerContext {
  Variables: {
    session: Session<SessionData>;
    session_key_rotation: boolean;
  };
}
