"use client";
import { InputMainSearch } from "@/components/InputMainSearch";
import { DocumentCard } from "@/components/DocumentCard";
import { SortSelect } from "@/components/SortSelect";
import { useMemo, useState } from "react";
import { mockDocuments } from "./constants/mockData";
import FilterSheet from "@/components/FilterSheet";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const [sortBy, setSortBy] = useState<"Popularity" | "Latest">("Popularity");
  const [resourceTypesFilter, setResourceTypesFilter] = useState<string[]>([]);
  const [schoolFilter, setSchoolFilter] = useState<string | null>(null);

  // Filter and sort documents dynamically
  const filteredAndSortedDocuments = useMemo(() => {
    let filteredDocs = [...mockDocuments];

    // Apply resource type filter
    if (resourceTypesFilter.length > 0) {
      filteredDocs = filteredDocs.filter((doc) =>
        resourceTypesFilter.some((type) => doc.resourceType.includes(type))
      );
    }

    // Apply school filter
    if (schoolFilter) {
      filteredDocs = filteredDocs.filter((doc) =>
        doc.description.toLowerCase().includes(schoolFilter.toLowerCase())
      );
    }

    // Apply sorting
    return filteredDocs.sort((a, b) => {
      if (sortBy === "Popularity") {
        return b.likes - a.likes; // Higher likes first
      } else {
        return (
          new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime()
        ); // Newest first
      }
    });
  }, [sortBy, resourceTypesFilter, schoolFilter]);
  return (
    <>
      <div className="h-full w-full flex flex-col">
        <div className="h-full w-full flex flex-col pt-8 pb-5 bg-accent px-4">
          <div>
            <h1 className="text-center text-4xl font-bold sm:text-5xl">
              Study Materials
            </h1>
            <div className="mt-4 text-center text-lg sm:text-2xl">
              <TypeAnimation
                // style={{ whiteSpace: "pre-line" }}
                // wrapper="span"
                className="mt-4 text-center text-lg sm:text-2xl text-green-500 font-bold"
                speed={60}
                sequence={[
                  // Same substring at the start will only be typed once, initially
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
            />
            <FilterSheet
              resourceTypesFilter={resourceTypesFilter}
              setResourceTypesFilter={setResourceTypesFilter}
              schoolFilter={schoolFilter}
              setSchoolFilter={setSchoolFilter}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-20 pt-10">
        <div className="relative w-full flex flex-col gap-y-3">
          <div className="flex items-center justify-between p-4 text-xs sm:grid-cols-4 sm:text-sm md:text-base">
            <h3 className="text-muted-foreground text-center text-l ">
              {filteredAndSortedDocuments.length}{" "}
              {filteredAndSortedDocuments.length == 1 ? "result" : "results"}
            </h3>
            {/* <SortSelect selectedValue={sortBy} setSelectedValue={setSortBy} /> */}
            <SortSelect selectedValue={sortBy} setSelectedValue={setSortBy} />
          </div>

          {filteredAndSortedDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              description={doc.description}
              likes={doc.likes}
              uploadTime={doc.uploadTime}
            />
          ))}
        </div>
      </div>
    </>
  );
}
