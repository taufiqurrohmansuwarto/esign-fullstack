import DocumentLoading from "@/components/DocumentLoading";
import { Col, Pagination, Row, Space } from "antd";
import { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import RecipientFloatingButton from "./RecipientFloatingButton";
import RecipientsMove from "./RecipientsMove";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfDocument = ({
  docUrl,
  changePageDocument,
  loadPageSuccess,
  documents,
  dataSignFilter,
  showSigns,
}) => {
  const onLoadDocumentSucces = ({ numPages }) => {
    changePageDocument({ currentPage: 1, totalPage: numPages });
  };

  const onLoadPageSuccess = ({
    width,
    height,
    originalWidth,
    originalHeight,
  }) => {
    const payload = { width, height, originalWidth, originalHeight };
    loadPageSuccess(payload);
    showSigns();
  };

  const ref = useRef(null);

  return (
    <div
      style={{
        width: "100%",
        height: "86vh",
        overflowY: "scroll",
        boxSizing: "content-box",
        padding: "0px 10px",
      }}
    >
      <Row justify="center">
        <Col>
          <div ref={ref} style={{ position: "relative" }}>
            {dataSignFilter.map((sign) => (
              <RecipientsMove
                currentRef={ref.current}
                frame={sign.frame}
                key={sign.id}
                id={sign.id}
                images={sign.stamp}
              />
            ))}
            <Document
              file={docUrl}
              loading={<DocumentLoading />}
              onLoadSuccess={onLoadDocumentSucces}
            >
              <Page
                onLoadSuccess={onLoadPageSuccess}
                renderTextLayer={false}
                scale={1}
                pageNumber={documents.currentPage}
              />
            </Document>
          </div>
        </Col>
      </Row>
    </div>
  );
};

// main export
const RecipientsViewer = function ({
  loading,
  docUrl,
  signSymbol,
  dataSignFilter,
  changePageDocument,
  loadPageSuccess,
  documents,
  changePagination,
  documentData,
  showSigns,
}) {
  return (
    <>
      <div style={{ padding: 5 }}>
        <Row justify="center">
          <Space>
            {documentData && (
              <>
                <Pagination
                  simple
                  current={documents.currentPage}
                  total={documents.totalPage}
                  defaultPageSize={1}
                  size="small"
                  onChange={changePagination}
                />
              </>
            )}
          </Space>
        </Row>
      </div>
      <div>
        <Row justify="center" style={{ zIndex: 1 }}>
          <RecipientFloatingButton data={documentData} />
          <Col span={24}>
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                textAlign: "center",
                padding: 4,
                backgroundColor: "#8c8c8c",
              }}
            >
              {loading === "idle" && docUrl && (
                <PdfDocument
                  showSigns={showSigns}
                  docUrl={docUrl}
                  loadPageSuccess={loadPageSuccess}
                  changePageDocument={changePageDocument}
                  documents={documents}
                  dataSignFilter={dataSignFilter}
                  images={signSymbol}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RecipientsViewer;
