import { BellOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import PageContainer from "./pro/PageContainer";

function TabNotification({ children, tabActiveKey = "list" }) {
  const router = useRouter();

  const handleTabChange = (key) => {
    router.push(`/user/notifications/${key}`);
  };

  return (
    <PageContainer
      onTabChange={handleTabChange}
      tabActiveKey={tabActiveKey}
      tabList={[
        {
          tab: "Document Notification",
          key: "list",
          label: (
            <span>
              <BellOutlined /> Document Notification
            </span>
          ),
        },
        {
          tab: "Read Notification",
          key: "read",
          label: (
            <span>
              <EyeOutlined /> Read Notification
            </span>
          ),
        },
      ]}
    >
      {children}
    </PageContainer>
  );
}

export default TabNotification;
