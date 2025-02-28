import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  return (
    <>
      <div className="h-full w-full flex flex-col">
        <div className="h-full w-full flex flex-col pt-8 pb-5 bg-secondary px-4">
          <div>
            <h1 className="text-primary text-center text-4xl font-bold sm:text-5xl">
              Study Materials
            </h1>
            <div className="mt-4 text-center text-lg text-priimary sm:text-2xl">
              Resources shared by top students all around the world.
            </div>
          </div>

          <div className="bg-secondary h-full py-3 px-5 flex justify-center gap-2">
            <Input
              type="search"
              placeholder="Search..."
              className="max-w-2xl"
            />
            <Button variant="outline">Filters</Button>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-20 pt-10">
        <div className="relative w-full divide-y border border-slate-200">
          <div>
            <div className="flex items-center justify-between p-4 text-xs text-slate-700 sm:grid-cols-4 sm:text-sm md:text-base">
              <h3 className="text-primary text-center text-l font-bold">
                2290 Results
              </h3>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Popularity">Popularity</SelectItem>
                  <SelectItem value="Latest">Latest</SelectItem>
                  <SelectItem value="Relevance">Relevance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-4 text-xs text-slate-700 sm:grid-cols-4 sm:text-sm md:text-base">
              hi
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
