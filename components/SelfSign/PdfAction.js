import { Col, Row } from "antd";
import { useRef } from "react";
import { Document, Page } from "react-pdf";
import DocumentLoading from "../DocumentLoading";
import SignMove from "./SelfSignMove";

const PdfAction = ({
  line,
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
                line={line}
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
                // this magic number dont change
                scale={1}
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
