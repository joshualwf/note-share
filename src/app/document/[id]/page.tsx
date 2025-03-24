"use client";
import React from "react";
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
  const docs = [
    // { uri: "https://url-to-my-pdf.pdf" }, // Remote file
    { uri: "/example-documents/dsa2101-pyp.pdf" },
    { uri: "/example-documents/cs2040-slides.pdf" }, // Local File
  ];
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel
        defaultSize={75}
        className={`h-full w-full !overflow-auto ${styles.scrollTransparent}`}
      >
        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          theme={{
            primary: "#f1f5f9",
            // secondary: "#ffffff",
            // tertiary: "#5296d899",
            // textPrimary: "#ffffff",
            // textSecondary: "#5296d8",
            // textTertiary: "#00000099",
            // disableThemeScrollbar: false,
          }}
        />
      </ResizablePanel>
      <ResizableHandle withHandle className="shadow-2xl" />
      <ResizablePanel
        defaultSize={25}
        minSize={20}
        className="h-full w-full  flex flex-col"
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
            <Input placeholder="Ask anything"></Input>
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
