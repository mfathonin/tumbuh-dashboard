"use server";

import { NavigationRoutes } from "@/lib/constants";
import { createClient } from "@/lib/supaclient/server";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
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
  password: z.string().min(8, "Password minimum 8 characters length"),
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
