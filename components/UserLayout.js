import {
  DashboardOutlined,
  FileOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons/lib/icons";
import { Avatar, Dropdown, Layout, Menu, Space, theme, Typography } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const drawItems = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Keluar
      </a>
    ),
    danger: true,
    icon: <LogoutOutlined />,
  },
];

const items = [
  getItem("Dashboard", "/user/dashboard", <DashboardOutlined />),
  getItem("Documents", "/user/documents/all", <FileOutlined />, [
    getItem("All Documents", "/user/documents/all"),
    getItem("Draft", "/user/documents/draft"),
    getItem("Pending", "/user/documents/pending"),
    getItem("Done", "/user/documents/done"),
    getItem("Expired", "/user/documents/expired"),
    getItem("Archived", "/user/documents/archived"),
    getItem("Rejected", "/user/documents/rejected"),
  ]),
  getItem("Settings", "/user/settings", <SettingOutlined />, [
    getItem("Activity Log", "/user/settings/activity-log"),
    getItem("Change Password", "/user/settings/change-password"),
    getItem("Digital Certificate", "/user/settings/digital-certificate"),
    getItem("Personal Information", "/user/settings/personal-information"),
    getItem("Signature", "/user/settings/signatures"),
  ]),
];

const UserLayout = ({ children, active = "/user/dashboard" }) => {
  const router = useRouter();
  const handleRouter = (item) => {
    router.push(item.key);
  };

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        defaultCollapsed={true}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={[active]}
          items={items}
          onClick={handleRouter}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Dropdown menu={{ items: drawItems }} placement="bottomCenter" arrow>
            <Space align="center">
              <Typography.Text>IPUT TAUFIQURROHMAN SUWARTO</Typography.Text>
              <Avatar />
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "18px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              minHeight: "calc(100vh - 144px)",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default UserLayout;
