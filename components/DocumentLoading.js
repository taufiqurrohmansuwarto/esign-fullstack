import { Card, Row, Skeleton, Space } from "antd";
import React from "react";

function DocumentLoading() {
  return (
    <Row justify="center" align="middle" style={{ padding: 18 }}>
      <Card style={{ width: 600, height: 800 }}>
        <Skeleton avatar={{ size: 100 }} active />
        <Skeleton paragraph active />
        <Skeleton paragraph active />
        <Row justify="center" align="middle">
          <Space size="large">
            <Skeleton.Image size="large" active />
            <Skeleton.Image size="large" active />
            <Skeleton.Image size="large" active />
          </Space>
        </Row>
        <Skeleton paragraph active />
        <Skeleton paragraph active />
      </Card>
    </Row>
  );
}

export default DocumentLoading;
