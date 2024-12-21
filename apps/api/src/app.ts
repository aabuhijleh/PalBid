import createApp from "./lib/create-app";
import configureOpenAPI from "./lib/configure-open-api";
import index from "./routes/index.route";
import auth from "./routes/auth/auth.index";
import users from "./routes/users/users.index";
import listings from "./routes/listings/listings.index";

const app = createApp();

void configureOpenAPI(app);

const routes = [index, auth, users, listings] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
