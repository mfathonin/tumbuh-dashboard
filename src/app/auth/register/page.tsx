import { AuthForm } from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Form from "next/form";
import Link from "next/link";
import { signUpWithEmailPassword } from "../actions";

export default function LoginPage() {
  return (
    <AuthForm>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or sign up with
        </span>
      </div>
      <Form action={signUpWithEmailPassword}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              minLength={1}
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex h-5 justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <div className="text-xs text-muted-foreground italic">
                8 Chars, Alphanumeric, Special Char.
              </div>
            </div>
            <Input
              name="password"
              minLength={8}
              type="password"
              required
              placeholder="Password"
              autoComplete="new-password"
              spellCheck="false"
              autoCapitalize="none"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </div>
      </Form>
      <div className="text-center text-sm">
        Have an account?{" "}
        <Link href="./login" className="underline underline-offset-4">
          Login here
        </Link>
      </div>
    </AuthForm>
  );
}
