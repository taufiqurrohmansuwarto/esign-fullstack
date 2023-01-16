import { WarningOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Row,
  Skeleton,
  Space,
} from "antd";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import PdfAction from "./PdfAction";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// main export
const SelfSignActions = function ({
  loading,
  docUrl,
  signSymbol,
  documentProperty,
  signFilter,
  signs,
  changePageDocument,
  loadPageSuccess,
  documents,
  changePagination,
  updateFrame,
  documentData,
  addSign,
  removeSign,
}) {
  const [open, setOpen] = useState(false);
  const [document, setDocument] = useState(null);
  const [otp, setOtp] = useState("");
  const [reason, setReason] = useState("I approve this document");
  const [passphrase, setPassphrase] = useState("");

  const handleSign = async () => {
    try {
      const { id } = documentData;
      const properties = signs.map((sign) => {
        const { frame, page } = sign;
        const [x, y] = frame.translate;
        const { height, width } = frame;

        const xPos = x < 0 ? 0 : x;
        const yPos = y < 0 ? 0 : y;

        return {
          xPos,
          yPos,
          height,
          width,
          page,
        };
      });

      const data = {
        documentId: id,
        properties,
        otp,
        passphrase,
        reason,
      };

      //   await approveSignMutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    const { id } = documentData;
    await otpMutation.mutateAsync(id);
  };

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
      <Modal
        title="OTP Verification"
        width={700}
        zIndex={99999}
        closable={false}
        onOk={handleSign}
        maskClosable={false}
        centered
        onCancel={() => {
          setOpen(false);
        }}
      >
        <p>We already sent code verification to your email. Please verify.</p>
        <Space direction="vertical">
          <Input
            style={{ width: 300 }}
            placeholder="Passphrase"
            value={passphrase}
            onChange={(e) => setPassphrase(e?.target?.value)}
          />
          <InputNumber
            style={{ width: 300 }}
            placeholder="OTP Number"
            value={otp}
            onChange={(e) => setOtp(e)}
          />
          <Input
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Space>
      </Modal>
      {JSON.stringify(loading)}
      {loading === "idle" && (
        <div style={{ padding: 5 }}>
          <Row justify="center">
            <Col push={2}>
              <Pagination
                simple
                current={documents.currentPage}
                total={documents.totalPage}
                defaultPageSize={1}
                size="small"
                onChange={changePagination}
              />
            </Col>
            <Col push={6}>
              <Space>
                <Button
                  type="primary"
                  onClick={addSign}
                  // disabled={otpMutation.isLoading}
                >
                  Place Signature
                </Button>
                <Button
                  disabled={signs.length === 0}
                  // loading={otpMutation.isLoading}
                  onClick={onSubmit}
                >
                  Finish
                </Button>
              </Space>
            </Col>
            {/* )} */}
          </Row>
        </div>
      )}
      {signs.length !== 0 && (
        <div style={{ backgroundColor: "#531dab", padding: 10 }}>
          <Row justify="center">
            <Col>
              <div style={{ color: "white" }}>
                <WarningOutlined />
                {`  ${signs.length} sign total. `}
                {signFilter.length !== 0 && (
                  <span>{signFilter.length} at this page.</span>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
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
                <>
                  <PdfAction
                    docUrl={docUrl}
                    loadPageSuccess={loadPageSuccess}
                    changePageDocument={changePageDocument}
                    documents={documents}
                    signFilter={signFilter}
                    images={signSymbol}
                    documentProperty={documentProperty}
                    updateFrame={updateFrame}
                    removeSign={removeSign}
                  />
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SelfSignActions;
