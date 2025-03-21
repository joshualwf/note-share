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
import { FormEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import AddModDialog from "./AddModDialog";

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
          <ContributeModForm setOpen={setOpen} />
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
        <ContributeModForm className="px-4" setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ContributeModForm({
  className,
  setOpen,
}: React.ComponentProps<"form"> & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [contributeSchool, setContributeSchool] = useState<string | null>(null);
  const [contributeModCode, setContributeModCode] = useState<string | null>(
    null
  );
  const [contributeResourceType, setContributeResourceType] = useState<
    string[]
  >([]);
  const [contributeDescription, setContributeDescription] =
    useState<string>("");
  const [contributeUploadedFile, setContributeUploadedFile] =
    useState<File | null>(null);

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

  const { toast } = useToast();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      !contributeUploadedFile ||
      !contributeDescription ||
      !contributeSchool ||
      !contributeModCode ||
      contributeResourceType.length === 0
    ) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill out all fields before submitting.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("description", contributeDescription);
    formData.append("school", contributeSchool);
    formData.append("moduleCode", contributeModCode);
    formData.append("resourceTypes", JSON.stringify(contributeResourceType));
    formData.append("file", contributeUploadedFile);

    console.log("formData", formData);
    toast({
      title: "Thank you!",
      description: "File uploaded successfully :-)",
    });
    setOpen(false);
  };

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label>Description of document</Label>
        <Input
          placeholder="eg: Operating Systems Lecture Notes"
          value={contributeDescription}
          onChange={(e) => setContributeDescription(e.target.value)}
        />
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
          emptyState={
            <div className="p-2 text-center">
              <p className="text-sm mb-2">Not found...</p>
              <AddModDialog />
            </div>
          }
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
      <div className="grid gap-2">
        <Label>Upload document</Label>
        <Input
          type="file"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setContributeUploadedFile(e.target.files[0]);
            }
          }}
        />
      </div>
      <Button onClick={handleSubmit}>Contribute</Button>
    </form>
  );
}
