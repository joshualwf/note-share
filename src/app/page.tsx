"use client";
import { InputMainSearch } from "@/components/InputMainSearch";
import { DocumentCard } from "@/components/DocumentCard";
import { SortSelect } from "@/components/SortSelect";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import FilterSheet from "@/components/FilterSheet";
import { TypeAnimation } from "react-type-animation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import searchAnimationData from "./assets/search-cartoon-animation.json";
import dynamic from "next/dynamic";

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
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

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
  const [loading, setLoading] = useState<boolean>(true);
  // used for pagination
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPageFromUrl = pageParam ? parseInt(pageParam) : 1;
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  useEffect(() => {
    if (currentPage === 1) {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}`); // no page=1 in URL
    } else {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/?page=${currentPage}`);
    }
  }, [currentPage]);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    resourceTypesFilter,
    schoolFilter,
    courseFilter,
    mainSearchQuery,
    sortBy,
  ]);

  const fetchDocuments = async (page = 1) => {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      resourceTypes: JSON.stringify(resourceTypesFilter),
      school: schoolFilter || "",
      courseCode: courseCodeFilter || "",
      courseName: courseNameFilter || "",
      search: mainSearchQuery || "",
      sortBy,
      limit: "5",
    });

    try {
      const res = await fetch(`/api/posts/getPosts?${params.toString()}`);
      const data = await res.json();
      setDocuments(data.posts);
      setDocumentCount(data.totalCount);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setDocuments([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchDocuments(currentPage);
  }, [
    currentPage,
    resourceTypesFilter,
    schoolFilter,
    courseFilter,
    mainSearchQuery,
    sortBy,
  ]);

  // pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(documentCount / itemsPerPage);

  return (
    <>
      <Head>
        <title>Free Study materials</title>
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Access free solutions, past year exam papers (PYP), lecture notes, study guides, course summaries, practicals, practice materials and cheatsheets for University, Junior College, Polytechnic, Secondary and Primary schools!"
          key="desc"
        />
        <meta property="og:title" content="Free Study materials" />
        <meta
          property="og:description"
          content="Access free solutions, past year exam papers (PYP), lecture notes, study guides, course summaries, practicals, practice materials and cheatsheets for University, Junior College, Polytechnic, Secondary and Primary schools!"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}/icon9.png`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div className="w-full flex flex-col fade-in">
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
                  "Free tutorials",
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
              {documentCount} {documentCount === 1 ? "result" : "results"}
            </h3>
            <div className="flex gap-2">
              <Link href="/contribute">
                <Button>
                  <FolderPlus />
                  <span className="hidden sm:inline">Contribute</span>
                </Button>
              </Link>
              {/* <ContributeDrawerDialog fetchDocument={fetchDocuments} /> */}
              <SortSelect selectedValue={sortBy} setSelectedValue={setSortBy} />
            </div>
          </div>
          {documents.length > 0 && (
            <>
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
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
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
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
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
            </>
          )}
          {documents.length === 0 && loading && (
            <div className="flex flex-col items-center self-center">
              <LoadingSpinner />
            </div>
          )}
          <div
            className={`${
              documents.length === 0 && !loading
                ? "flex flex-col items-center"
                : "hidden"
            }`}
          >
            <Lottie animationData={searchAnimationData} className="h-[150px]" />
            <span className="text">No matching materials found</span>
            <span className="text-muted-foreground mt-1 text-sm">
              Try using general keywords or check your spelling
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
