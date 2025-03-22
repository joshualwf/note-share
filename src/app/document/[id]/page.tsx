"use client";
import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

function page() {
  const docs = [
    // { uri: "https://url-to-my-pdf.pdf" }, // Remote file
    { uri: "/example-documents/dsa2101-pyp.pdf" },
    { uri: "/example-documents/cs2040-slides.pdf" }, // Local File
  ];

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="max-w-[900] w-full border-2 rounded-md overflow-hidden">
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
      </div>
    </div>
  );
}

export default page;
