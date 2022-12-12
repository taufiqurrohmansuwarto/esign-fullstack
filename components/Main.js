import { Button, Form, Input, Space } from "antd";
import React from "react";
import useStore from "../store/store";

function Main() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);
  const reset = useStore((state) => state.reset);

  return (
    <div>
      {count}
      <Space>
        <Button type="primary" onClick={increment}>
          increment
        </Button>
        <Button type="primary" onClick={decrement}>
          decrement
        </Button>
        <Button danger onClick={reset}>
          reset
        </Button>
      </Space>
    </div>
  );
}

export default Main;
