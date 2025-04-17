"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlert, FolderPlus } from "lucide-react";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ContributeDrawerDialog() {
  const formTitle = "Contribute";
  const formDescription = "Help others learn and succeed!";

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
      const res = await fetch("/api/getSchools");
      const data = await res.json();
      setSchools(data);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setSchools([]);
    }
  };
  useEffect(() => {
    const cachedContributeForm = sessionStorage.getItem("contribute-form");
    if (cachedContributeForm) {
      try {
        const parsed = JSON.parse(cachedContributeForm);
        setContributeDescription(parsed.contributeDescription || "");
        setContributeSchool(parsed.contributeSchool || null);
        setContributeCourseInfo(parsed.contributeCourseInfo || null);
        setContributeCourseCode(parsed.contributeCourseCode || null);
        setContributeCourseName(parsed.contributeCourseName || "");
        setContributeResourceType(parsed.contributeResourceType || undefined);
        setContributeUploadedFile(parsed.contributeUploadedFile || null);
        setRestored(true);
      } catch (err) {
        console.error("Failed to restore contribute form from cache:", err);
      }
    }
    fetchSchools();
  }, []);

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
      !contributeDescription ||
      !contributeSchool ||
      !contributeCourseName ||
      !contributeResourceType
    ) {
      // setError("Please fill out all fields before submitting");
      setError(
        `Unsupported file type. Please upload any of these types: ${allowedExtensions}`
      );
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

    const res = await fetch("/api/contribute", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      sessionStorage.removeItem("contribute-form");
      toast({
        title: "Thank you!",
        description: "File uploaded successfully :-)",
      });
      router.push("/");
    } else {
      const errorStatus = await res.status;
      if (errorStatus == 401) {
        sessionStorage.setItem(
          "contribute-form",
          JSON.stringify({
            contributeDescription,
            contributeSchool,
            contributeCourseInfo,
            contributeCourseCode,
            contributeCourseName,
            contributeResourceType,
            contributeUploadedFile,
          })
        );
        toast({
          title: "Please login/signup before contributing :-)",
        });
        const redirectTo = encodeURIComponent(window.location.pathname);
        router.push(`/signup?redirect=${redirectTo}`);
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
                  <DotLottieReact
                    src="https://lottie.host/3b08c76a-5fa2-4eb1-962c-f6680c857f9d/Kj8DvZGHkC.lottie"
                    loop
                    autoplay
                    height="50%"
                    width="100%"
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
                      {restored && (
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
                      )}
                    </div>
                  </div>
                  {error && (
                    <div className="flex items-center gap-1">
                      <div>
                        <div>
                          <CircleAlert size="20px" color="#ef4444" />
                        </div>
                      </div>
                      <span className="text-center text-sm text-red-500">
                        {error}
                      </span>
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
      </div>
    </div>
  );
}
