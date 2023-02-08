import {
  acceptDocumentCollective,
  documentsCollectiveSign,
  rejectDocumentCollective,
} from "@/services/document-collective.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Table,
  Typography,
} from "antd";
import { useState } from "react";
import { useRouter } from "next/router";

const ConfirmModal = ({ row, open, onCancel }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: confirm, isLoading: isLoadingConfirm } = useMutation(
    (data) => acceptDocumentCollective(data),
    {
      onSuccess: () => {
        message.success("Request accepted");
        queryClient.initialValues("document-collective");
        onCancel();
        router.push("/user/document-collective/signs");
      },
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
    }
  );

  const [form] = Form.useForm();

  const handleFinish = async () => {
    const value = await form.validateFields();
    console.log(value);
  };

  return (
    <Modal
      onOk={handleFinish}
      confirmLoading={isLoadingConfirm}
      title="Accept Request"
      open={open}
      onCancel={onCancel}
    >
      <Typography.Paragraph>
        Are you sure you want to accept this request?
      </Typography.Paragraph>
      <Form
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
  const { mutate: reject, isLoading: isLoadingReject } = useMutation(
    (data) => rejectDocumentCollective(data),
    {
      onError: (err) => {
        message.error(err?.response?.data?.message);
      },
      onSuccess: () => {
        message.success("Request rejected");
        queryClient.invalidateQueries("document-collective");
        onCancel();
      },
    }
  );

  const [form] = Form.useForm();

  const handleFinish = async () => {
    const value = await form.validateFields();
    console.log(value);
  };

  return (
    <Modal
      onOk={handleFinish}
      title="Reject Request"
      open={open}
      onCancel={onCancel}
    >
      <Form
        initialValues={{
          reason: "I REJECT THIS REQUEST",
        }}
        form={form}
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
  // this should be query
  const { data, isLoading, isFetching } = useQuery(
    ["document-collective"],
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
