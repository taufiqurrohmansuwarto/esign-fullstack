import { Row, Col } from "antd";
import React from "react";

function Container({ children }) {
  return (
    <Row
      justify="center"
      style={{
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        paddingTop: 32,
        paddingBottom: 32,
        minHeight: "70vh",
      }}
    >
      <Col xs={24} sm={24} md={24} xl={20} xxl={20}>
        {children}
      </Col>
    </Row>
  );
}

export default Container;
