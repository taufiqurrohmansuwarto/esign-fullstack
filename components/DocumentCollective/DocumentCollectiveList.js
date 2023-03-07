import {
  getDocumentCollectivesRequest,
  removeDocumentCollectiveRequest,
  updateDocumentCollectiveRequest,
} from "@/services/users.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Divider,
  message,
  Popconfirm,
  Skeleton,
  Space,
  Table,
  Tooltip,
} from "antd";
import { useState } from "react";

function DocumentCollectiveList() {
  const [query, setQuery] = useState({});

  const queryClient = useQueryClient();

  const { mutate: remove, isLoading: iseLoadingRemove } = useMutation(
    (data) => removeDocumentCollectiveRequest(data),
    {
      onSuccess: () => {
        message.success("Document Collective has been removed");
        queryClient.invalidateQueries("document-collectives");
      },
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
    }
  );

  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(
    (data) => updateDocumentCollectiveRequest(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("document-collectives");
        message.success("Document Collective has been updated");
      },
      onError: (error) => {
        message.error(error?.response?.data?.message);
      },
    }
  );

  const { data, isLoading } = useQuery(
    ["document-collectives", query],
    () => getDocumentCollectivesRequest(query),
    {
      enabled: !!query,
      keepPreviousData: true,
    }
  );

  const handleRemove = (row) => {
    remove(row?.id);
  };

  const column = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Penerima",
      dataIndex: "penerima",
      render: (_, row) => {
        return (
          <Tooltip title={row?.to_requester_json?.nama}>
            <Avatar src={row?.to_requester_json?.fileDiri?.foto} />
          </Tooltip>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, row) => {
        return (
          <Space>
            <a>Update</a>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure want to remove this data?"
              onConfirm={() => handleRemove(row)}
            >
              <a>Delete</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Skeleton loading={isLoading}>
      <Table
        columns={column}
        loading={isLoading}
        dataSource={data?.data}
        rowKey={(row) => row?.id}
      />
    </Skeleton>
  );
}

export default DocumentCollectiveList;
