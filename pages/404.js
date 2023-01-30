import { Result } from "antd";
import Link from "next/link";

const NotFound = () => {
  return (
    <Result
      status={404}
      title="Page Not Found"
      subTitle="Sorry the page you are looking for does not exist."
      extra={<Link href="/user/dashboard">Back to Home</Link>}
    />
  );
};

export default NotFound;
