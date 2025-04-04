import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SquarePlus } from "lucide-react";
import { Label } from "./ui/label";
import { Combobox } from "./ComboBox";
import { COURSECODES, SCHOOLS } from "@/app/constants/constants";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

function AddCourseDialog({
  contributeSchool,
  fetchCourses,
}: {
  contributeSchool: string | null;
  fetchCourses?: (school: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [addCourseSchool, setAddCourseSchool] = useState<string | null>(null);
  const [addCourseCode, setAddCourseCode] = useState<string | null>(null);
  const [addCourseName, setAddCourseName] = useState<string | null>(null);
  const triggerLabel = "Add new course!";
  const { toast } = useToast();

  React.useEffect(() => {
    if (open && contributeSchool) {
      setAddCourseSchool(contributeSchool);
    }
  }, [open, contributeSchool]);  

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!addCourseSchool || !(addCourseCode || addCourseName)) {
      toast({
        title: "Hold on!",
        description: "Please fill out all fields before submitting.",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("schoolName", addCourseSchool);
    formData.append("courseCode", addCourseCode || "");
    formData.append("courseName", addCourseName || "");

    const res = await fetch("/api/addCourse", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      toast({
        title: "Thank you!",
        description: "Course created successfully :-)",
      });
      if (contributeSchool && fetchCourses) {
        fetchCourses(contributeSchool);
      }
      setAddCourseSchool(null);
      setAddCourseCode(null);
    } else {
      const errorStatus = await res.status;
      if (errorStatus == 409) {
        toast({
          title: "Exisiting Course",
          description: "This course already exists!",
        });
      } else {
        toast({
          title: "Submission failed",
          description: "Something went wrong. Please try again.",
        });
      }
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SquarePlus />
          <span>{triggerLabel}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-[400px] rounded-md">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Enter the course info you'd like to contribute!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label>School</Label>
          <Combobox
            selectedValue={addCourseSchool}
            setSelectedValue={setAddCourseSchool}
            data={SCHOOLS}
            placeholder="Select school..."
            disabled={true}
          />
        </div>

        <div className="grid gap-2">
          <Label>Course name</Label>
          <Input
            value={addCourseName ?? ""}
            onChange={(e) => setAddCourseName(e.target.value)}
            placeholder="e.g. Intro to data science"
          />
        </div>

        <div className="grid gap-2">
          <Label>Course code (for university)</Label>
          <Input
            value={addCourseCode ?? ""}
            onChange={(e) => setAddCourseCode(e.target.value)}
            placeholder="e.g. DSA1101"
          />
        </div>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Add"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddCourseDialog;
