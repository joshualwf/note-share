"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
  data: { value: string; label: string }[];
  placeholder?: string;
  emptyState?: React.ReactNode;
  setCourseCode?: (value: string | null) => void;
  setCourseName?: (value: string | null) => void;
}

export function Combobox({
  selectedValue,
  setSelectedValue,
  data,
  placeholder = "Select...",
  emptyState, // 👈 here
  setCourseCode,
  setCourseName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[310px] justify-between"
        >
          {selectedValue ?? placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        avoidCollisions={false}
        align="center"
        className="w-[310px] p-0"
      >
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyState ?? "Not found..."}</CommandEmpty>
            <CommandGroup>
              {data.map((item, index) => {
                const combinedValue =
                  item.value && item.label
                    ? `${item.value} - ${item.label}`
                    : item.value || item.label || "";

                return (
                  <CommandItem
                    key={`${item.value}-${item.label}-${index}`}
                    value={combinedValue}
                    onSelect={(currentValue) => {
                      setSelectedValue(
                        currentValue === selectedValue ? null : currentValue
                      );
                      setOpen(false);
                      if (setCourseCode) setCourseCode(item.value);
                      if (setCourseName) setCourseName(item.label);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === combinedValue ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {combinedValue}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
