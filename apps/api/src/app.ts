import { createApp } from "./lib/create-app";
import { indexRoute } from "./routes/index.route";
import { userRoute } from "./routes/user.route";
import { listingRoute } from "./routes/listing.route";

const app = createApp();

export default app
  .route("/", indexRoute)
  .route("/users", userRoute)
  .route("/listings", listingRoute);

export type AppType = typeof app;
