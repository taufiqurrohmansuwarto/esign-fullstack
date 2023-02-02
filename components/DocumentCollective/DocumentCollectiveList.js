import {
  getDocumentCollectivesRequest,
  removeDocumentCollectiveRequest,
  updateDocumentCollectiveRequest,
} from "@/services/users.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Divider, message, Skeleton, Space, Table } from "antd";
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
    }
  );

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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => {
        return (
          <Space>
            <a>Delete</a>
            <Divider type="vertical" />
            <a>Update</a>
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
