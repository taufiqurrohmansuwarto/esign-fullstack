import { useDebounce } from "ahooks";
import { AutoComplete, Input } from "antd";
import { useState } from "react";

function AutocompleteSearching() {
  const [input, setInput] = useState("");
  const debounceInput = useDebounce(input, 500);

  const handleSearch = (value) => {
    setInput(value);
  };

  const handleSelect = (value) => {
    console.log(value);
  };

  return (
    <AutoComplete
      onSearch={handleSearch}
      onSelect={handleSelect}
      style={{
        width: 500,
      }}
    >
      <Input.Search placeholder="Search Document" />
    </AutoComplete>
  );
}

export default AutocompleteSearching;
