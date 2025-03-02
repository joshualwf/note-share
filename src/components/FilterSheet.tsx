import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
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
import { MODCODES, RESOURCE_TYPES, SCHOOLS } from "@/app/constants/constants";
import { Button } from "./ui/button";

interface FilterSheetProps {
  resourceTypesFilter: string[];
  setResourceTypesFilter: (value: string[]) => void;
  schoolFilter: string | null;
  setSchoolFilter: (value: string | null) => void;
  modCodeFilter: string | null;
  setModCodeFilter: (value: string | null) => void;
}

function FilterSheet({
  resourceTypesFilter,
  setResourceTypesFilter,
  schoolFilter,
  setSchoolFilter,
  modCodeFilter,
  setModCodeFilter,
}: FilterSheetProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetSide, setSheetSide] = useState<"top" | "right">("right");
  const resourceTypes = RESOURCE_TYPES;

  const getUpdatedResourceTypes = (prev: string[], type: string): string[] => {
    if (!Array.isArray(prev)) return [];
    return prev.includes(type)
      ? prev.filter((item) => item !== type)
      : [...prev, type];
  };

  const toggleResourceType = (type: string) => {
    setResourceTypesFilter(getUpdatedResourceTypes(resourceTypesFilter, type));
  };

  const handleOpen = (open: boolean) => {
    if (open) {
      setSheetSide(window.innerWidth >= 768 ? "right" : "top");
    }
    setIsSheetOpen(open);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleOpen} modal={false}>
      <SheetTrigger className="text-sm font-medium px-4 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
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
                          ? "border-primary bg-accent"
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

          <Accordion type="single" collapsible defaultValue="item-2">
            <AccordionItem value="item-2">
              <AccordionTrigger>School</AccordionTrigger>
              <AccordionContent className="flex-start flex">
                <Combobox
                  selectedValue={schoolFilter}
                  setSelectedValue={setSchoolFilter}
                  data={SCHOOLS}
                  placeholder="Select school..."
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible defaultValue="item-3">
            <AccordionItem value="item-3">
              <AccordionTrigger>Module</AccordionTrigger>
              <AccordionContent className="flex-start flex">
                <Combobox
                  selectedValue={modCodeFilter}
                  setSelectedValue={setModCodeFilter}
                  data={MODCODES}
                  placeholder="Select module..."
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default FilterSheet;
