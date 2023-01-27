import {
  DashboardOutlined,
  EditOutlined,
  FileOutlined,
  LogoutOutlined,
  SettingOutlined,
  UploadOutlined,
} from "@ant-design/icons/lib/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Modal,
  Space,
  theme,
  Tooltip,
  Typography,
} from "antd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import AutocompleteSearching from "./AutocompleteSearching";
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
      disabled: false,
    },
    {
      id: "signAndRequest",
      title: "Sign and Request",
      route: "/user/upload/sign-and-request/upload",
      helpText:
        "Sign document and request others to sign it. You can store, download and send it through email, cloud storage, or other means.",
      disabled: true,
    },
    {
      id: "requestFromOthers",
      title: "Request from others",
      route: "/user/upload/request-from-others/upload",
      helpText:
        "Request others to sign document. You can store, download and send it through email, cloud storage, or other means.",
      disabled: false,
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
      <Typography.Text>
        You can upload a document to sign, sign and request others to sign, or
        request others to sign a document. Please choose the workflow that you
        want to use.
      </Typography.Text>
      <Space style={{ marginTop: 10 }}>
        {listButton.map((item) => (
          <Tooltip key={item.id} title={item?.helpText} placement="bottom">
            <Button
              type="primary"
              onClick={() => {
                handleClick(item.route);
              }}
              disabled={item.disabled}
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
    label: "Logout",
    icon: <LogoutOutlined />,
  },
];

const items = [
  getItem("Dashboard", "/user/dashboard", <DashboardOutlined />),
  getItem("Documents", "/user/documents", <FileOutlined />, [
    getItem("All Document", "/user/documents/all"),
    getItem("Draft", "/user/documents/draft"),
    getItem("Pending", "/user/documents/pending"),
    getItem("Done", "/user/documents/done"),
    // getItem("Expired", "/user/documents/expired"),
    getItem("Archived", "/user/documents/archived"),
    getItem("Rejected", "/user/documents/rejected"),
  ]),
  getItem("Settings", "/user/settings", <SettingOutlined />, [
    getItem("Activity Log", "/user/settings/activity-log"),
    // getItem("Change Password", "/user/settings/change-password"),
    getItem("Digital Certificate", "/user/settings/digital-certificate"),
    getItem("Personal Information", "/user/settings/personal-information"),
    getItem("Signature", "/user/settings/signatures"),
    getItem("Frequently Asked Question", "/user/settings/faq"),
  ]),
];

const UserLayout = ({ children, active = "/user/dashboard" }) => {
  const router = useRouter();
  const handleRouter = (item) => {
    router.push(item.key);
  };

  const { data: session, status } = useSession();

  const dropdownClick = ({ key }) => {
    if (key === "1") {
      signOut();
    }
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
          <Tooltip title="Upload document" placement="right">
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
              icon={<EditOutlined />}
            />
          </Tooltip>
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
            display: "flex",
            justifyContent: "flex-end",
            background: colorBgContainer,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <AutocompleteSearching />
            <Dropdown menu={{ items: drawItems, onClick: dropdownClick }}>
              <Space
                style={{
                  marginLeft: 16,
                }}
              >
                <Typography.Text>{session?.user?.name}</Typography.Text>
                <Avatar src={session?.user?.image} />
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
