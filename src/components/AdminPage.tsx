/* AdminPageZipUpload.tsx */

"use client";

import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { RESOURCE_TYPES, MIME_TYPE_MAP } from "@/app/constants/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Combobox } from "@/components/ComboBox";
import AddCourseDialog from "@/components/AddCourseDialog";
import AddSchoolDialog from "@/components/AddSchoolDialog";

interface UploadedFile {
  name: string;
  blob: Blob;
  school: string | null;
  courseCode: string | null;
  courseName: string;
  documentType: string;
  description: string;
  fileType: string;
}

export default function AdminPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [schools, setSchools] = useState<{ value: string; label: string }[]>([]);
  const [courseList, setCourseList] = useState<{ value: string; label: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await fetch(`/api/getSchools`);
      const data = await res.json();
      setSchools(data);
    } catch {
      toast({ title: "Failed to fetch schools" });
    }
  };

  const fetchCourses = async (school: string) => {
    try {
      const res = await fetch(`/api/getCourses?school=${encodeURIComponent(school)}`);
      const data = await res.json();
      setCourseList(data);
    } catch {
      toast({ title: "Failed to fetch courses" });
    }
  };

  const allowedMimeTypes = Object.keys(MIME_TYPE_MAP);
  const allowedExtensions = Array.from(new Set(Object.values(MIME_TYPE_MAP)))
    .map((ext) => `.${ext}`)
    .join(", ");

    const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const zipFile = e.target.files?.[0];
      if (!zipFile) return;
    
      try {
        const zip = await JSZip.loadAsync(zipFile);
        const extracted: UploadedFile[] = [];
    
        await Promise.all(
          Object.keys(zip.files).map(async (filename) => {
    
            const file = zip.files[filename];
            const blob = await file.async("blob");
    
            // Get file extension
            const extMatch = filename.match(/\.(\w+)$/);
            const ext = extMatch ? extMatch[1].toLowerCase() : null;
    
            if (!ext || !Object.values(MIME_TYPE_MAP).includes(ext)) {
              console.warn(`Skipping unsupported file extension: ${filename}`);
              return;
            }
    
            // Infer MIME type from extension
            const inferredMimeType = Object.keys(MIME_TYPE_MAP).find(
              (key) => MIME_TYPE_MAP[key] === ext
            ) || 'application/octet-stream';
    
            const extractedFile = new File([blob], filename, { type: inferredMimeType });
    
            extracted.push({
              name: filename,
              blob: extractedFile,
              school: null,
              courseCode: null,
              courseName: "",
              documentType: "",
              description: "",
              fileType: ext,
            });
          })
        );
    
        setFiles(extracted);
      } catch (err) {
        console.error(err);
        toast({ title: "Failed to unzip file" });
      }
    };
    

  const handleChange = (index: number, key: keyof UploadedFile, value: string | null) => {
    setFiles((prev) => {
      const updated = [...prev];
      updated[index][key] = value as any;
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast({ title: "No files to upload" });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append("files", file.blob, file.name);
      formData.append(`metadata[${i}][school]`, file.school ?? "");
      formData.append(`metadata[${i}][courseCode]`, file.courseCode ?? "");
      formData.append(`metadata[${i}][courseName]`, file.courseName);
      formData.append(`metadata[${i}][documentType]`, file.documentType);
      formData.append(`metadata[${i}][description]`, file.description);
      formData.append(`metadata[${i}][fileType]`, file.fileType);
    });

    try {
      const res = await fetch("/api/admin/bulkUpload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast({ title: "Files uploaded successfully!" });
        setFiles([]);
      } else {
        const data = await res.json();
        toast({ title: data.message || "Upload failed" });
      }
    } catch (err) {
      toast({ title: "Error during upload" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="pt-10 pb-32">
      <div className="container">
        <Card className="mx-auto w-full max-w-4xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Upload</h2>

          <Input type="file" accept=".zip" onChange={handleZipUpload} className="mb-4" />

          {files.map((file, idx) => (
            <div key={idx} className="border rounded p-4 mb-4 space-y-3">
              <p className="text-sm font-semibold truncate">📄 {file.name}</p>
                <button
                  type="button"
                  onClick={() => {
                    setFiles((prev) => prev.filter((_, i) => i !== idx));
                  }}
                  className="text-sm text-red-500 hover:underline"
                >
                  Discard
                </button>

              <div className="grid gap-2">
                <Label>School</Label>
                <Combobox
                  selectedValue={file.school}
                  setSelectedValue={(val) => {
                    handleChange(idx, "school", val);
                    fetchCourses(val!);
                    handleChange(idx, "courseCode", null);
                    handleChange(idx, "courseName", "");
                  }}
                  data={schools}
                  placeholder="Select school..."
                  emptyState={<AddSchoolDialog fetchSchools={fetchSchools} />}
                />
              </div>

              <div className="grid gap-2">
                <Label>Course</Label>
                <Combobox
                  selectedValue={file.courseCode}
                  setSelectedValue={(val) => handleChange(idx, "courseCode", val)}
                  setCourseName={(val) => handleChange(idx, "courseName", val)}
                  data={courseList}
                  placeholder="Select course..."
                  disabled={!file.school}
                  emptyState={<AddCourseDialog contributeSchool={file.school!} fetchCourses={fetchCourses} />}
                />
              </div>

              <div className="grid gap-2">
                <Label>Type of document</Label>
                <Select
                  onValueChange={(val) => handleChange(idx, "documentType", val)}
                  value={file.documentType}
                >
                  <SelectTrigger className="w-full">
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

              <div className="grid gap-2">
                <Label>Description</Label>
                <Input
                  placeholder="e.g., Week 3 Notes"
                  value={file.description}
                  onChange={(e) => handleChange(idx, "description", e.target.value)}
                />
              </div>
            </div>
          ))}

          {files.length > 0 && (
            <Button onClick={handleSubmit} disabled={uploading}>
              {uploading ? "Uploading..." : "Submit All"}
            </Button>
          )}
        </Card>
      </div>
    </section>
  );
}
