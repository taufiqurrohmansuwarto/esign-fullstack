import { takeFormat } from "@/lib/client-utils";
import { requestFromOthersUpload } from "@/services/users.services";
import { InboxOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, message, Modal, Upload } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ShowModalEdit = ({ onCancel, open, filename, file }) => {
  const router = useRouter();

  const [form] = Form.useForm();
  const onSuccess = (data) => {
    router.push(
      `/user/upload/request-from-others/upload?documentId=${data?.id}`
    );
    onCancel();
  };

  const { mutate: onUpload, isLoading } = useMutation(
    (data) => requestFromOthersUpload(data),
    {
      onSuccess,
      onError: (e) => message.error(e),
    }
  );

  useEffect(() => {
    form.setFieldsValue({
      title: takeFormat(filename),
    });
  }, [form, filename, file]);

  const handleFinisih = async () => {
    try {
      const result = await form.validateFields();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", result?.title);
      formData.append("workflow", "requestFromOthers");
      onUpload(formData);
    } catch (error) {
      message.error(error);
      console.log(error);
    }
  };

  return (
    <Modal
      title="Filename"
      onOk={handleFinisih}
      centered
      confirmLoading={isLoading}
      open={open}
      onCancel={onCancel}
    >
      <Form
        form={form}
        initialValues={{
          title: takeFormat(filename),
        }}
      >
        <Form.Item
          extra="You can change the filename before uploading"
          rules={[{ required: true, message: "Filename cannot be empty" }]}
          name="title"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

function RequestFromOthersUploader() {
  const [filename, setFilename] = React.useState("");

  const [file, setFile] = React.useState(null);

  const [open, setOpen] = useState(false);

  const beforeUpload = (file) => {
    setFile(file);
    const { name } = file;
    setOpen(true);
    setFilename(name);
  };

  const onCancel = () => setOpen(false);

  return (
    <>
      <ShowModalEdit
        filename={filename}
        setFilename={setFilename}
        file={file}
        open={open}
        onCancel={onCancel}
      />
      <Upload.Dragger
        maxCount={1}
        beforeUpload={beforeUpload}
        multiple={false}
        accept=".pdf"
        showUploadList={{
          showDownloadIcon: false,
          showPreviewIcon: false,
          showRemoveIcon: false,
        }}
      >
        <p>
          <InboxOutlined />
        </p>
        <p>Click or Drag file to this area to upload</p>
      </Upload.Dragger>
    </>
  );
}

export default RequestFromOthersUploader;
