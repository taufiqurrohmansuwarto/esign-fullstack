import { createDiscussion } from "@/services/users.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Col, Form, Input, message, Row } from "antd";
import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function DiscussionCreate() {
  const router = useRouter();
  const [form] = Form.useForm();

  const { data: user } = useSession();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((data) => createDiscussion(data), {
    onSuccess: () => {
      message.success("Discussion created");
      queryClient.invalidateQueries(["discussions", router.query.id]);
      form.resetFields();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["discussions", router.query.id]);
    },
    onError: () => message.error("Failed to create discussion"),
  });

  const handleFinish = async () => {
    const values = await form.validateFields();

    mutate({
      documentId: router.query.id,
      data: {
        message: values.message,
      },
    });
  };

  return (
    <div>
      <Form form={form} onFinish={handleFinish}>
        <Row gutter={[16, 8]}>
          <Col>
            <Avatar src={user?.user?.image} size="large" />
          </Col>
          <Col span={21}>
            <Form.Item
              name="message"
              rules={[
                {
                  required: true,
                  message: "Please enter your message",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Write discussion about this document"
                rows={4}
              />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={isLoading}
                loading={isLoading}
                htmlType="submit"
                type="primary"
              >
                Post
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default DiscussionCreate;
