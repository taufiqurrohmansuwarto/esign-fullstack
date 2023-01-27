import {
  DashOutlined,
  DeleteOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileSyncOutlined,
  FileZipOutlined,
} from "@ant-design/icons";
import { Button, Dropdown } from "antd";

function ActionButtonDocumentList({ data }) {
  const items = [
    { key: "initial", label: "Initial Document", icon: <FileOutlined /> },
    {
      key: "delete",
      label: "Delete Document",
      icon: <DeleteOutlined />,
    },
    { key: "history", label: "History Document", icon: <FileSyncOutlined /> },
    { key: "archived", label: "Archived Document", icon: <FileZipOutlined /> },
    { key: "sign", label: "Sign Document", icon: <FileDoneOutlined /> },
  ];

  const documentDraft = data?.status === "DRAFT";
  const documentRejected = data?.status === "REJECTED";
  const documentCompleted = data?.status === "COMPLETED";
  const documentOngoing = data?.status === "ONGOING";

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items,
      }}
    >
      <Button icon={<DashOutlined />} />
    </Dropdown>
  );
}

export default ActionButtonDocumentList;
