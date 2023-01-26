import {
  debounceValue,
  documentStatus,
  formatDate,
  upperCase,
} from "@/lib/client-utils";
import { listDocuments } from "@/services/users.services";
import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Col,
  Button,
  Popover,
  Row,
  Table,
  Avatar,
  Input,
  Tooltip,
  Tag,
} from "antd";
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
    <Avatar.Group>
      {row?.document?.Recipient?.map((recipient) => (
        <div key={recipient?.id}>
          <Tooltip title={recipient?.recipient_json?.nama}>
            <Avatar src={recipient?.recipient_json?.fileDiri?.foto} />
          </Tooltip>
        </div>
      ))}
    </Avatar.Group>
  );
};

function DocumentsList({ type = "all" }) {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    type,
  });

  const handleChangeSearch = async (e) => {
    const value = e?.target?.value;

    if (value) {
      setQuery({ ...query, search: value });
    } else {
      // remove search query
      const { search, ...rest } = query;
      setQuery(rest);
    }
  };

  const { data, isLoading } = useQuery(
    ["documents", type, query],
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
      render: (_, row) => (
        <Tag color={documentStatus(row)?.color}>
          {documentStatus(row)?.kata}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "ation",
      key: "action",
    },
  ];

  return (
    <>
      <Table
        title={() => (
          <Input.Search
            placeholder="Find by title"
            loading={isLoading}
            onChange={handleChangeSearch}
            style={{ width: "20%" }}
          />
        )}
        pagination={{
          current: query.page,
          pageSize: query.limit,
          total: data?.total,
          onChange: (page, limit) => setQuery({ ...query, page, limit }),
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        rowKey={(row) => row?.id}
        loading={isLoading}
        dataSource={data?.results}
        columns={columns}
      />
    </>
  );
}

export default DocumentsList;
