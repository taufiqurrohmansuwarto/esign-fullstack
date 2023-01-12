import { takeFormat } from "@/lib/client-utils";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Upload } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ShowModalEdit = ({ onCancel, open, filename, file }) => {
  const router = useRouter();

  const onSuccess = () => {
    router.push("/self-sign");
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: takeFormat(filename),
    });
  }, [form, filename, file]);

  const handleFinisih = async () => {
    try {
      const result = await form.validateFields();
      const form = new FormData();
      form.append("file", file);
      form.append("title", result?.title);
      form.append("workflow", "selfSign");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Nama File"
      onOk={handleFinisih}
      centered
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
          rules={[{ required: true, message: "Nama file tidak boleh kosong" }]}
          name="title"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

function SelfSignUploader() {
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

export default SelfSignUploader;
