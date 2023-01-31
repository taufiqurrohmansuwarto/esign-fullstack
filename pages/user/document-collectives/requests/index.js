import DocumentCollectiveList from "@/components/DocumentCollective/DocumentCollectiveList";
import UserLayout from "@/components/UserLayout";
import { collectivesTypes } from "@/lib/client-utils";
import { createDocumentCollectiveRequest } from "@/services/users.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useState } from "react";

const { default: PageContainer } = require("@/components/pro/PageContainer");

const RequestModal = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate: create, isLoading: isLoadingCreate } = useMutation(
    (data) => createDocumentCollectiveRequest(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("document-collectives-requests");
        message.success("Request has been created");
        onCancel();
      },
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
    }
  );

  const handleOk = async () => {
    const value = await form.validateFields();
    create(value);
  };

  return (
    <Modal
      confirmLoading={isLoadingCreate}
      onOk={handleOk}
      centered
      width={600}
      title="Form Document Collective"
      open={open}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Select showSearch>
            {collectivesTypes?.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Title is required" }]}
          initialValue={1}
          label="Total Document"
          name="total"
        >
          <InputNumber min={1} max={200} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const DocumentCollectives = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <PageContainer title="Document Collectives">
      <Button onClick={handleOpen}>Add Request</Button>
      <DocumentCollectiveList />
      <RequestModal open={open} onCancel={handleClose} />
    </PageContainer>
  );
};

DocumentCollectives.getLayout = (page) => {
  return <UserLayout active="/user/document-collectives">{page}</UserLayout>;
};

DocumentCollectives.Auth = {
  role: "USER",
};

export default DocumentCollectives;
