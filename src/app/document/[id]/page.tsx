"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
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

function DocumentPage() {
  const searchParams = useSearchParams();
  const fileKey = searchParams.get("fileKey");
  const title = searchParams.get("title");

  const [docs, setDocs] = useState<{ uri: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fileKey) return;

    const apiUrl = `/api/getPost?fileKey=${encodeURIComponent(fileKey)}`;
    setDocs([{ uri: apiUrl }]);
    setLoading(false);
  }, [fileKey]);

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel
        defaultSize={75}
        className={`h-full w-full !overflow-auto ${styles.scrollTransparent}`}
      >
        {loading ? (
          <div className="p-4">Loading document...</div>
        ) : docs.length > 0 ? (
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            theme={{ primary: "#f1f5f9" }}
          />
        ) : (
          <div className="p-4">No document found.</div>
        )}
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
        <div className="flex flex-col flex-grow w-full px-4 py-6 h-full">
          <div className="flex flex-col w-full overflow-y-auto flex-grow">
            {mockComments.map((comment, index) => (
              <Comment key={index} {...comment} />
            ))}
          </div>
          <div className="flex w-full gap-2 border border-color-accent rounded-2xl p-4 shadow-lg">
            <Input placeholder="Ask anything" />
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
