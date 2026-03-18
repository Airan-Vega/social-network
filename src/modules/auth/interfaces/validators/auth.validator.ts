import { z } from "zod";

export const authCredentialsSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const renewTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});
