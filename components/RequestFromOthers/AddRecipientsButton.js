import { findRecipients } from "@/services/users.services";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "ahooks";
import { Button, Select, Space } from "antd";
import { useState } from "react";

function AddRecipientsButton() {
  const [search, setSearch] = useState(null);

  const debounceValue = useDebounce(search, { wait: 500 });

  const { data, isLoading } = useQuery(
    ["recipients", debounceValue],
    () => findRecipients(search),
    {
      enabled: !!debounceValue,
    }
  );

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <Space>
      <Select
        loading={isLoading}
        style={{ width: 200 }}
        showSearch
        value={search}
        onSearch={handleSearch}
      />
      <Button icon={<PlusOutlined />} type="primary">
        Add Recipient
      </Button>
      {JSON.stringify(data)}
    </Space>
  );
}

export default AddRecipientsButton;
