import HomePage from "@/components/HomePage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<>Loading...</>}>
        <HomePage />
    </Suspense>
  );
}