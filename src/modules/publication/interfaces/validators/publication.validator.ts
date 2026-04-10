import { z } from "zod";

export const addPublicationSchema = z.object({
  text: z.string().min(1, "The text is required"),
});
