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

  // insert api call to get the public url + file type here, dont need to use useEffect/have any loading state because the document viewer alr handles that
  const docPublicUrl = `https://noteshare-uploads.s3.ap-southeast-2.amazonaws.com/uploads/b0266786-4d1b-426f-b540-8f3d7b3ac21c.pptx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVWABJOMECPLN7NP4%2F20250405%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250405T152901Z&X-Amz-Expires=60&X-Amz-Signature=a7c8a3367d8e979c9c3f949a122187176c419ee7dd0f88a9e7fd8ad37a749036&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject`;
  const docFileType = "pptx";
  const docs = [{ uri: docPublicUrl, fileType: docFileType }];

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel
        defaultSize={75}
        className={`h-full w-full !overflow-auto ${styles.scrollTransparent}`}
      >
        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          theme={{ primary: "#f1f5f9" }}
        />
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
