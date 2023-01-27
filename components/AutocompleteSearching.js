import { searchingAutocomplete } from "@/services/users.services";
import { AutoComplete, Input, Spin } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

function AutocompleteSearching() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);

  const router = useRouter();

  const handleSearch = async (value) => {
    setLoading(true);
    setValue(value);
    const result = await searchingAutocomplete(value);
    setData(result);
    setLoading(false);
  };

  const handleSelect = (_, option) => {
    console.log(option?.value);
    setValue(option?.label);
    router.push(`/user/document/${option?.value}/view`);
  };

  return (
    <AutoComplete
      value={value}
      onChange={handleSearch}
      onSelect={handleSelect}
      options={data}
      notFoundContent={loading ? <Spin /> : null}
      style={{
        width: 500,
      }}
    >
      <Input.Search placeholder="Search Document by title" />
    </AutoComplete>
  );
}

export default AutocompleteSearching;
