"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

type Props = {
  postId: string;
};

function DocumentViewer({ postId }: Props) {
  const [docs, setDocs] = useState<{ uri: string; fileType: string }[] | null>(
    null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPresignedUrl() {
      try {
        const res = await fetch(`/api/getPost/${postId}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setDocs([{ uri: data.url, fileType: data.fileType }]);
      } catch (err) {
        console.error(err);
        setError("Unable to load document");
      }
    }

    if (postId) fetchPresignedUrl();
  }, [postId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!docs) return <p>Loading document...</p>;

  return (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      theme={{ primary: "#f1f5f9" }}
      config={{
        header: {
          disableHeader: true,
          disableFileName: true,
          retainURLParams: false,
        },
      }}
    />
  );
}

export default DocumentViewer;
