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

function AddModDialog() {
  const [open, setOpen] = React.useState(false);
  const [addModSchool, setAddModSchool] = useState<string | null>(null);
  const [addModCode, setAddModCode] = useState<string | null>(null);
  const triggerLabel = "Add new module!";
  const { toast } = useToast();
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!addModSchool || !addModCode) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill out all fields before submitting.",
      });
      return;
    }

    const modCodeUpper = addModCode.toUpperCase();

    const modExists = COURSECODES.some(
      (mod) => mod.value.toUpperCase() === modCodeUpper
    );

    if (modExists) {
      toast({
        title: "Module already exists",
        description: `${modCodeUpper} is already in the list!`,
      });
      return;
    }

    const newMod = {
      school: addModSchool,
      modCode: modCodeUpper,
    };

    console.log("Submitted new mod:", newMod);

    // fetch('/api/module', { method: 'POST', body: JSON.stringify(newMod) })
    toast({
      title: "Thank you!",
      description: "Module code added successfully :-)",
    });
    setAddModSchool(null);
    setAddModCode(null);
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
          <DialogTitle>Add New Module</DialogTitle>
          <DialogDescription>
            Enter the module info you’d like to contribute!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label>School</Label>
          <Combobox
            selectedValue={addModSchool}
            setSelectedValue={setAddModSchool}
            data={SCHOOLS}
            placeholder="Select school..."
          />
        </div>
        <div className="grid gap-2">
          <Label>Module code</Label>
          <Input
            value={addModCode ?? ""}
            onChange={(e) => setAddModCode(e.target.value)}
            placeholder="e.g. CS1010"
          />
        </div>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddModDialog;
