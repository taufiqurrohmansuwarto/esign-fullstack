import { selfSignApproveSign } from "@/services/users.services";
import { WarningOutlined, ExpandOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Space,
} from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import PdfAction from "./PdfAction";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ConfirmModal = ({ open, onCancel, documentData, signs }) => {
  const [form] = Form.useForm();

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    (data) => selfSignApproveSign(data),
    {
      onSuccess: () => {
        message.success("Document is sign successfully");
        queryClient.invalidateQueries(["document-detail", documentData?.id]);
        router.push(`/user/document/${documentData?.id}/view`);
        onCancel();
      },
      onError: (error) => {
        const messageError = error?.response?.data?.message;
        message.error(messageError);
      },
    }
  );

  const handleConfirm = async () => {
    const result = await form.validateFields();

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

    const dataSend = {
      documentId: documentData?.id,
      data: {
        passphrase: result.passphrase,
        reason: result.reason,
        properties,
      },
    };

    mutate(dataSend);
  };

  return (
    <Modal
      centered
      title="Confirmation"
      confirmLoading={isLoading}
      closable={false}
      maskClosable={false}
      open={open}
      onOk={handleConfirm}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          reason: "I approve this document",
        }}
      >
        <Form.Item
          rules={[{ required: true, message: "Passphrase cannot be empty" }]}
          name="passphrase"
          label="Passphrase"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Reason cannot be empty" }]}
          name="reason"
          label="Reason"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

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
  showLineStamp,
  hideLineStamp,
  line,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    hideLineStamp();
  };

  const handleCancel = () => {
    setOpen(false);
    showLineStamp();
  };

  return (
    <>
      <ConfirmModal
        documentData={documentData}
        documentProperty={documentProperty}
        signs={signs}
        open={open}
        onCancel={handleCancel}
      />
      {loading === "idle" && (
        <div style={{ padding: 10 }}>
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
                <Button type="primary" onClick={addSign} icon={<ExpandOutlined/>}>
                  Place Signature
                </Button>
                <Button disabled={signs.length === 0} onClick={handleOpen}>
                  Finish
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      )}
      {signs?.length !== 0 && (
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
                borderRadius: 5,
                height: "100%",
                overflow: "hidden",
                textAlign: "center",
                padding: 4,
                backgroundColor: "#8c8c8c",
              }}
            >
              {loading === "idle" && docUrl && (
                <>
                  <PdfAction
                    line={line}
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
