import { z } from "zod";

export const saveUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  nick: z.string().min(1, "Nick is required"),
});
