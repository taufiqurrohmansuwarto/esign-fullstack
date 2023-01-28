import { Row, Col } from "antd";
import React from "react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import DocumentLoading from "./DocumentLoading";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfView({ data, url }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <Row justify="center" style={{ zIndex: 1, backgroundColor: "grayText" }}>
      <Col span={24}>
        <div
          style={{
            width: "100%",
            height: "100%",
            //     overflow: "hidden",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "70vh",
              overflowY: "scroll",
              boxSizing: "content-box",
              padding: "0px 10px",
            }}
          >
            <Row justify="center" style={{ padding : 16}}>
              <Document
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<DocumentLoading />}
                file={url}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div
                    key={`page_${index + 1}`}
                    style={{
                      padding: 6,
                    }}
                  >
                    <Page
                      scale={1.2}
                      renderTextLayer={false}
                      renderMode="canvas"
                      renderAnnotationLayer={false}
                      pageNumber={index + 1}
                    />
                  </div>
                ))}
              </Document>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default PdfView;
