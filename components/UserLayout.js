import {
  DashboardOutlined,
  FileOutlined,
  SettingOutlined,
} from "@ant-design/icons/lib/icons";
import { Avatar, Layout, Menu, Space, theme, Typography } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "/user/dashboard", <DashboardOutlined />),
  getItem("Dokumen", "/user/dokumen", <FileOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Konfigurasi", "settings", <SettingOutlined />),
];

const UserLayout = ({ children }) => {
  const router = useRouter();
  const handleRouter = (item) => {
    router.push(item.key);
  };

  const [collapsed, setCollapsed] = useState(false);
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
          defaultSelectedKeys={["1"]}
          mode="inline"
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
          <Space align="center">
            <Typography.Text>Iput Taufiqurrohman Suwarto</Typography.Text>
            <Avatar size="large" />
          </Space>
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
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default UserLayout;
