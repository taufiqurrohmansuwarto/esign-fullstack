import { removeDocument, archieved } from "@/services/users.services";
import {
  DashOutlined,
  DeleteOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileSyncOutlined,
  FileZipOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Dropdown } from "antd";

function ActionButtonDocumentList({ data }) {
  let newItems = [];

  const querClient = useQueryClient();

  const { mutate: remove, isLoading: loadingRemove } = useMutation(
    (data) => removeDocument(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["documents"]);
      },
    }
  );

  const { mutate: archive, isLoading: loadingArchive } = useMutation(
    (data) => archieved(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["documents"]);
      },
    }
  );

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
  const documentArchived = data?.is_archived;
  const documentOngoing = data?.status === "ONGOING";

  if (documentDraft) {
    newItems = items.filter(
      (item) => item.key === "initial" || item.key === "delete"
    );
  }

  if (documentRejected || documentCompleted) {
    newItems = items.filter(
      (item) =>
        item.key === "initial" ||
        item.key === "sign" ||
        item.key === "history" ||
        item.key === "archived"
    );
  }

  if (documentOngoing) {
    newItems = items.filter(
      (item) =>
        item.key === "initial" ||
        item.key === "archived" ||
        item.key === "history"
    );
  }

  if (documentArchived) {
    newItems = items.filter(
      (item) =>
        item.key === "initial" || item.key === "history" || item.key === "sign"
    );
  }

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: newItems,
      }}
    >
      <Button icon={<DashOutlined />} />
    </Dropdown>
  );
}

export default ActionButtonDocumentList;
