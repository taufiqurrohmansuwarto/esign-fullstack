import { informationDocument } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton } from "antd";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import DocumentLoading from "../DocumentLoading";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RenderPdf = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Button type="primary">Hello word</Button>
      <Document
        loading={<DocumentLoading />}
        file={{ url }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          renderTextLayer={false}
          renderAnnotationLayer={false}
          scale={1.2}
          pageNumber={pageNumber}
        />
      </Document>
    </div>
  );
};

function SelfSignAction({ documentId }) {
  const { data, isLoading } = useQuery(
    ["document-information", documentId],
    () => informationDocument(documentId),
    { enabled: !!documentId, refetchOnWindowFocus: false }
  );
  return (
    <Skeleton loading={isLoading}>
      <RenderPdf url={data?.document_url} />
    </Skeleton>
  );
}

export default SelfSignAction;
