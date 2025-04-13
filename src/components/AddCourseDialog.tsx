import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CircleAlert, SquarePlus } from "lucide-react";
import { Label } from "./ui/label";
import { Combobox } from "./ComboBox";
import { DUMMY } from "@/app/constants/constants";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "./LoadingSpinner";

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
  const [addCourseName, setAddCourseName] = useState<string>("");
  const [error, setError] = useState("");
  const triggerLabel = "Add new course!";
  const { toast } = useToast();

  useEffect(() => {
    if (open && contributeSchool) {
      setAddCourseSchool(contributeSchool);
    }
  }, [open, contributeSchool]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!addCourseSchool || !addCourseName) {
      setError("Please fill out all fields before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("schoolName", addCourseSchool.trim());
    formData.append("courseName", addCourseName.trim());
    formData.append("courseCode", (addCourseCode || "").trim().toUpperCase());

    const res = await fetch("/api/addCourse", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setOpen(false);
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
        setError("This course already exists!");
      } else {
        setError("Something went wrong, please try again");
      }
    }
    setLoading(false);
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
            placeholder="Select school..."
            data={[]}
            disabled={true}
          />
        </div>

        <div className="grid gap-2">
          <Label>Course name</Label>
          <Input
            value={addCourseName ?? ""}
            onChange={(e) => setAddCourseName(e.target.value)}
            placeholder="eg: Intro to data science"
          />
        </div>

        <div className="grid gap-2">
          <Label>Course code (optional)</Label>
          <Input
            value={addCourseCode ?? ""}
            onChange={(e) => setAddCourseCode(e.target.value)}
            placeholder="eg: DSA1101"
          />
        </div>
        {error && (
          <div className="flex items-center gap-1">
            <div>
              <CircleAlert size="20px" color="#ef4444" />
            </div>
            <span className="text-center text-sm text-red-500">{error}</span>
          </div>
        )}
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? <LoadingSpinner /> : "Add"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddCourseDialog;
