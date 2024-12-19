import { from } from "env-var";

const vars = from({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
});

export const env = {
  NEXT_PUBLIC_API_URL: vars.get("NEXT_PUBLIC_API_URL").required().asString(),
  UPLOADTHING_TOKEN: vars.get("UPLOADTHING_TOKEN").asString(),
};
