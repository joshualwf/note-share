// "use client";

// import * as React from "react";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// interface ComboboxProps {
//   selectedValue: string | null;
//   setSelectedValue: (value: string | null) => void;
//   data: { value: string; label: string }[]; // Accepts both schools and modules
//   placeholder?: string;
// }

// export function Combobox({
//   selectedValue,
//   setSelectedValue,
//   data,
//   placeholder = "Select...",
// }: ComboboxProps) {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-[310px] justify-between"
//         >
//           {selectedValue
//             ? data.find((item) => item.value === selectedValue)?.value
//             : placeholder}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent
//         side="bottom"
//         avoidCollisions={false}
//         align="center"
//         className="w-[310px] p-0"
//       >
//         <Command>
//           <CommandInput placeholder={placeholder} />
//           <CommandList>
//             <CommandEmpty>Not found...</CommandEmpty>
//             <CommandGroup>
//               {data.map((item) => (
//                 <CommandItem
//                   key={item.value}
//                   value={item.value}
//                   onSelect={(currentValue) => {
//                     setSelectedValue(
//                       currentValue === selectedValue ? null : currentValue
//                     );
//                     setOpen(false);
//                   }}
//                 >
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       selectedValue === item.value ? "opacity-100" : "opacity-0"
//                     )}
//                   />
//                   {item.value}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }

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
}

export function Combobox({
  selectedValue,
  setSelectedValue,
  data,
  placeholder = "Select...",
  emptyState, // 👈 here
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
          {selectedValue
            ? data.find((item) => item.value === selectedValue)?.value
            : placeholder}
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
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
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
                      selectedValue === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
