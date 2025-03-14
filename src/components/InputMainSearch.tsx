import * as React from "react";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

const InputMainSearch = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <>
      <div
        className={cn(
          "flex items-center border border-input rounded-md shadow-sm w-full bg-background",
          className
        )}
      >
        <SearchIcon className="h-[16px] w-[16px] ml-3 flex-shrink-0" />
        <input
          type={type}
          className={cn(
            "h-9 w-full border-input text-muted-foreground px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          )}
          ref={ref}
          {...props}
        />
      </div>
    </>
  );
});
InputMainSearch.displayName = "Input";

export { InputMainSearch };
