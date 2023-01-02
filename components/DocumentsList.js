import { Table } from "antd";

function DocumentsList({ type = "all" }) {
  const query = {
    page: 1,
    perPage: 10,
    search: "",
    sort: "createdAt",
    order: "desc",
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Upload Date",
      dataIndex: "uploadDate",
      key: "uploadDate",
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
      Berisi mengenai dokumen list dengan query dan searching
      <Table dataSource={[]} columns={columns} />
    </div>
  );
}

export default DocumentsList;
