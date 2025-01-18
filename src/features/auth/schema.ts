import { z } from "zod";

const email = z.string().min(1, "Email is required").email("Invalid email");
const password = z
  .string()
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

export const loginSchema = z.object({
  email: email,
  password: password.min(1, "Password is required"),
});

export const signUpSchema = z.object({
  email: email,
  password: password.min(8, "Password minimum 8 characters length"),
});
