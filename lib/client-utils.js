// using dayjs

import {
  FileDoneOutlined,
  InteractionOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

export const formatDate = (date) => {
  return dayjs(date).format("MMM DD, YYYY HH:mm");
};

// change camelCase to Capitalize each word give it space each word
export const capitalize = (str) => {
  return str
    ?.split(" ")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");
};

// filename without extension
export const takeFormat = (filename) => {
  return filename.split(".").slice(0, -1).join(".");
};

export const listUrl = [
  {
    url: "/user/documents/all",
    icon: <ProfileOutlined />,
    text: "View All Document",
  },
  {
    url: "/user/settings/activity-log",
    icon: <InteractionOutlined />,
    text: "Activity Log",
  },
  {
    url: "/user/settings/signatures",
    icon: <FileDoneOutlined />,
    text: "Signature",
  },
  {
    url: "/user/settings/faq",
    icon: <QuestionCircleOutlined />,
    text: "Frequently Asked Question",
  },
];

export const alertHeader = (data) => {
  const { status, message } = data;
  let type;
  let text;

  if (status === "NOT_REGISTERED") {
    text = message;
    type = "error";
  } else {
    text = message;
    type = "success";
  }

  return {
    type,
    text,
  };
};

export const upperCase = (str) => {
  return str.toUpperCase();
};
