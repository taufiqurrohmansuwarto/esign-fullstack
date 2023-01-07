import { listDocuments } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useState } from "react";

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
      render: (_, row) => {
        return <div>{row?.document?.filename}</div>;
      },
    },
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      render: (_, row) => <div>{row?.document?.upload_date}</div>,
    },
    {
      title: "Recipients",
      dataIndex: "recipients",
      key: "recipients",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "ation",
      key: "action",
    },
  ];

  return (
    <div>
      {JSON.stringify(data)}
      Berisi mengenai dokumen list dengan query dan searching
      <Table dataSource={data} columns={columns} />
    </div>
  );
}

export default DocumentsList;
