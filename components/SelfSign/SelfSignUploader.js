import { selfSignUpload } from "@/services/users.services";
import { InboxOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Upload, Button } from "antd";
import React from "react";

function SelfSignUploader() {
  const { mutate, isLoading } = useMutation((data) => selfSignUpload(data), {});
  const [filename, setFilename] = React.useState("");

  const [file, setFile] = React.useState(null);

  const handleChangefilename = (currentFilename) =>
    setFilename(currentFilename);

  const props = {
    name: "file",
    multiple: false,
  };

  return (
    <Upload.Dragger accept=".pdf" {...props}>
      <p>
        <InboxOutlined />
      </p>
      <p>Click or Drag file to this area to upload</p>
    </Upload.Dragger>
  );
}

export default SelfSignUploader;
