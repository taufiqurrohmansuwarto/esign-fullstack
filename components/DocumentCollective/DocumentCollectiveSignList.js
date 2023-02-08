import { documentsCollectiveSign } from "@/services/document-collective.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Divider, Form, Input, Modal, Table, Typography } from "antd";
import { useState } from "react";

const ConfirmModal = ({ row, open, onCancel }) => {
  const queryClient = useQueryClient();
  const { mutate: confirm, isLoading: isLoadingConfirm } = useMutation();

  const [form] = Form.useForm();

  const handleFinish = async () => {
    const value = await form.validateFields();
  };

  return (
    <Modal title="Accept Request" open={open} onCancel={onCancel}>
      <Typography.Paragraph>
        Are you sure you want to accept this request?
      </Typography.Paragraph>
      <Form
        onFinish={handleFinish}
        form={form}
        initialValues={{
          reason: "I ACCEPT THIS REQUEST",
        }}
      >
        <Form.Item name="reason" label="Reason">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const RejectModal = ({ row, open, onCancel }) => {
  const queryClient = useQueryClient();
  const { mutate: reject, isLoading: isLoadingReject } = useMutation();

  const [form] = Form.useForm();

  const handleFinish = async () => {
    const value = await form.validateFields();
  };

  return (
    <Modal title="Reject Request" open={open} onCancel={onCancel}>
      <Form
        initialValues={{
          reason: "I REJECT THIS REQUEST",
        }}
        form={form}
        onFinish={handleFinish}
      >
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
      <Button danger onClick={handleOpenRej}>
        Reject
      </Button>
    </>
  );
};

const Action = ({ row }) => {
  if (row?.status === "PENDING") {
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
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
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
