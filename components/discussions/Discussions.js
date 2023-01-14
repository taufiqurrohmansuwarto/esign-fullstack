import { fromNowDate } from "@/lib/client-utils";
import { discussions, removeDiscussion } from "@/services/users.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Col,
  Divider,
  List,
  message,
  Popconfirm,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import DiscussionCreate from "./DiscussionCreate";

const HapusButton = ({ userId, currentUser, onRemove }) => {
  if (userId === currentUser?.user?.id) {
    return (
      <Popconfirm
        onConfirm={onRemove}
        title="Are you sure want to delete this comment?"
      >
        <a>Delete</a>
      </Popconfirm>
    );
  }

  return null;
};

const Discussion = ({ item, documentId, user }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation((data) => removeDiscussion(data), {
    onSuccess: () => {
      message.success("Discussion deleted");
      queryClient.invalidateQueries(["discussions", documentId]);
    },
    onError: () => message.error("Failed to delete discussion"),
    onSettled: () => queryClient.invalidateQueries(["discussions", documentId]),
  });

  const handleRemove = () => {
    const currentData = {
      documentId,
      discussionId: item.id,
    };
    mutate(currentData);
  };

  return (
    <List.Item
      actions={[
        <HapusButton
          key="hapus"
          onRemove={handleRemove}
          userId={item?.user?.id}
          currentUser={user}
        />,
      ]}
    >
      <Row gutter={[12, 8]}>
        <Col>
          <Avatar size={32} src={item?.user?.user_info?.fileDiri?.foto} />
        </Col>
        <Col>
          <Row>
            <Space>
              <Typography.Text strong>
                {item?.user?.user_info?.nama}
              </Typography.Text>
              &#x2022;
              <Typography.Text disabled>
                {fromNowDate(item?.created_at)}
              </Typography.Text>
            </Space>
          </Row>
          <Row>
            <Typography.Text type="secondary">{item?.message}</Typography.Text>
          </Row>
        </Col>
      </Row>
    </List.Item>
  );
};

const DisccussionList = () => {
  const router = useRouter();
  const documentId = router?.query?.id;

  const { data: user, status } = useSession();

  const { data, isLoading } = useQuery(
    ["discussions", documentId],
    () => discussions(documentId),
    {
      enabled: !!documentId,
    }
  );

  return (
    <Skeleton loading={isLoading || status === "loading"}>
      <DiscussionCreate />
      <Divider />
      <List
        dataSource={data}
        rowKey={(row) => row?.id}
        renderItem={(item) => (
          <Discussion item={item} documentId={documentId} user={user} />
        )}
      />
    </Skeleton>
  );
};

export default DisccussionList;
