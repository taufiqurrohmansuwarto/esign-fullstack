import {
  BookOutlined,
  DashboardOutlined,
  FilePdfOutlined,
  FormOutlined,
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
import Notifications from "./Notifications";
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
      title: "Request From Others",
      route: "/user/upload/request-from-others/upload",
      helpText:
        "Request others to sign/review your document. You can store, download and send it through email, cloud storage, or other means.",
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
        Please choose the workflow that you want to use.
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
  getItem("Documents", "/user/documents", <FilePdfOutlined />, [
    getItem("All Document", "/user/documents/all"),
    getItem("Draft", "/user/documents/draft"),
    getItem("Pending", "/user/documents/pending"),
    getItem("Done", "/user/documents/done"),
    // getItem("Expired", "/user/documents/expired"),
    getItem("Archived", "/user/documents/archived"),
    getItem("Rejected", "/user/documents/rejected"),
  ]),
  getItem("Settings", "/user/settings", <SettingOutlined />, [
    getItem("Activities", "/user/settings/activity-log"),
    getItem("Change Password", "/user/settings/change-password"),
    getItem("Digital Certificate", "/user/settings/digital-certificate"),
    getItem("Personal Information", "/user/settings/personal-information"),
    getItem("Signature", "/user/settings/signatures"),
    getItem("Frequently Asked Question", "/user/settings/faq"),
  ]),
];

const documentsCollectives = getItem(
  "Document Collectives",
  "/user/document-collectives",
  <BookOutlined />,
  [
    getItem("Doc. Collectives Requests", "/user/document-collectives/requests"),
    getItem(
      "Doc. Collectives Confirmation",
      "/user/document-collectives/confirmations"
    ),
    getItem("Doc. Collectives Sign", "/user/document-collectives/signs"),
    getItem("Doc. Collectives Reject", "/user/document-collectives/reject"),
  ]
);

const UserLayout = ({ children, active = "/user/dashboard" }) => {
  const router = useRouter();
  const handleRouter = (item) => {
    router.push(item.key);
  };

  const { data: session } = useSession();
  const masterUser =
    session?.user?.role === "USER" && session?.user?.group === "MASTER";

  if (masterUser) {
    // push before settings
    items.splice(2, 0, documentsCollectives);

    // pastikan tidak ada yang sama dalam array itesm
  }

  const uniqueItems = [
    ...new Map(items.map((item) => [item.key, item])).values(),
  ];

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
              type="primary"
              onClick={showModal}
              icon={<UploadOutlined />}
              block
            >
              Upload
            </Button>
          </div>
        ) : (
          <Tooltip title="Start Upload" placement="right">
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
              icon={<FormOutlined />}
            />
          </Tooltip>
        )}
        <UploadModal open={open} onCancel={handleCancel} />
        <Menu
          theme="dark"
          defaultSelectedKeys={[active]}
          items={uniqueItems}
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
            <Notifications />
            <Dropdown
              trigger={["click"]}
              menu={{ items: drawItems, onClick: dropdownClick }}
            >
              <Space
                style={{
                  marginLeft: 32,
                  cursor: "pointer",
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
