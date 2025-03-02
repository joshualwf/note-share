import React, { useState } from "react";
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

import { Combobox } from "./ComboBox";
import { RESOURCE_TYPES } from "@/app/constants/constants";
import { Button } from "./ui/button";

interface FilterSheetProps {
  resourceTypesFilter: string[];
  setResourceTypesFilter: (value: string[]) => void;
  schoolFilter: string | null;
  setSchoolFilter: (value: string | null) => void;
}
function FilterSheet({
  resourceTypesFilter,
  setResourceTypesFilter,
  schoolFilter,
  setSchoolFilter,
}: FilterSheetProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Track sheet open state
  const [sheetSide, setSheetSide] = useState<"top" | "right">("right");
  const resourceTypes = RESOURCE_TYPES;

  const getUpdatedResourceTypes = (prev: string[], type: string): string[] => {
    if (!Array.isArray(prev)) return [];

    return prev.includes(type)
      ? prev.filter((item) => item !== type)
      : [...prev, type];
  };

  const toggleResourceType = (type: string) => {
    const updatedResourceTypesFilter = getUpdatedResourceTypes(
      resourceTypesFilter,
      type
    );
    setResourceTypesFilter(updatedResourceTypesFilter);
  };

  const handleOpen = (open: boolean) => {
    if (open) {
      // Determine the sheet side only when the sheet is about to open
      setSheetSide(window.innerWidth >= 768 ? "right" : "top");
    }
    setIsSheetOpen(open);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleOpen} modal={false}>
      {isSheetOpen && (
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-9000 ${
            isSheetOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSheetOpen(false)}
        ></div>
      )}
      <SheetTrigger className=" text-sm font-medium px-4 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
        Filters
      </SheetTrigger>
      <SheetContent side={sheetSide}>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Resource Type</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-row gap-2">
                  {resourceTypes.map((type) => (
                    <Button
                      variant={"outline"}
                      key={type}
                      value={type}
                      aria-label={`Toggle ${type}`}
                      onClick={() => toggleResourceType(type)}
                      className={
                        resourceTypesFilter.includes(type)
                          ? "border-primary bg-slate-100"
                          : ""
                      }
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>School</AccordionTrigger>
              <AccordionContent className="flex-start flex">
                <Combobox
                  selectedValue={schoolFilter}
                  setSelectedValue={setSchoolFilter}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Module</AccordionTrigger>
              <AccordionContent className="flex-start flex">
                {/* <Combobox /> */}coming soon!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default FilterSheet;
