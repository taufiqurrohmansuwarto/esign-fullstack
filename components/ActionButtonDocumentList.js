import { removeDocument, archieved, getUrls } from "@/services/users.services";
import {
  DashOutlined,
  DeleteOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileSyncOutlined,
  FileZipOutlined,
} from "@ant-design/icons";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Button, Dropdown, message, Modal } from "antd";

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
    { key: "archived", label: "Archive Document", icon: <FileZipOutlined /> },
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
    try {
      switch (e.key) {
        case "initial":
          const initialDocument = await getUrls(data?.document_id);
          const { initial_document } = initialDocument;
          console.log(initial_document);
          window.open(initial_document, "_blank", "noopener noreferrer");
          break;
        case "delete":
          Modal.confirm({title : 'Confirmation', okButtonProps: {
            loading: loadingRemove,
          }, content : 'Are you sure want to delete this document?', onOk :() => remove(data?.document_id)})
          break;
        case "history":
          window.open(
            `/esign/api/user/documents/${data?.document_id}/history-document`,
            "_blank"
          );
          break;
        case "archived":
          // archive(data?.document_id);
          Modal.confirm({title : 'Confirmation', okButtonProps: {
            loading: loadingArchive,
          }, content : 'Are you sure want to archive this document?', onOk :() => archive(data?.document_id)})
          break;
        case "sign":
          const result = await getUrls(data?.document_id);
          const { signed_document } = result;
          window.open(signed_document, "_blank", "noopener noreferrer");
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: newItems,
        onClick: handleClick,
      }}
    >
      <Button icon={<DashOutlined />} />
    </Dropdown>
  );
}

export default ActionButtonDocumentList;
