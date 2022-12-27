import { Typography } from "antd";
import UserLayout from "../../components/UserLayout";

function index() {
  return (
    <UserLayout>
      <div>
        <Typography.Title level={2}>Users</Typography.Title>
      </div>
    </UserLayout>
  );
}

export default index;
