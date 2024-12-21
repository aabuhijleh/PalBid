import { createRouter } from "../../lib/create-app";
import * as routes from "./users.routes";
import * as handlers from "./users.handlers";

const router = createRouter().openapi(routes.me, handlers.me);

export default router;
