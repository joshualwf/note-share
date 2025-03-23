import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ThumbsUp, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

function Comment() {
  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <div className="flex flex-row gap-1">
          <span className="font-bold text-xs">@john_doe123</span>
          <span className="text-xs font-light">5 months ago</span>
        </div>
        <span className="text-sm mt-1">
          wow! The developers of this website must be really good.
        </span>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex gap-1 items-center">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-xs">999</span>
          </div>
          <span className="text-xs font-bold">Reply</span>
        </div>
        {/* if got replies */}
        <Button
          variant="ghost"
          className="flex p-1 mt-1 items-center gap-1 border rounded-2xl border-transparent hover:bg-accent"
        >
          <ChevronDown className="w-4 h-4" color="#0b57d0" />
          <span className="text-xs text-primary font-bold">1 reply</span>
        </Button>
      </div>
    </div>
  );
}

export default Comment;
