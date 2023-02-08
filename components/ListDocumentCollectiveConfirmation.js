import { listDocumentCollectivesConfirmation } from "@/services/document-collective.services";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React from "react";

function ListDocumentCollectiveConfirmation() {
  const { data, isLoading } = useQuery(
    ["document-collective-confirmation"],
    () => listDocumentCollectivesConfirmation()
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return <div>
		
	</div>;
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} loading={isLoading} />
    </div>
  );
}

export default ListDocumentCollectiveConfirmation;
