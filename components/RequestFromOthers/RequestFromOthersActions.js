import { Card, Col, Pagination, Row, Skeleton, Space } from "antd";
import { useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import RequestFromOthersMove from "./RequestFromOthersMove";
import ShareAndRequest from "./ShareAndRequest";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfDocument = ({
  docUrl,
  changePageDocument,
  loadPageSuccess,
  documents,
  documentProperty,
  dataSignFilter,
  updateFrame,
  removeSign,
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
              <RequestFromOthersMove
                currentRef={ref.current}
                frame={sign.frame}
                key={sign.id}
                id={sign.id}
                bounds={{
                  height: documentProperty.height,
                  width: documentProperty.width,
                }}
                images={sign.stamp}
                updateFrame={updateFrame}
                removeSign={removeSign}
              />
            ))}
            <Document
              file={`data:application/pdf;base64,${docUrl}`}
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
const RequestFromOthersActions = function ({
  loading,
  docUrl,
  signSymbol,
  documentProperty,
  dataSignFilter,
  dataSign,
  changePageDocument,
  loadPageSuccess,
  documents,
  changePagination,
  updateFrame,
  documentData,
  removeSign,
}) {
  if (loading == "loading") {
    return (
      <Row justify="center" align="middle" style={{ padding: 18 }}>
        <Card style={{ width: 600, height: 800 }}>
          <Skeleton avatar={{ size: 100 }} active />
          <Skeleton paragraph active />
          <Skeleton paragraph active />
          <Row justify="center" align="middle">
            <Space size="large">
              <Skeleton.Image size="large" active />
              <Skeleton.Image size="large" active />
              <Skeleton.Image size="large" active />
            </Space>
          </Row>
          <Skeleton paragraph active />
        </Card>
      </Row>
    );
  }

  return (
    <>
      <div style={{ padding: 5 }}>
        <Row justify="center">
          <Space>
            <ShareAndRequest />
            <Pagination
              simple
              current={documents.currentPage}
              total={documents.totalPage}
              defaultPageSize={1}
              size="small"
              onChange={changePagination}
            />
          </Space>
        </Row>
      </div>
      <div>
        <Row justify="center" style={{ zIndex: 1 }}>
          <Col span={24}>
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              {loading === "idle" && docUrl && (
                <PdfDocument
                  docUrl={docUrl}
                  loadPageSuccess={loadPageSuccess}
                  changePageDocument={changePageDocument}
                  documents={documents}
                  dataSignFilter={dataSignFilter}
                  images={signSymbol}
                  documentProperty={documentProperty}
                  updateFrame={updateFrame}
                  removeSign={removeSign}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RequestFromOthersActions;
