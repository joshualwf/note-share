"use client";
import { Input } from "@/components/ui/input";
import { DocumentCard } from "@/components/DocumentCard";
import { SortSelect } from "@/components/SortSelect";
import { useState } from "react";
import { mockDocuments } from "@/mockData";
import FilterSheet from "@/components/FilterSheet";

export default function Home() {
  const [sortBy, setSortBy] = useState("Popularity");
  return (
    <>
      <div className="h-full w-full flex flex-col">
        <div className="h-full w-full flex flex-col pt-8 pb-5 bg-accent px-4">
          <div>
            <h1 className="text-primary text-center text-4xl font-bold sm:text-5xl">
              Study Materials
            </h1>
            <div className="mt-4 text-center text-lg text-priimary sm:text-2xl">
              Resources shared by top students all around the world.
            </div>
          </div>

          <div className="bg-accent h-full py-3 px-5 flex justify-center gap-2">
            <Input
              type="search"
              placeholder="Search..."
              className="max-w-2xl"
            />
            <FilterSheet />
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-20 pt-10">
        <div className="relative w-full flex flex-col gap-y-3">
          <div className="flex items-center justify-between p-4 text-xs sm:grid-cols-4 sm:text-sm md:text-base">
            <h3 className="text-muted-foreground text-center text-l ">
              2290 results
            </h3>
            <SortSelect selectedValue={sortBy} setSelectedValue={setSortBy} />
          </div>

          {mockDocuments.map((doc) => (
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
