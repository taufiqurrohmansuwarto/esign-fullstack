import { informationDocument } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RenderPdf = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      {JSON.stringify({
        numPages,
        pageNumber,
      })}
      <Document
        loading={<div>loading...</div>}
        file={{ url }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
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
