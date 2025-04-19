"use client";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Notify opener and close popup
    if (window.opener) {
      window.opener.postMessage({ type: "auth-success" }, window.origin);
      setTimeout(() => {
        window.close();
      }, 1000); // Close after 3 seconds
    }
  }, []);
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm text-center">
        <Card className="mx-auto w-full max-w-sm p-6">
          <div className="font-semibold leading-none tracking-tight">
            Login/Signup completed ✅
          </div>
          {/* <div className="text-muted-foreground mt-2">
            Please close this tab{" "}
          </div> */}
        </Card>
      </div>
    </div>
  );
}
