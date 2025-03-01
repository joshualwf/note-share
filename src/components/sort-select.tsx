import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortSelectProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export function SortSelect({
  selectedValue,
  setSelectedValue,
}: SortSelectProps) {
  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
      {" "}
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Popularity">Popularity</SelectItem>
        <SelectItem value="Latest">Latest</SelectItem>
        <SelectItem value="Relevance">Relevance</SelectItem>
      </SelectContent>
    </Select>
  );
}
