"use client";
import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function page() {
  const docs = [
    // { uri: "https://url-to-my-pdf.pdf" }, // Remote file
    { uri: "/example-documents/dsa2101-pyp.pdf" },
    { uri: "/example-documents/cs2040-slides.pdf" }, // Local File
  ];

  return (
    // <div className="w-full h-full flex flex-col items-center">
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel defaultSize={75} className="h-full w-full !overflow-auto">
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
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={25}
        className="h-full w-full !overflow-auto bg-muted"
      >
        <span className="font-semibold p-2">Comments</span>
      </ResizablePanel>
    </ResizablePanelGroup>
    // </div>
  );
}

export default page;
