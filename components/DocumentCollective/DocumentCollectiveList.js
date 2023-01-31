import { getDocumentCollectivesRequest } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, Table } from "antd";
import { useState } from "react";

function DocumentCollectiveList() {
  const [query, setQuery] = useState({});

  const { data, isLoading } = useQuery(
    ["document-collectives", query],
    () => getDocumentCollectivesRequest(query),
    {
      enabled: !!query,
      refetchOnWindowFocus: false,
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
      title: "Action",
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
