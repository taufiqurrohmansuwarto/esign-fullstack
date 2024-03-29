import { recipientPosition, roleType } from "@/lib/client-utils";
import {
  requestFromOthersApproveReview,
  requestFromOthersApproveSign,
  requestFromOthersRejectReview,
  requestFromOthersRejectSign,
} from "@/services/users.services";
import { CloseCircleOutlined, VerifiedOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FloatButton, Form, Input, message, Modal, Typography } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const ModalConfirm = ({ handleCancel, open, role, description }) => {
  return (
    <Modal title="Document Information" open={open} onCancel={handleCancel}>
      <div>{description?.text}</div>
    </Modal>
  );
};

const ModalAcceptSign = ({ open, handleCancel, id }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { mutate, isLoading } = useMutation(
    (data) => requestFromOthersApproveSign(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["document-detail", id]);
        message.success("Document has been signed");
        handleCancel();
        form.resetFields();
        router.push(`/user/documents/all`);
      },
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
      onSettled: () => queryClient.invalidateQueries(["document-detail", id]),
    }
  );

  const handeOk = async () => {
    const result = await form.validateFields();
    const data = {
      documentId: id,
      data: {
        passphrase: result?.passphrase,
      },
    };
    mutate(data);
  };

  return (
    <Modal
      onOk={handeOk}
      title="Accept Sign"
      confirmLoading={isLoading}
      open={open}
      onCancel={handleCancel}
    >
      <Typography.Text>
        Are you sure want to accept this document?
      </Typography.Text>
      <Form form={form}>
        <Form.Item
          name="passphrase"
          rules={[{ required: true, message: "Passphrase cant be empty" }]}
          help='Enter your passphrase to "Accept Sign"'
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalRejectSign = ({ open, handleCancel, id }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { mutate, isLoading } = useMutation(
    (data) => requestFromOthersRejectSign(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["document-detail", id]);
        message.success("Document has been rejected");
        handleCancel();
        form.resetFields();
      },
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
    }
  );

  const handleOk = async () => {
    const result = await form.validateFields();
    const data = {
      documentId: id,
      data: {
        reason: result?.reason,
      },
    };
    mutate(data);
  };

  return (
    <Modal
      confirmLoading={isLoading}
      onOk={handleOk}
      title="Reject Sign"
      open={open}
      onCancel={handleCancel}
    >
      <Typography.Text>
        Are you sure want to reject this document?
      </Typography.Text>
      <Form
        form={form}
        initialValues={{
          reason: "Document is not valid",
        }}
      >
        <Form.Item
          name="reason"
          rules={[{ required: true, message: "Passphrase cant be empty" }]}
          help='Reason for "Reject Sign"'
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Signer = ({ id }) => {
  const [openAcc, setOpenAcc] = useState(false);
  const [openRej, setOpenRej] = useState(false);

  const handleOpenAcc = () => setOpenAcc(true);
  const handleOpenRej = () => setOpenRej(true);

  const handleCancelAcc = () => setOpenAcc(false);
  const handleCancelRej = () => setOpenRej(false);

  return (
    <>
      <ModalAcceptSign id={id} open={openAcc} handleCancel={handleCancelAcc} />
      <ModalRejectSign id={id} open={openRej} handleCancel={handleCancelRej} />
      <FloatButton
        tooltip={<div>Accept Sign</div>}
        icon={<VerifiedOutlined />}
        onClick={handleOpenAcc}
      />
      <FloatButton
        tooltip={<div>Reject Sign</div>}
        icon={<CloseCircleOutlined />}
        onClick={handleOpenRej}
      />
    </>
  );
};

const ModalAcceptReviewer = ({ open, handleCancel, id }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (data) => requestFromOthersApproveReview(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["document-detail", id]);
        message.success("Document has been accepted");
        handleCancel();
      },
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
    }
  );

  const handleOk = () => {
    mutate(id);
  };

  return (
    <Modal
      confirmLoading={isLoading}
      onOk={handleOk}
      title="Are you sure you want accept your review?"
      open={open}
      onCancel={handleCancel}
    ></Modal>
  );
};

const ModalRejectReviewer = ({ open, handleCancel, id }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (data) => requestFromOthersRejectReview(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["document-detail", id]);
        message.success("Document has been rejected");
        handleCancel();
      },
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
    }
  );

  const handleOk = () => {
    mutate(id);
  };

  return (
    <Modal
      onOk={handleOk}
      confirmLoading={isLoading}
      title="Are you sure you want reject you review?"
      open={open}
      onCancel={handleCancel}
    ></Modal>
  );
};

const Reviewer = ({ id }) => {
  const [openAcc, setOpenAcc] = useState(false);
  const [openRej, setOpenRej] = useState(false);

  const handleOpenAcc = () => setOpenAcc(true);
  const handleOpenRej = () => setOpenRej(true);

  const handleCancelAcc = () => setOpenAcc(false);
  const handleCancelRej = () => setOpenRej(false);

  return (
    <>
      <ModalAcceptReviewer
        open={openAcc}
        handleCancel={handleCancelAcc}
        id={id}
      />
      <ModalRejectReviewer
        open={openRej}
        handleCancel={handleCancelRej}
        id={id}
      />
      <FloatButton
        onClick={handleOpenAcc}
        tooltip={<div>Accept Review</div>}
        icon={<VerifiedOutlined />}
      />
      <FloatButton
        onClick={handleOpenRej}
        tooltip={<div>Reject Review</div>}
        icon={<CloseCircleOutlined />}
      />
    </>
  );
};

const RecipientFloatingButton = ({ data }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const role = roleType(data, session?.user?.id);
  const description = recipientPosition(data, session?.user?.id);

  const signer = description?.isMyJob && role === "SIGNER";
  const reviewer = description?.isMyJob && role === "REVIEWER";
  const information = !description?.isMyJob;

  const handleOpen = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  return (
    <>
      <ModalConfirm
        role={role}
        open={open}
        handleCancel={handleCancel}
        description={description}
      />
      <FloatButton.Group shape="square" style={{ right: 90 }}>
        {information && (
          <FloatButton tooltip={<div>Verify</div>} onClick={handleOpen} />
        )}
        {signer && <Signer id={data?.id} />}
        {reviewer && <Reviewer id={data?.id} />}
      </FloatButton.Group>
    </>
  );
};

export default RecipientFloatingButton;
