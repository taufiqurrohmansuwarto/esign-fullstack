import { formatDate } from "@/lib/client-utils";
import { listDocuments } from "@/services/users.services";
import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Popover, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

// create render title component and when it clicks it will going to id

const Title = ({ row }) => {
  const router = useRouter();
  const goToLink = () => {
    router.push(`/user/document/${row?.document_id}/view`);
  };

  return <div onClick={goToLink}>{row?.document?.filename}</div>;
};

const Recipients = ({ row }) => {
  return (
    <Popover
      style={{ width: 700 }}
      title="Recipient"
      trigger="click"
      content={<div>hello world</div>}
    >
      <Button
        shape="round"
        size="middle"
        type="primary"
        icon={<UserOutlined />}
      >
        {row?.document?.Recipient?.length} Recipient
      </Button>
    </Popover>
  );
};

function DocumentsList({ type = "all" }) {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    type,
  });

  const { data, isLoading } = useQuery(
    ["documents", query],
    () => listDocuments(query),
    {
      enabled: !!query,
    }
  );

  const columns = [
    {
      title: "Title",
      key: "title",
      render: (_, row) => <Title row={row} />,
    },
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      render: (_, row) => <div>{formatDate(row?.document?.upload_date)}</div>,
    },
    {
      title: "Recipients",
      key: "recipients",
      render: (_, row) => <Recipients row={row} />,
    },
    {
      title: "Action",
      dataIndex: "ation",
      key: "action",
    },
  ];

  return <Table dataSource={data} columns={columns} />;
}

export default DocumentsList;
