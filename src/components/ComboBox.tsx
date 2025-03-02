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
import { SCHOOLS } from "@/app/constants/constants";

interface ComboboxProps {
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
}

const schools = SCHOOLS;

export function Combobox({ selectedValue, setSelectedValue }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValue
            ? schools.find((school) => school.value === selectedValue)?.label
            : "Select school..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        avoidCollisions={false}
        align="center"
        className="w-[200px] p-0"
      >
        <Command>
          <CommandInput placeholder="Search school..." />
          <CommandList>
            <CommandEmpty>No school found.</CommandEmpty>
            <CommandGroup>
              {schools.map((school) => (
                <CommandItem
                  key={school.value}
                  value={school.value}
                  onSelect={(currentValue) => {
                    setSelectedValue(
                      currentValue === selectedValue ? null : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === school.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {school.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
