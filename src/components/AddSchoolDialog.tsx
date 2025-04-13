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
import { CircleAlert, SquarePlus } from "lucide-react";
import { Label } from "./ui/label";
import { Combobox } from "./ComboBox";
import { DUMMY, SCHOOLTYPE } from "@/app/constants/constants";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "./LoadingSpinner";

function AddSchoolDialog({ fetchSchools }: { fetchSchools?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [addSchool, setAddSchool] = useState<string | null>(null);
  const [addSchoolType, setAddSchoolType] = useState<string | null>(null);
  const [error, setError] = useState("");
  const triggerLabel = "Add new school!";
  const { toast } = useToast();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!addSchool || !addSchoolType) {
      setError("Please fill out all fields before submitting");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", addSchool.trim());
    formData.append("type", addSchoolType || "");

    const res = await fetch("/api/addSchool", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setOpen(false);
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
        setError("This school already exists!");
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
            placeholder="eg: Hogwarts School of Witchcraft"
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

export default AddSchoolDialog;
