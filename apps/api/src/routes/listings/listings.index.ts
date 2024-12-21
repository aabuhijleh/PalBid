import { createRouter } from "../../lib/create-app";
import * as routes from "./listings.routes";
import * as handlers from "./listings.handlers";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create);

export default router;
