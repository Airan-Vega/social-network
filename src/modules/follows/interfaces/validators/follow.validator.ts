import { z } from "zod";

export const addFollowSchema = z.object({
  followedId: z.string().min(1, "Followed Id is required"),
});
