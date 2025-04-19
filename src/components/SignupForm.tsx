"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";
import { CircleAlert } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";
import Image from "next/image";
import { useUser } from "@/app/UserContext";
import Link from "next/link";

interface SignupFormProps {
  heading?: string;
  subheading?: string;
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
  className?: string;
  setDialogOpen?: (open: boolean) => void;
  setDialogModeToLogin?: () => void;
}

const SignupForm = ({
  heading = "Sign up",
  subheading = "Welcome to NoteShare!",
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "/login",
  className,
  setDialogOpen,
  setDialogModeToLogin,
}: SignupFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { fetchUser } = useUser();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Input validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        await fetchUser();
        setDialogOpen
          ? setDialogOpen(false)
          : // : router.push(
            //     redirectTo || `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding`
            //   );
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/onboarding`);
      } else {
        setError(result.message || "Signup unsuccessful!");
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred, please try again");
      setLoading(false);
    }
  };

  return (
    <section className={`pt-10 pb-32 ${className ?? ""}`}>
      <div className="container">
        <div className="flex flex-col gap-4">
          <Card className="mx-auto w-full max-w-sm p-6">
            <div className="mb-6 flex flex-col items-center text-center">
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
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
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
                  {loading ? <LoadingSpinner /> : signupText}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={async () => {
                    const popup = window.open(
                      `/api/oauth/google`,
                      "googleLogin",
                      "width=500,height=600"
                    );

                    const checkLogin = setInterval(async () => {
                      if (popup?.closed) {
                        clearInterval(checkLogin);
                        // Now check if user is logged in
                        const res = await fetch("/api/getUser", {
                          credentials: "include",
                        });
                        if (res.ok) {
                          const data = await res.json();
                          if (data.user) {
                            await fetchUser();
                            setDialogOpen
                              ? setDialogOpen(false)
                              : router.push(redirectTo || "/");
                          }
                        }
                      }
                    }, 500);
                  }}
                >
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button>
              </div>
            </form>
            <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
              <p>{loginText}</p>
              {setDialogModeToLogin ? (
                <button
                  type="button"
                  onClick={setDialogModeToLogin}
                  className="font-medium text-primary hover:underline"
                >
                  Login
                </button>
              ) : (
                <Link
                  href={
                    redirectTo
                      ? `${loginUrl}?redirect=${encodeURIComponent(redirectTo)}`
                      : loginUrl
                  }
                  className="font-medium text-primary"
                >
                  Login
                </Link>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { SignupForm };
