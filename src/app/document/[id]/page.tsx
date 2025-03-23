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

function page() {
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
        className="h-full w-full bg-muted flex flex-col"
      >
        <div className="flex flex-start p-3 border-b border-color-accent min-h-[50px]">
          <span className="font-semibold">Comments</span>
        </div>
        <div className="flex flex-col flex-grow w-full px-4">
          <div className="flex flex-col flex-grow w-full"></div>
          <div className="flex w-full mb-6 gap-2 border border-accent rounded-lg p-4 shadow-lg">
            <Input className="" placeholder="Ask anything..."></Input>
            <Button>send</Button>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default page;
