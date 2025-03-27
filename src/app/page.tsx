"use client";
import { InputMainSearch } from "@/components/InputMainSearch";
import { DocumentCard } from "@/components/DocumentCard";
import { SortSelect } from "@/components/SortSelect";
import { useMemo, useState, useEffect } from "react";
import { mockDocuments } from "./constants/mockData";
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
  user_id: string;
  school_name: string;
  course_code: string;
  title: string;
  content: string;
  file_key: string;
  post_type: string;
  upvote_count: number;
  created_at: Date;
};

export default function Home() {
  const [documents, setDocuments] = useState<Post[]>([]);
  const [sortBy, setSortBy] = useState<"Popularity" | "Latest">("Popularity");
  const [resourceTypesFilter, setResourceTypesFilter] = useState<string[]>([]);
  const [schoolFilter, setSchoolFilter] = useState<string | null>(null);
  const [modCodeFilter, setModCodeFilter] = useState<string | null>(null);
  const [mainSearchQuery, setMainSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch("/api/getPosts");
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.log("Invalid response: not an array", data);
          setDocuments([]);
          return;
        }

        setDocuments(data);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
        setDocuments([]);
      }
    };

    fetchDocuments();
  }, []);



  // Filter and sort documents dynamically
  const filteredAndSortedDocuments = useMemo(() => {
    let filteredDocs = [...documents];

    // Apply search query filter (title, school, modCode)
    if (mainSearchQuery.trim() !== "") {
      const query = mainSearchQuery.toLowerCase();
      filteredDocs = filteredDocs.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.school_name.toLowerCase().includes(query) ||
          doc.course_code.toLowerCase().includes(query)
      );
    }

    // Apply resource type filter
    if (resourceTypesFilter.length > 0) {
      filteredDocs = filteredDocs.filter((doc) =>
        resourceTypesFilter.includes(doc.post_type)
      );
    }

    // Apply school filter
    if (schoolFilter) {
      filteredDocs = filteredDocs.filter((doc) =>
        doc.school_name.toLowerCase().includes(schoolFilter.toLowerCase())
      );
    }

    // Apply module code filter
    if (modCodeFilter) {
      filteredDocs = filteredDocs.filter((doc) =>
        doc.course_code.toLowerCase().includes(modCodeFilter.toLowerCase())
      );
    }

    // Apply sorting
    return filteredDocs.sort((a, b) => {
      if (sortBy === "Popularity") {
        return b.upvote_count - a.upvote_count;
      } else {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }
    });
  }, [
    documents,
    sortBy,
    resourceTypesFilter,
    schoolFilter,
    modCodeFilter,
    mainSearchQuery,
  ]);

  // pagination
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDocuments = filteredAndSortedDocuments.slice(
    startIndex,
    endIndex
  );
  const totalPages = Math.ceil(
    filteredAndSortedDocuments.length / itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
              modCodeFilter={modCodeFilter}
              setModCodeFilter={setModCodeFilter}
            />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl py-10 self-center w-full">
        <div className="relative w-full flex flex-col gap-y-3">
          <div className="flex items-center justify-between p-4 text-xs sm:text-sm md:text-base">
            <h3 className="text-muted-foreground text-center text-l">
              {filteredAndSortedDocuments.length}{" "}
              {filteredAndSortedDocuments.length === 1 ? "result" : "results"}
            </h3>
            <div className="flex gap-2">
              <ContributeDrawerDialog />
              <SortSelect selectedValue={sortBy} setSelectedValue={setSortBy} />
            </div>
          </div>
          {paginatedDocuments.map((doc) => (
              <DocumentCard
              key={doc.id}
              id={doc.id}
              title={doc.title}
              school={doc.school_name}
              modCode={doc.course_code}
              likes={doc.upvote_count}
              file_key={doc.file_key}
              uploadTime={doc.created_at}
            />
          ))}
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => goToPage(currentPage - 1)}
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
                    onClick={() => goToPage(i + 1)}
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
                  onClick={() => goToPage(currentPage + 1)}
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
