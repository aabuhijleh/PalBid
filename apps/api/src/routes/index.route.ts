import * as HttpStatusCodes from "stoker/http-status-codes";
import { createRouter } from "../lib/create-app";

const router = createRouter();

export const indexRoute = router.get("/", (c) => {
  return c.json(
    { message: "Hello from PalBid API service 👋" },
    HttpStatusCodes.OK,
  );
});
