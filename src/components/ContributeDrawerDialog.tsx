"use client";

import * as React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useToast } from "@/hooks/use-toast";

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
import { RESOURCE_TYPES, SCHOOLS } from "@/app/constants/constants";
import AddModDialog from "./AddModDialog";
import { ToastAction } from "@/components/ui/toast";

export function ContributeDrawerDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const triggerLabel = "Contribute";
  const dialogTitle = "Contribute";
  const dialogDescription = "Add your study material so that others can use";

  return isDesktop ? (
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
  ) : (
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
  const [title, setTitle] = useState<string>("");
  const [school, setSchool] = useState<string | null>(null);
  const [courseCode, setCourseCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resourceTypes, setResourceTypes] = useState<string[]>([]);

  const { toast } = useToast();

  const toggleResourceType = (type: string) => {
    setResourceTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      !title ||
      !school ||
      !courseCode ||
      (description.length == 0 && !uploadedFile) ||
      resourceTypes.length === 0
    ) {
      toast({
        title: "Missing fields",
        description: "Please complete all fields before submitting.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("school", school);
    formData.append("courseCode", courseCode);
    formData.append("description", description);
    if (uploadedFile) {
      formData.append("file", uploadedFile);
    }
    formData.append("resourceTypes", JSON.stringify(resourceTypes));

    const res = await fetch("/api/contribute", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast({
        title: "Thank you!",
        description: "Your contribution has been submitted.",
      });
      setOpen(false);
    } else {
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label>Title</Label>
        <Input
          placeholder="eg: Programming Methodology Lecture Notes"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label>School</Label>
        <Combobox
          selectedValue={school}
          setSelectedValue={setSchool}
          data={SCHOOLS}
          placeholder="Select school..."
        />
      </div>

      <div className="grid gap-2">
        <Label>Module Code</Label>
        <Input
          placeholder="eg: CS1010S"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label>Description</Label>
        <Input
          placeholder="Briefly describe what this document contains"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label>Upload document</Label>
        <Input
          type="file"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setUploadedFile(e.target.files[0]);
            }
          }}
        />
      </div>

      <div className="grid gap-2">
        <Label>Type of document</Label>
        <div className="flex flex-row gap-2 flex-wrap">
          {RESOURCE_TYPES.map((type) => (
            <Button
              variant="outline"
              key={type}
              onClick={(e) => {
                e.preventDefault();
                toggleResourceType(type);
              }}
              className={
                resourceTypes.includes(type) ? "border-primary bg-accent" : ""
              }
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <Button onClick={handleSubmit}>Contribute</Button>
    </form>
  );
}
