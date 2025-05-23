"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlert } from "lucide-react";
import { Combobox } from "@/components/ComboBox";
import {
  ACCEPTED_FILE_EXTENSIONS,
  MIME_TYPE_MAP,
  RESOURCE_TYPES,
} from "@/app/constants/constants";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import AddCourseDialog from "@/components/AddCourseDialog";
import AddSchoolDialog from "@/components/AddSchoolDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { LoginSignupDialog } from "@/components/LoginSignupDialog";
import { useUser } from "../UserContext";
import contributeAnimationData from "@/app/assets/contribute-animation.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function ContributeDrawerDialog() {
  const { fetchContributionStatus } = useUser();
  const formTitle = "Contribute";
  const formDescription = "Help others learn and succeed!";

  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState<{ value: string; label: string }[]>(
    []
  );
  const [error, setError] = useState("");
  const [course, setCourse] = useState<{ value: string; label: string }[]>([]);
  const [contributeSchool, setContributeSchool] = useState<string | null>(null);
  const [contributeCourseInfo, setContributeCourseInfo] = useState<
    string | null
  >(null);
  const [contributeCourseCode, setContributeCourseCode] = useState<
    string | null
  >(null);
  const [contributeCourseName, setContributeCourseName] = useState<string>("");
  const [contributeResourceType, setContributeResourceType] = useState<
    string | undefined
  >(undefined);
  const [contributeDescription, setContributeDescription] =
    useState<string>("");
  const [contributeUploadedFile, setContributeUploadedFile] =
    useState<File | null>(null);
  const [restored, setRestored] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const fetchSchools = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSchools`
      );
      const data = await res.json();
      setSchools(data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setSchools([]);
    }
  };

  const fetchCourses = async (school: string) => {
    try {
      const res = await fetch(
        `/api/getCourses?school=${encodeURIComponent(school)}`
      );
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setCourse([]);
    }
  };
  useEffect(() => {
    if (contributeSchool) {
      fetchCourses(contributeSchool);
    }

    setContributeCourseInfo(null);
    setContributeCourseCode(null);
    setContributeCourseName("");
  }, [contributeSchool]);

  useEffect(() => {
    fetchSchools();
  }, []);

  const allowedMimeTypes = Object.keys(MIME_TYPE_MAP);
  const allowedExtensions = Array.from(new Set(Object.values(MIME_TYPE_MAP)))
    .map((ext) => `.${ext}`)
    .join(", ");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // check for missing input fields
    if (
      !contributeUploadedFile ||
      !(contributeUploadedFile instanceof File) ||
      !contributeDescription.trim() ||
      !contributeSchool ||
      !contributeCourseName ||
      !contributeResourceType
    ) {
      setError("Please fill out all fields before submitting");
      setLoading(false);
      return;
    }

    if (contributeDescription.trim().length > 50) {
      setError("Description must be shorter than 50 characters long");
      setLoading(false);
      return;
    }

    // check for allowed file MIME type
    if (
      contributeUploadedFile &&
      !allowedMimeTypes.includes(contributeUploadedFile.type)
    ) {
      setError(
        `Unsupported file type. Please upload any of these types: ${allowedExtensions}`
      );
      setLoading(false);
      return;
    }

    const maxSizeInBytes = 100 * 1024 * 1024; // 100MB
    // check for file size
    if (contributeUploadedFile.size > maxSizeInBytes) {
      setError("File size must be less than 100MB");
      setLoading(false);
      return;
    }

    const fileMimeType = contributeUploadedFile.type;
    const contributeFileType = MIME_TYPE_MAP[fileMimeType];

    setLoading(true);
    const formData = new FormData();
    formData.append("description", contributeDescription.trim());
    formData.append("school", contributeSchool.trim());
    formData.append(
      "courseCode",
      (contributeCourseCode || "").trim().toUpperCase()
    );
    formData.append("courseName", contributeCourseName.trim());
    formData.append("resourceTypes", JSON.stringify(contributeResourceType));
    formData.append("file", contributeUploadedFile);
    formData.append("fileType", contributeFileType);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/contribute`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (res.ok) {
      toast({
        title: "Thank you!",
        description: "File uploaded successfully 🤓",
      });
      fetchContributionStatus();
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    } else {
      const errorStatus = await res.status;
      if (errorStatus == 401) {
        setDialogOpen(true);
        setLoading(false);
        return;
      } else {
        setError("Something went wrong. Please try again");
      }
    }
    setLoading(false);
  };
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <section className="pt-10 pb-32">
          <div className="container">
            <div className="flex flex-col gap-4">
              <Card className="mx-auto w-full max-w-sm p-6">
                <div className="mb-6 flex flex-col items-center">
                  <Lottie
                    animationData={contributeAnimationData}
                    className="h-[150px] mr-2"
                  />
                  <p className="mb-2 text-2xl font-bold">{formTitle}</p>
                  <p className="text-muted-foreground text-center">
                    {formDescription}
                  </p>
                </div>
                <form className={cn("grid items-start gap-4")}>
                  <div className="grid gap-2">
                    <Label>Upload document</Label>
                    <Input
                      type="file"
                      accept={ACCEPTED_FILE_EXTENSIONS}
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
                      placeholder="eg: Economics Week 4 Notes"
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
                      disabled={false}
                      emptyState={
                        <div className="p-2 text-center">
                          <p className="text-sm mb-2">Not found...</p>
                          <AddSchoolDialog fetchSchools={fetchSchools} />
                        </div>
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Course</Label>
                    <Combobox
                      selectedValue={contributeCourseInfo}
                      setSelectedValue={setContributeCourseInfo}
                      data={course}
                      placeholder={
                        contributeSchool
                          ? "Select course..."
                          : "Select a school first..."
                      }
                      disabled={!contributeSchool}
                      emptyState={
                        <div className="p-2 text-center">
                          <p className="text-sm mb-2">Not found...</p>
                          <AddCourseDialog
                            contributeSchool={contributeSchool}
                            fetchCourses={fetchCourses}
                          />
                        </div>
                      }
                      setCourseCode={setContributeCourseCode}
                      setCourseName={setContributeCourseName}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Type of document</Label>
                    <div className="flex flex-row gap-2 flex-wrap">
                      <Select
                        onValueChange={(value) =>
                          setContributeResourceType(value)
                        }
                        value={contributeResourceType}
                      >
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
                  {error && (
                    <div className="flex items-center gap-2">
                      <div>
                        <div>
                          <CircleAlert size="20px" color="#ef4444" />
                        </div>
                      </div>
                      <span className="text-sm text-red-500">{error}</span>
                    </div>
                  )}
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? <LoadingSpinner /> : "Contribute"}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
        <LoginSignupDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </div>
    </div>
  );
}
