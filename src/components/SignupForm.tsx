"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";
import { CircleAlert } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";
import Image from "next/image";

interface SignupFormProps {
  heading?: string;
  subheading?: string;
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
}

const SignupForm = ({
  heading = "Sign up",
  subheading = "Welcome to NoteShare!",
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "/login",
}: SignupFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError(result.message || "Signup unsuccessful!");
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
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
                  placeholder="Enter your email"
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
                {error && (
                  <div className="flex items-center gap-1">
                    <CircleAlert size="20px" color="#ef4444" />
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
                <Button variant="outline" className="w-full">
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button>
              </div>
            </form>
            <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
              <p>{loginText}</p>
              <a href={loginUrl} className="font-medium text-primary">
                Login
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { SignupForm };
