import { AuthForm } from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Form from "next/form";
import { loginWithPassword } from "@/app/auth/actions";

export default function LoginPage() {
  return (
    <AuthForm>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or login with
        </span>
      </div>
      <Form action={loginWithPassword}>
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
          <div className="flex gap-2 flex-col-reverse">
            <Input
              name="password"
              minLength={8}
              type="password"
              required
              placeholder="Password"
            />
            <div className="flex items-center h-5">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </Form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href={"./register"} className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </AuthForm>
  );
}
