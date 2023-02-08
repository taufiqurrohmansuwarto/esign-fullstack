import { Result, Row } from "antd";
import Link from "next/link";

const NotFound = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Result
        status={404}
        title="Page Not Found"
        subTitle="Sorry the page you are looking for does not exist."
        extra={<Link href="/user/dashboard">Back to Home</Link>}
      />
    </Row>
  );
};

export default NotFound;
