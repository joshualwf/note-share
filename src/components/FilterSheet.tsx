import React, { useState, useEffect } from "react";
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
import {
  COURSECODES,
  RESOURCE_TYPES,
  SCHOOLS,
} from "@/app/constants/constants";
import { Button } from "./ui/button";

interface FilterSheetProps {
  resourceTypesFilter: string[];
  setResourceTypesFilter: (value: string[]) => void;
  schoolFilter: string | null;
  setSchoolFilter: (value: string | null) => void;
  courseFilter: string | null;
  setCourseFilter: (value: string | null) => void;
  setCourseCodeFilter: (value: string | null) => void;
  setCourseNameFilter: (value: string | null) => void;
}

type School = {
  id: number;
  name: string;
  type: string;
};

type Course = {
  id: number;
  courseCode: string;
  courseName: string;
  schoolName: string;
};

function FilterSheet({
  resourceTypesFilter,
  setResourceTypesFilter,
  schoolFilter,
  setSchoolFilter,
  courseFilter,
  setCourseFilter,
  setCourseCodeFilter,
  setCourseNameFilter,
}: FilterSheetProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetSide, setSheetSide] = useState<"top" | "right">("right");
  const resourceTypes = RESOURCE_TYPES;
  const [schools, setSchools] = useState<{ value: string; label: string }[]>(
    []
  );
  const [course, setCourse] = useState<{ value: string; label: string }[]>([]);

  const fetchSchools = async () => {
    try {
      const res = await fetch("/api/getSchools");
      const data = await res.json();
      setSchools(data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setSchools([]);
    }
  };
  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchCourses = async (school: string) => {
    try {
      const res = await fetch(
        `/api/getCourses?school=${encodeURIComponent(school)}`
      );
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setCourse([]);
    }
  };
  useEffect(() => {
    if (schoolFilter) {
      fetchCourses(schoolFilter);
    }
  }, [schoolFilter]);

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

  const handleClearAllFilters = () => {
    setResourceTypesFilter([]);
    setSchoolFilter(null);
    setCourseFilter(null);
    setCourseCodeFilter(null);
    setCourseNameFilter(null);
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
      <SheetTrigger className="text-sm font-medium px-4 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
        Filters
      </SheetTrigger>
      <SheetContent side={sheetSide} className="flex flex-col justify-between">
        <div>
          <SheetTitle className="text-center">Filters</SheetTitle>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Resource Type</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-row gap-2 flex-wrap">
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
                  data={schools}
                  placeholder="Select school..."
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible defaultValue="item-3">
            <AccordionItem value="item-3">
              <AccordionTrigger>Course</AccordionTrigger>
              <AccordionContent className="flex-start flex">
                <Combobox
                  selectedValue={courseFilter}
                  setSelectedValue={setCourseFilter}
                  data={course}
                  placeholder="Select course..."
                  setCourseCode={setCourseCodeFilter}
                  setCourseName={setCourseNameFilter}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex justify-between">
          <Button onClick={() => setIsSheetOpen(false)}>Show results</Button>
          <Button
            variant="outline"
            onClick={handleClearAllFilters}
            disabled={
              resourceTypesFilter.length === 0 && !schoolFilter && !courseFilter
            }
          >
            Clear all filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default FilterSheet;
