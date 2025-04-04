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
import {
  COURSECODES,
  RESOURCE_TYPES,
  SCHOOLS,
} from "@/app/constants/constants";
import { FormEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import AddCourseDialog from "./AddCourseDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ContributeDrawerDialog({
  fetchDocument,
}: {
  fetchDocument: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const triggerLabel = "Contribute";
  const dialogTitle = "Contribute";
  const dialogDescription =
    "Share your study materials to help others learn and succeed!";

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
          <ContributeCourseForm setOpen={setOpen} fetchDocument={fetchDocument} />
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
        <ContributeCourseForm className="px-4" setOpen={setOpen} fetchDocument={fetchDocument}/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ContributeCourseForm({
  className,
  setOpen,
  fetchDocument,
}: React.ComponentProps<"form"> & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchDocument: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState<{ value: string; label: string }[]>([]);
  const [course, setCourse] = useState<{ value: string; label: string }[]>([]);
  const [contributeSchool, setContributeSchool] = useState<string | null>(null);
  const [contributeCourseInfo, setContributeCourseInfo] = useState<string | null>(null);
  const [contributeCourseCode, setContributeCourseCourse] = useState<string | null>(null);
  const [contributeCourseName, setContributeCourseName] = useState<string | null>(null);
  const [contributeResourceType, setContributeResourceType] = useState<string | null>(null);
  const [contributeDescription, setContributeDescription] = useState<string>("");
  const [contributeUploadedFile, setContributeUploadedFile] = useState<File | null>(null);

  const { toast } = useToast();

  const fetchSchools = async () => {
    try {
      const res = await fetch('/api/getSchools');
      const data = await res.json();
      setSchools(data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setSchools([]);
    }
  };
  React.useEffect(() => {
    fetchSchools();
  }, []);

  const fetchCourses = async (school: string) => {
    try {
      const res = await fetch(`/api/getCourses?school=${encodeURIComponent(school)}`);
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setCourse([]);
    }
  };
  React.useEffect(() => {
    if (contributeSchool) {
      fetchCourses(contributeSchool);
    }
  }, [contributeSchool]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (
      !contributeUploadedFile ||
      !contributeDescription ||
      !contributeSchool ||
      !contributeCourseInfo ||
      !contributeResourceType
    ) {
      toast({
        title: "Hold on!",
        description: "Please fill out all fields before submitting.",
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("description", contributeDescription);
    formData.append("school", contributeSchool);
    formData.append("courseCode", contributeCourseCode || "");
    formData.append("courseName", contributeCourseName || "");
    formData.append("resourceTypes", JSON.stringify(contributeResourceType));
    formData.append("file", contributeUploadedFile);

    console.log("formData", formData);
    const res = await fetch("/api/contribute", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      toast({
        title: "Thank you!",
        description: "File uploaded successfully :-)",
      });
      fetchDocument();
      setOpen(false);
    } else {
      const errorStatus = await res.status;
      if (errorStatus == 401) {
        toast({
          title: "Unauthorized Access",
          description: "Please log in before contributing!",
        });
      } else {
        toast({
          title: "Submission failed",
          description: "Something went wrong. Please try again.",
        });
      }
    }
    setOpen(false);
    setLoading(false);
  };

  return (
    <form className={cn("grid items-start gap-4", className)}>
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
          data={schools}
          placeholder="Select school..."
        />
      </div>
      <div className="grid gap-2">
        <Label>Course</Label>
        <Combobox
          selectedValue={contributeCourseInfo}
          setSelectedValue={setContributeCourseInfo}
          data={course}
          placeholder="Select course..."
          emptyState={
            <div className="p-2 text-center">
              <p className="text-sm mb-2">Not found...</p>
              <AddCourseDialog />
            </div>
          }
          setCourseCode={setContributeCourseCourse}
          setCourseName={setContributeCourseName}
        />
      </div>
      <div className="grid gap-2">
        <Label>Type of document</Label>
        <div className="flex flex-row gap-2 flex-wrap">
          <Select onValueChange={(value) => setContributeResourceType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              {RESOURCE_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Contribute"}
      </Button>
    </form>
  );
}
