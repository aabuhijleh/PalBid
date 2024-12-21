import { ListingSchema, UserSchema } from "../../database/prisma/generated/zod";

export const ListingWithUserSchema = ListingSchema.extend({
  user: UserSchema.pick({
    id: true,
    name: true,
    avatar: true,
  }),
});

export const createListingSchema = ListingSchema.pick({
  image: true,
}).extend({
  image: ListingSchema.shape.image.url("Invalid image URL"),
});
