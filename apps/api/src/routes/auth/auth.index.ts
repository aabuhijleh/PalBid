import { createRouter } from "../../lib/create-app";
import * as routes from "./auth.routes";
import * as handlers from "./auth.handlers";

const router = createRouter()
  .openapi(routes.signInWithGoogle, handlers.signInWithGoogle)
  .openapi(routes.signOut, handlers.signOut);

export default router;
