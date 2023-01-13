import { formatDate, upperCase } from "@/lib/client-utils";
import { listDocuments } from "@/services/users.services";
import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Col, Button, Popover, Row, Table, Avatar, Input } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

// create render title component and when it clicks it will going to id

const Title = ({ row }) => {
  const router = useRouter();
  const goToLink = () => {
    router.push(`/user/document/${row?.document_id}/view`);
  };

  return (
    <Row
      onClick={goToLink}
      gutter={[16, 8]}
      style={{
        cursor: "pointer",
      }}
    >
      <Col>
        <Avatar src="https://app.privy.id/img/avatar/avatar.png" />
      </Col>
      <Col>
        <Row>{row?.document?.filename}</Row>
      </Col>
    </Row>
  );
};

const Recipients = ({ row }) => {
  return (
    <Popover
      style={{ width: 700 }}
      title="Recipient"
      trigger="click"
      content={<div>hello world</div>}
    >
      <Button size="middle" type="primary" icon={<UserOutlined />}>
        {row?.document?.Recipient?.length}
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

  const handleChangeSearch = (e) => {
    if (e) {
      setQuery({ ...query, search: e });
    } else {
      // remove search query
      const { search, ...rest } = query;
      setQuery(rest);
    }
  };

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
      title: "Status",
      key: "status",
      render: (_, row) => <div>{upperCase(row?.document?.status)}</div>,
    },
    {
      title: "Action",
      dataIndex: "ation",
      key: "action",
    },
  ];

  return (
    <Table
      title={() => (
        <Input.Search
          placeholder="Find by title"
          onSearch={handleChangeSearch}
          style={{ width: "20%" }}
        />
      )}
      loading={isLoading}
      dataSource={data}
      columns={columns}
    />
  );
}

export default DocumentsList;
