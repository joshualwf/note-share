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

function AddCourseDialog() {
  const [open, setOpen] = React.useState(false);
  const [addCourseSchool, setAddCourseSchool] = useState<string | null>(null);
  const [addCourseName, setAddCourseName] = useState<string | null>(null);
  const [addCourseCode, setAddCourseCode] = useState<string | null>(null);
  const triggerLabel = "Add new course!";
  const { toast } = useToast();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!addCourseSchool || !addCourseCode) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill out all fields before submitting.",
      });
      return;
    }

    const courseCodeUpper = addCourseCode.toUpperCase();

    const courseExists = COURSECODES.some(
      (course) => course.value.toUpperCase() === courseCodeUpper
    );

    if (courseExists) {
      toast({
        title: "Course already exists",
        description: `${courseCodeUpper} is already in the list!`,
      });
      return;
    }

    const newCourse = {
      school: addCourseSchool,
      courseCode: courseCodeUpper,
    };

    console.log("Submitted new course:", newCourse);

    toast({
      title: "Thank you!",
      description: "Course added successfully :-)",
    });
    setAddCourseSchool(null);
    setAddCourseCode(null);
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
            Enter the course info you’d like to contribute!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label>School</Label>
          <Combobox
            selectedValue={addCourseSchool}
            setSelectedValue={setAddCourseSchool}
            data={SCHOOLS}
            placeholder="Select school..."
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
        <Button onClick={handleSubmit}>Add</Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddCourseDialog;
