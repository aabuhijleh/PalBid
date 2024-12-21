import { createApp } from "./lib/create-app";
import { indexRoute } from "./routes/index.route";
import { userRoute } from "./routes/user.route";
import { listingRoute } from "./routes/listing.route";
import configureOpenAPI from "./lib/configure-open-api";

const app = createApp();

void configureOpenAPI(app);

const routedApp = app
  .route("/", indexRoute)
  .route("/users", userRoute)
  .route("/listings", listingRoute);

export default routedApp;

export type AppType = typeof routedApp;
