import { removeDocument, archieved } from "@/services/users.services";
import {
  DashOutlined,
  DeleteOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileSyncOutlined,
  FileZipOutlined,
} from "@ant-design/icons";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Button, Dropdown, message } from "antd";

function ActionButtonDocumentList({ data }) {
  let newItems = [];

  const queryClient = useQueryClient();

  const { mutate: remove, isLoading: loadingRemove } = useMutation(
    (data) => removeDocument(data),
    {
      onSuccess: () => {
        message.success("Document has been deleted");
        queryClient.invalidateQueries(["documents"]);
      },
      onError: (e) => {
        message.error(e?.response?.data?.message);
      },
    }
  );

  const { mutate: archive, isLoading: loadingArchive } = useMutation(
    (data) => archieved(data),
    {
      onSuccess: () => {
        message.success("Document has been archived");
        queryClient.invalidateQueries(["documents"]);
      },
      onError: (e) => {
        message.error(e?.response?.data?.message);
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

  const handleClick = async (e) => {
    switch (e.key) {
      case "initial":
        console.log("initial");
        break;
      case "delete":
        remove(data?.document_id);
        break;
      case "history":
        // window.location.href = `/esign/api/user/documents/${data?.document_id}/history-document`;
        // new tab
        window.open(
          `/esign/api/user/documents/${data?.document_id}/history-document`,
          "_blank"
        );
        break;
      case "archived":
        archive(data?.document_id);
        break;
      case "sign":
        console.log("sign");
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: newItems,
        onClick: handleClick,
        selectable: true,
      }}
    >
      <Button icon={<DashOutlined />} />
    </Dropdown>
  );
}

export default ActionButtonDocumentList;
