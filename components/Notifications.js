import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useRouter } from "next/router";

function Notifications() {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/user/notifications/list`);
  };

  return (
    <div onClick={handleClick} style={{ marginLeft: 16, cursor: "pointer" }}>
      <Badge count={10} size="small">
        <BellOutlined size={30} />
      </Badge>
    </div>
  );
}

export default Notifications;
