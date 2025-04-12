import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import styles from "./document.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import Comment from "@/components/Comment";
import { mockComments } from "@/app/constants/mockData";
import DocumentViewer from "@/components/DocumentViewer";

type Props = {
  params: { id: string };
  searchParams: { title?: string; fileKey?: string };
};

async function DocumentPage({ params, searchParams }: Props) {
  const { title } = await searchParams;
  const { id } = await params;
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel
        defaultSize={75}
        className={`h-full w-full !overflow-auto ${styles.scrollTransparent}`}
      >
        <h1>this is the title: {title}</h1>
        <DocumentViewer postId={id} />
      </ResizablePanel>
      <ResizableHandle withHandle className="shadow-2xl" />
      <ResizablePanel
        defaultSize={25}
        minSize={20}
        className="h-full w-full flex flex-col"
      >
        <div className="flex flex-start p-3 border-b border-color-accent min-h-[50px]">
          <span className="font-semibold">Comments</span>
        </div>
        <div className="flex flex-col grow w-full pb-6 justify-between overflow-hidden">
          <div
            className={`flex flex-col w-full overflow-y-auto px-4 pt-4 gap-2 ${styles.scrollTransparent}`}
          >
            {mockComments.map((comment, index) => (
              <Comment key={index} {...comment} />
            ))}
          </div>
          <div className="flex gap-2 border border-color-accent rounded-2xl p-4 shadow-lg mx-4">
            <Input className="grow" placeholder="Ask anything"></Input>
            <Button>
              <SendHorizontal />
            </Button>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default DocumentPage;
