import { get } from "env-var";

export const env = {
  NEXT_PUBLIC_API_URL: get("NEXT_PUBLIC_API_URL").required().asUrlString(),
};
