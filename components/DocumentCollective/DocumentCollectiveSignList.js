import { documentsCollectiveSign } from "@/services/document-collective.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Divider, Form, Input, Modal, Table } from "antd";
import { useState } from "react";

const ConfirmModal = ({ row, open, onCancel }) => {
  const queryClient = useQueryClient();
  const { mutate: confirm, isLoading: isLoadingConfirm } = useMutation();

  const [form] = Form.useForm();

  const handleConfirm = async () => {
    const value = await form.validateFields();
  };

  return (
    <Modal open={open} onCancel={onCancel}>
      <Form form={form}>
        <Form.Item name="reason" label="Reason">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const RejectModal = ({ row, open, onCancel }) => {
  const queryClient = useQueryClient();
  const { muate: reject, isLoading: isLoadingReject } = useMutation();

  const [form] = Form.useForm();

  const handleReject = async () => {
    const value = await form.validateFields();
  };

  return (
    <Modal open={open} onCancel={onCancel}>
      <Form form={form}>
        <Form.Item name="reason" label="Reason">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ConfirmButton = ({ row }) => {
  const [openAcc, setOpenAcc] = useState(false);
  const handleOpenAcc = () => setOpenAcc(true);
  const handleCloseAcc = () => setOpenAcc(false);

  const [openRej, setOpenRej] = useState(false);
  const handleOpenRej = () => setOpenRej(true);
  const handleCloseRej = () => setOpenRej(false);

  return (
    <>
      <ConfirmModal open={openAcc} onCancel={handleCloseAcc} />
      <RejectModal />
      <Button type="primary" onClick={handleOpenAcc}>
        Accept
      </Button>
      <RejectModal open={openRej} onCancel={handleCloseRej} />
      <Divider type="vertical" />
      <Button onClick={handleOpenRej}>Reject</Button>
    </>
  );
};

const Action = ({ row }) => {
  if (row?.status === "pending") {
    return (
      <>
        <ConfirmButton row={row} />
      </>
    );
  } else {
    return null;
  }
};

function DocumentCollectiveSignList() {
  const { data, isLoading, isFetching } = useQuery(
    ["documents-collectives-sign"],
    () => documentsCollectiveSign(),
    {
      enabled: true,
      keepPreviousData: true,
    }
  );

  const columns = [
    { title: "Document", key: "title", dataIndex: "title" },
    {
      title: "Action",
      key: "action",
      render: (_, row) => <Action row={row} />,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading || isFetching}
      rowKey={(row) => row?.id}
    />
  );
}

export default DocumentCollectiveSignList;
