"use client";
import { InputMainSearch } from "@/components/InputMainSearch";
import { DocumentCard } from "@/components/DocumentCard";
import { SortSelect } from "@/components/SortSelect";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import FilterSheet from "@/components/FilterSheet";
import { TypeAnimation } from "react-type-animation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ContributeDrawerDialog } from "@/components/ContributeDrawerDialog";

type Post = {
  id: number;
  userId: string;
  schoolName: string;
  courseCode: string;
  courseName: string;
  description: string;
  content: string;
  fileKey: string;
  postType: string;
  upvoteCount: number;
  createdAt: Date;
};

export default function Home() {
  const [documents, setDocuments] = useState<Post[]>([]);
  const [documentCount, setDocumentCount] = useState(0);
  const [sortBy, setSortBy] = useState<"Popularity" | "Latest">("Popularity");
  const [resourceTypesFilter, setResourceTypesFilter] = useState<string[]>([]);
  const [schoolFilter, setSchoolFilter] = useState<string | null>(null);
  const [courseFilter, setCourseFilter] = useState<string | null>(null);
  const [courseCodeFilter, setCourseCodeFilter] = useState<string | null>(null);
  const [courseNameFilter, setCourseNameFilter] = useState<string | null>(null);
  const [mainSearchQuery, setMainSearchQuery] = useState<string>("");
  // used for pagination
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPageFromUrl = pageParam ? parseInt(pageParam) : 1;
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  useEffect(() => {
    if (currentPage === 1) {
      router.push("/"); // no page=1 in URL
    } else {
      router.push(`/?page=${currentPage}`);
    }
  }, [currentPage]);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [resourceTypesFilter, schoolFilter, courseFilter, mainSearchQuery, sortBy]);

  const fetchDocuments = async (page = 1) => {
    const params = new URLSearchParams({
      page: page.toString(),
      resourceTypes: JSON.stringify(resourceTypesFilter),
      school: schoolFilter || "",
      courseCode: courseCodeFilter || "",
      courseName: courseNameFilter || "",
      search: mainSearchQuery || "",
      sortBy,
    });

    try {
      const res = await fetch(`/api/getPosts?${params.toString()}`);
      const data = await res.json();
      setDocuments(data.posts);
      setDocumentCount(data.totalCount);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setDocuments([]);
    }
  };
  useEffect(() => {
    fetchDocuments(currentPage);
  }, [currentPage, resourceTypesFilter, schoolFilter, courseFilter, mainSearchQuery, sortBy]);

  // pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(
    documentCount / itemsPerPage
  );

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col pt-8 pb-5 bg-accent px-4">
          <div>
            <h1 className="text-center text-4xl font-bold sm:text-5xl">
              Study Materials
            </h1>
            <div className="mt-4 text-center text-lg sm:text-2xl">
              <TypeAnimation
                className="mt-4 text-center text-lg sm:text-2xl text-muted-foreground font-bold"
                speed={60}
                sequence={[
                  "Free exam papers",
                  1500,
                  "Free notes",
                  1500,
                  "Free cheatsheets",
                  1500,
                  "Free tutorial solutions",
                  1500,
                  "Free exam solutions",
                  1500,
                  "Free discussions",
                  1500,
                ]}
                repeat={Infinity}
              />
            </div>
          </div>

          <div className="bg-accent h-full py-3 px-5 flex justify-center gap-2">
            <InputMainSearch
              type="search"
              placeholder="Search..."
              className="max-w-2xl"
              value={mainSearchQuery}
              onChange={(e) => setMainSearchQuery(e.target.value)}
            />
            <FilterSheet
              resourceTypesFilter={resourceTypesFilter}
              setResourceTypesFilter={setResourceTypesFilter}
              schoolFilter={schoolFilter}
              setSchoolFilter={setSchoolFilter}
              courseFilter={courseFilter}
              setCourseFilter={setCourseFilter}
              setCourseCodeFilter={setCourseCodeFilter}
              setCourseNameFilter={setCourseNameFilter}
            />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl py-10 self-center w-full">
        <div className="relative w-full flex flex-col gap-y-3">
          <div className="flex items-center justify-between p-4 text-xs sm:text-sm md:text-base">
            <h3 className="text-muted-foreground text-center text-l">
              {documents.length}{" "}
              {documents.length === 1 ? "result" : "results"}
            </h3>
            <div className="flex gap-2">
              <ContributeDrawerDialog fetchDocument={fetchDocuments} />
              <SortSelect selectedValue={sortBy} setSelectedValue={setSortBy} />
            </div>
          </div>
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              id={doc.id}
              title={doc.description}
              school={doc.schoolName}
              courseCode={doc.courseCode}
              courseName={doc.courseName}
              likes={doc.upvoteCount}
              fileKey={doc.fileKey}
              uploadTime={doc.createdAt}
            />
          ))}
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(i + 1)}
                    className={
                      currentPage === i + 1
                        ? "font-bold text-primary bg-accent"
                        : ""
                    }
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
