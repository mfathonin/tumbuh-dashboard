"use server";

import { NavigationRoutes } from "@/lib/constants";
import { createClient } from "@/lib/supaclient/server";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const loginWithPassword = async (formData: FormData) => {
  const supabase = await createClient();

  const parse = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parse.success)
    redirect("/auth/login?invalid-data", RedirectType.replace);

  const { email, password } = parse.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) redirect("/auth/login?" + error.code, RedirectType.replace);

  redirect(NavigationRoutes.navMain[0].url);
};

const signUpSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(8, "Password minimum 8 characters length")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const signUpWithEmailPassword = async (formData: FormData) => {
  const supabase = await createClient();
  const rowFormData = Object.fromEntries(formData.entries());
  const parse = signUpSchema.safeParse(rowFormData);
  if (!parse.success) redirect("/auth/register?invalid-data");

  const { email, password } = parse.data;
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) redirect("/auth/register?" + error.code, RedirectType.replace);

  redirect("/auth/confirm-email");
};

export const logout = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) redirect("?logout-error");
};
