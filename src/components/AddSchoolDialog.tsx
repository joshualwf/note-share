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
import { DUMMY, SCHOOLTYPE } from "@/app/constants/constants";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

function AddSchoolDialog({
  fetchSchools,
}: {
  fetchSchools?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [addSchool, setAddSchool] = useState<string | null>(null);
  const [addSchoolType, setAddSchoolType] = useState<string | null>(null);
  const triggerLabel = "Add new school!";
  const { toast } = useToast();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!addSchool || !addSchoolType) {
      toast({
        title: "Hold on!",
        description: "Please fill out all fields before submitting.",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", addSchool);
    formData.append("type", addSchoolType || "");

    const res = await fetch("/api/addSchool", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      toast({
        title: "Thank you!",
        description: "School added successfully :-)",
      });
      if (fetchSchools) {
        fetchSchools();
      }
      setAddSchool(null);
      setAddSchoolType(null);
    } else {
      const errorStatus = await res.status;
      if (errorStatus == 409) {
        toast({
          title: "Existing School",
          description: "This school already exists!",
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
          <DialogTitle>Add New School</DialogTitle>
          <DialogDescription>
            Enter the school info you'd like to add!
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label>School name</Label>
          <Input
            value={addSchool ?? ""}
            onChange={(e) => setAddSchool(e.target.value)}
            placeholder="e.g. Hogwarts School of Witchcraft"
          />
        </div>

        <div className="grid gap-2">
          <Label>School type</Label>
          <Combobox
            selectedValue={addSchoolType}
            setSelectedValue={setAddSchoolType}
            data={SCHOOLTYPE}
            placeholder="Select school type..."
            disabled={false}
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Add"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddSchoolDialog;
