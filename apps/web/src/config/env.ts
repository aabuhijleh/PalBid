import { from } from "env-var";

const vars = from({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

export const env = {
  NEXT_PUBLIC_API_URL: vars.get("NEXT_PUBLIC_API_URL").required().asUrlString(),
};
