"use server";

import { NavigationRoutes } from "@/libs/constants";
import { createClient } from "@/services/supabase/server";
import { redirect, RedirectType } from "next/navigation";
import { loginSchema, signUpSchema } from "./schema";

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
