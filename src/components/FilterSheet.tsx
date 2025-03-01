import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Combobox } from "./ComboBox";

function FilterSheet() {
  return (
    <Sheet>
      <SheetTrigger className=" text-sm font-medium px-4 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
        Filters
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Resource Type</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-row gap-2">
                  <ToggleGroup type="multiple" variant="outline">
                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                      Notes
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                      Exam Papers
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="strikethrough"
                      aria-label="Toggle strikethrough"
                    >
                      Solutions
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>School</AccordionTrigger>
              <AccordionContent className="flex-start flex">
                <Combobox />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Module</AccordionTrigger>
              <AccordionContent className="flex-start flex">
                <Combobox />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default FilterSheet;
