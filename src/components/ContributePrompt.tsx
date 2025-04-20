"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Button } from "./ui/button";
import { useUser } from "@/app/UserContext";

function ContributePrompt() {
  const [open, setOpen] = useState(false);
  const { hasContributed } = useUser();
  useEffect(() => {
    if (hasContributed) return;

    const timeout = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(timeout);
  }, [hasContributed]);

  if (!open) return null; // Don’t render anything unless open

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="rounded-xl w-4/5"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Like what you see?</AlertDialogTitle>
          <AlertDialogDescription>
            Contribute 1 study material to access unlimited content for free!
            This will only take a few seconds 🤓
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Link href="/contribute">
          <AlertDialogFooter>
            <Button>Continue</Button>
          </AlertDialogFooter>
        </Link>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ContributePrompt;
