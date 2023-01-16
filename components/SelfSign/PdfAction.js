import { useEffect, useRef } from "react";
import { Row, Col } from "antd";
import DocumentLoading from "../DocumentLoading";
import { Page, Document } from "react-pdf";
import SignMove from "./SelfSignMove";

const PdfAction = ({
  docUrl,
  changePageDocument,
  loadPageSuccess,
  documents,
  documentProperty,
  signFilter,
  updateFrame,
  images,
  removeSign,
}) => {
  const onLoadDocumentSucces = ({ numPages }) => {
    changePageDocument({
      currentPage: 1,
      totalPage: numPages,
    });
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
            {signFilter.map((sign) => (
              <SignMove
                currentRef={ref.current}
                frame={sign.frame}
                key={sign.id}
                id={sign.id}
                bounds={{
                  height: documentProperty?.height,
                  width: documentProperty?.width,
                }}
                images={images}
                updateFrame={updateFrame}
                removeSign={removeSign}
              />
            ))}
            <Document
              loading={<DocumentLoading />}
              file={docUrl}
              onLoadSuccess={onLoadDocumentSucces}
            >
              <Page
                onRenderSuccess={onLoadPageSuccess}
                renderTextLayer={false}
                scale={1.2}
                pageNumber={documents?.currentPage}
              />
            </Document>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PdfAction;
