"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/CustomDialog";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export function LoginSignupDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [dialogMode, setDialogMode] = useState<"login" | "signup">("signup");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {dialogMode === "login" ? (
          <LoginForm
            className="!py-3"
            setDialogOpen={onOpenChange}
            setDialogModeToSignup={() => setDialogMode("signup")}
            subheading="Welcome back! Please login before contributing 🤓"
          />
        ) : (
          <SignupForm
            className="!py-3"
            setDialogOpen={onOpenChange}
            setDialogModeToLogin={() => setDialogMode("login")}
            subheading="Welcome! Please signup before contributing 🤓"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
