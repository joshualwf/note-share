import { LoginForm } from "@/components/LoginForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<>Loading...</>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
