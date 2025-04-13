import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import styles from "./document.module.css";
import DocumentViewer from "@/components/DocumentViewer";
import CommentSection from "@/components/CommentSection";

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
        <div className="flex flex-start p-3 border-b border-color-accent min-h-[50px] bg-accent">
          <span className="font-semibold">{title}</span>
        </div>
        <DocumentViewer postId={id} />
      </ResizablePanel>
      <ResizableHandle withHandle className="shadow-2xl" />
      <ResizablePanel
        defaultSize={25}
        minSize={20}
        className="h-full w-full flex flex-col"
      >
        <CommentSection postId={Number(id)} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default DocumentPage;
