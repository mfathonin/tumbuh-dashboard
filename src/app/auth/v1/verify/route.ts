import { createClient } from "@/lib/supaclient/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token");
  const type = searchParams.get("type") as EmailOtpType | null;
  let next = searchParams.get("redirect_to") ?? "/dashboard";
  const allowedPaths = ["/dashboard", "/profile", "/settings"];
  if (!allowedPaths.includes(next)) {
    next = "/dashboard";
  }
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("redirect_to");

  if (token_hash && type) {
    const supabase = await createClient();

    const {
      error,
      data: { session },
    } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // pass the session or user to the next route
      const newResponse = NextResponse.redirect(redirectTo);

      if (session?.access_token)
        newResponse.cookies.set("sb-access-token", session.access_token);
      if (session?.refresh_token)
        newResponse.cookies.set("sb-refresh-token", session.refresh_token);
      return newResponse;
    } else {
      if (error?.code) redirectTo.searchParams.set("error_code", error.code);
      if (error?.message)
        redirectTo.searchParams.set("error_description", error.message);
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = "/auth/code-error";
  return NextResponse.redirect(redirectTo);
}
