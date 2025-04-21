"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CircleAlert } from "lucide-react";
import { useUser } from "../UserContext";
import onboardingAnimationData from "@/app/assets/handshake-animation.json";
import dynamic from "next/dynamic";

export default function Page() {
  const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { fetchUser } = useUser();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const sanitizedUsername = username.trim().toLowerCase();
    const usernameRegex = /^[a-z0-9_]{1,20}$/;
    if (!usernameRegex.test(sanitizedUsername)) {
      setError(
        "Username can only contain letters, numbers, or underscores (max 20 characters)."
      );
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/onboarding/submitForm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: sanitizedUsername }),
          credentials: "include",
        }
      );
      const result = await res.json();

      if (res.ok) {
        await fetchUser();
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}`);
      } else {
        setError(result.message || "Invalid username");
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred, please try again");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <section className="pt-10 pb-32">
          <div className="container">
            <div className="flex flex-col gap-4">
              <Card className="mx-auto w-full max-w-sm p-6">
                <div className="mb-6 flex flex-col items-center">
                  <Lottie
                    animationData={onboardingAnimationData}
                    className="h-[170px]"
                  />
                  <p className="mb-2 text-2xl font-bold">Welcome!</p>
                  <p className="text-muted-foreground">
                    Pick a unique username
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <Input
                      placeholder="Username"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                      {loading ? <LoadingSpinner /> : "Get started"}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
