import {
  DashboardOutlined,
  FileOutlined,
  LogoutOutlined,
  PlusOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons/lib/icons";
import {
  AutoComplete,
  Avatar,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  Modal,
  Row,
  Space,
  theme,
  Tooltip,
  Typography,
} from "antd";
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

const UploadModal = ({ open, onCancel }) => {
  const router = useRouter();

  const handleClick = (route) => {
    router.push(route);
    onCancel();
  };

  const listButton = [
    {
      id: "selfSign",
      title: "Self Sign",
      route: "/user/upload/self-sign/upload",
      helpText:
        "Sign document. You can store, download and send it through email, cloud storage, or other means.",
    },
    {
      id: "signAndRequest",
      title: "Sign and Request",
      route: "/user/upload/sign-and-request/upload",
      helpText:
        "Sign document and request others to sign it. You can store, download and send it through email, cloud storage, or other means.",
    },
    {
      id: "requestFromOthers",
      title: "Request from others",
      route: "/user/upload/request-from-others/upload",
      helpText:
        "Request others to sign document. You can store, download and send it through email, cloud storage, or other means.",
    },
  ];

  return (
    <Modal
      centered
      footer={null}
      title="Choose Document Workflow"
      open={open}
      onCancel={onCancel}
    >
      <Space>
        {listButton.map((item) => (
          <Tooltip key={item.id} title={item?.helpText} placement="bottom">
            <Button
              type="primary"
              onClick={() => {
                handleClick(item.route);
              }}
            >
              {item.title}
            </Button>
          </Tooltip>
        ))}
      </Space>
    </Modal>
  );
};

const drawItems = [
  {
    key: "1",
    label: "Keluar",
    danger: true,
    icon: <LogoutOutlined />,
  },
];

const items = [
  getItem("Dashboard", "/user/dashboard", <DashboardOutlined />),
  getItem("Documents", "/user/documents", <FileOutlined />, [
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
  const [open, setOpen] = useState(false);

  const handleCancel = () => setOpen(false);
  const showModal = () => setOpen(true);

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
        {!collapsed ? (
          <div style={{ padding: "18px" }}>
            <Button
              danger
              type="primary"
              onClick={showModal}
              icon={<UploadOutlined />}
              block
            >
              Upload
            </Button>
          </div>
        ) : (
          <Button
            style={{
              // middleware
              marginLeft: 20,
              marginTop: 10,
              marginBottom: 10,
            }}
            onClick={showModal}
            size="large"
            type="primary"
            icon={<PlusOutlined />}
          />
        )}
        <UploadModal open={open} onCancel={handleCancel} />
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
          <Row>
            <Col offset={16}>
              <AutoComplete
                style={{ width: 300 }}
                placeholder="Search Document"
              />
              <Dropdown menu={{ items: drawItems }} placement="bottom" arrow>
                <Space align="center">
                  <Typography.Text>IPUT TAUFIQURROHMAN SUWARTO</Typography.Text>
                  <Avatar />
                </Space>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "18px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
