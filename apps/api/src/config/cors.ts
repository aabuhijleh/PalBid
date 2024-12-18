import { env } from "./env";

export const corsOptions = {
  origin: [env.WEB_URL],
  credentials: true,
};
