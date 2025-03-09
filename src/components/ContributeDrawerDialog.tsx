import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus } from "lucide-react";
import { Combobox } from "./ComboBox";
import { MODCODES, RESOURCE_TYPES, SCHOOLS } from "@/app/constants/constants";
import { useState } from "react";

export function ContributeDrawerDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const triggerLabel = "Contribute";
  const dialogTitle = "Contribute";
  const dialogDescription = "Add your study material so that others can use";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <FolderPlus />
            <span className="hidden sm:inline">{triggerLabel}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <FolderPlus />
          <span className="hidden sm:inline">{triggerLabel}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription>{dialogDescription}</DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const [contributeSchool, setContributeSchool] = useState<string | null>(null);
  const [contributeModCode, setContributeModCode] = useState<string | null>(
    null
  );
  const [contributeResourceType, setContributeResourceType] = useState<
    string[]
  >([]);
  const getUpdatedContributeResourceType = (
    prev: string[],
    type: string
  ): string[] => {
    if (!Array.isArray(prev)) return [];
    return prev.includes(type)
      ? prev.filter((item) => item !== type)
      : [...prev, type];
  };

  const toggleContributeResourceType = (type: string) => {
    setContributeResourceType(
      getUpdatedContributeResourceType(contributeResourceType, type)
    );
  };
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label>Description of document</Label>
        <Input placeholder="eg: Operating Systems Lecture Notes" />
      </div>
      <div className="grid gap-2">
        <Label>School</Label>
        <Combobox
          selectedValue={contributeSchool}
          setSelectedValue={setContributeSchool}
          data={SCHOOLS}
          placeholder="Select school..."
        />
      </div>
      <div className="grid gap-2">
        <Label>Module code</Label>
        <Combobox
          selectedValue={contributeModCode}
          setSelectedValue={setContributeModCode}
          data={MODCODES}
          placeholder="Select module code..."
        />
      </div>
      <div className="grid gap-2">
        <Label>Type of document</Label>
        <div className="flex flex-row gap-2">
          {RESOURCE_TYPES.map((type) => (
            <Button
              variant={"outline"}
              key={type}
              value={type}
              aria-label={`Toggle ${type}`}
              onClick={(e) => {
                e.preventDefault();
                toggleContributeResourceType(type);
              }}
              className={
                contributeResourceType.includes(type)
                  ? "border-primary bg-accent"
                  : ""
              }
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      <Button type="submit">Contribute</Button>
    </form>
  );
}
