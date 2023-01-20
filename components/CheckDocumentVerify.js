import { infoSigner } from "@/lib/client-utils";
import { Button, Layout, message, Result, Upload } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { verifyDocumentUser } from "@/services/public.services";
import Container from "./Container";
import PageContainer from "./pro/PageContainer";

const HasilPengecekan = ({ data }) => {
  if (!data) return null;

  if (data?.jumlah_signature === 0 || data?.summary === null) {
    return (
      <>
        <Result
          status="error"
          title="Dokumen tidak valid!"
          subTitle={data?.nama_dokumen}
        />
      </>
    );
  }

  return (
    <>
      <Result
        subTitle={`Dokumen dengan nama ${
          infoSigner(data)?.nama_dokumen
        } telah ditanda tangani oleh ${
          infoSigner(data)?.signer_name
        } sebanyak ${infoSigner(data)?.jumlah_signature} kali`}
        status="success"
        title="Dokumen Valid!"
        // extra={[<Button type="primary">Lihat Dokumen</Button>]}
      />
    </>
  );
};

function CheckDocumentVerify() {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [fileInformation, setFileInformation] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    const [file] = fileList;

    formData.append("document", file);

    setUploading(true);

    try {
      const result = await verifyDocumentUser(formData);
      setFileInformation(result);
      message.success("Pengecekan TTE berhasil");
      setFileList([]);
      setUploading(false);
    } catch (err) {
      console.log(err);
      message.error("Unggah file gagal");
      setUploading(false);
    }
  };

  // upload document
  const uploadProps = {
    name: "file",
    maxCount: 1,
    showUploadList: {
      showRemoveIcon: false,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
    // only pdf file and max size 10MB
    beforeUpload(file) {
      const isPdf = file.type === "application/pdf";
      if (!isPdf) {
        message.error("You can only upload PDF file!");
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("File must smaller than 10MB!");
      }

      return isPdf && isLt10M;
    },
    beforeUpload: (file) => {
      // only 1 file
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const router = useRouter();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <PageContainer title="Document Checker" onBack={() => router.push("/")}>
        <Upload accept=".pdf" {...uploadProps}>
          <Button>Upload</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? "Loading..." : "Start Check"}
        </Button>
        {fileInformation && <HasilPengecekan data={fileInformation} />}
      </PageContainer>
    </Layout>
  );
}

export default CheckDocumentVerify;
