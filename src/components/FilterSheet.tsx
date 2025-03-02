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
  const resourceTypes = ["Notes", "Exam Papers", "Solutions"];

  const toggleResourceType = (type: string) => {
    setResourceTypesFilter((prev: string[]) => {
      if (!Array.isArray(prev)) return []; // Ensure prev is an array

      return prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type];
    });
  };

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
                    {resourceTypes.map((type) => (
                      <ToggleGroupItem
                        key={type}
                        value={type}
                        aria-label={`Toggle ${type}`}
                        onClick={() => toggleResourceType(type)}
                        className={
                          resourceTypesFilter.includes(type)
                            ? "bg-primary text-white"
                            : ""
                        }
                      >
                        {type}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
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

          <Accordion type="single" collapsible>
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
