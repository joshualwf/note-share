import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function FilterSheet() {
  return (
    <Sheet>
      <SheetTrigger className=" text-sm font-medium px-4 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
        Filters
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <div>school, mod, content type</div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default FilterSheet;
