"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "./ui/card";
import { LoadingSpinner } from "./LoadingSpinner";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/app/UserContext";

interface LoginFormProps {
  heading?: string;
  subheading?: string;
  loginText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const LoginForm = ({
  heading = "Login",
  subheading = "Welcome back!",
  loginText = "Login",
  googleText = "Login with Google",
  signupText = "Don't have an account?",
  signupUrl = "/signup",
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { fetchUser } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensures cookies are included
      });

      const result = await res.json();

      if (res.ok) {
        await fetchUser();
        router.push(redirectTo);
      } else {
        setError(result.message || "Invalid email or password");
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred, please try again");
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="pt-10 pb-32">
        <div className="container">
          <div className="flex flex-col gap-4">
            <Card className="mx-auto w-full max-w-sm p-6">
              <div className="mb-6 flex flex-col items-center">
                <Image
                  src="/icon9.png"
                  width="60"
                  height="60"
                  alt="standing nerd"
                />
                <p className="mb-2 text-2xl font-bold">{heading}</p>
                <p className="text-muted-foreground">{subheading}</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="border-muted-foreground"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password
                    </a>
                  </div>
                  {error && (
                    <div className="flex items-center gap-1">
                      <div>
                        <CircleAlert size="20px" color="#ef4444" />
                      </div>
                      <span className="text-center text-sm text-red-500">
                        {error}
                      </span>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="mt-2 w-full"
                    disabled={loading}
                  >
                    {loading ? <LoadingSpinner /> : loginText}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => (window.location.href = "/api/oauth/google")}
                  >
                    <FcGoogle className="mr-2 size-5" />
                    {googleText}
                  </Button>
                </div>
                <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                  <p>{signupText}</p>
                  <a
                    href={`${signupUrl}?redirect=${encodeURIComponent(
                      redirectTo
                    )}`}
                    className="font-medium text-primary"
                  >
                    Sign up
                  </a>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export { LoginForm };
