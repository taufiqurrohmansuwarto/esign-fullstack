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

export const fromNowDate = (date) => {
  return dayjs(date).fromNow();
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

// create debounce value without async
export const debounceValue = (value, delay) => {
  let timerId;
  return new Promise((resolve) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      resolve(value);
    }, delay);
  });
};

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const toKB = (bytes) => {
  return bytes / 1024;
};

export const upperCaseFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
