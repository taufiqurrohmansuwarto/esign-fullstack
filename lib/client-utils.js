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
  // const { status, message } = data;
  const status = data?.status;
  const message = data?.message;

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

// create lodash isEmpty
export const isEmpty = (value) => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  return false;
};

export const toKB = (bytes) => {
  return bytes / 1024;
};

export const upperCaseFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const infoSigner = (data) => {
  const [information] = data?.details;
  const { info_signer } = information;

  return {
    signer_name: info_signer?.signer_name,
    jumlah_signature: data?.jumlah_signature,
    nama_dokumen: data?.nama_dokumen,
  };
};

// for request from others
export const isOwner = (data, userId) => {
  const currentDocumentOwner = data?.Recipient?.find((r) => !!r?.is_owner);
  const checkIsOwner = currentDocumentOwner?.recipient_id === userId;

  return checkIsOwner;
};

// create flattenDeep lodash
export const flattenDeep = (data) => {
  return data.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
};

export const roleType = (data, userId) => {
  const currentRole = data?.Recipient?.find(
    (recipient) =>
      recipient?.signatory_status === "PENDING" &&
      recipient?.recipient_id === userId
  );
  const role = currentRole?.role;

  let result;

  if (!role) {
    result = null;
  } else {
    result = role;
  }

  return result;
};

export const recipientPosition = (data, userId) => {
  const listRecipient = data?.Recipient?.filter(
    (recipient) => recipient?.signatory_status === "PENDING"
  );
  const myCurrentPosition = listRecipient?.find(
    (recipient) => recipient?.recipient_id === userId
  )?.sequence;

  let result = {
    text: "",
    role: "",
    isMyJob: false,
  };

  const firstRecipient = listRecipient?.[0];
  const myJob = firstRecipient?.sequence === myCurrentPosition;

  if (myJob) {
    result = {
      ...result,
      text: `This document is waiting for you as a ${firstRecipient?.role}`,
      role: firstRecipient?.role,
      isMyJob: true,
    };
  } else if (firstRecipient) {
    result = {
      ...result,
      text: `This document waiting for ${firstRecipient?.recipient_json?.nama} as a ${firstRecipient?.role}`,
      role: firstRecipient?.role,
      isMyJob: false,
    };
  } else {
    result = {
      ...result,
      text: `This document has been completed`,
      role: null,
      isMyJob: false,
    };
  }

  return result;
};

export const documentStatus = ({
  workflow,
  status,
  signatory_status,
  role,
  is_approve,
}) => {
  let kata;
  let color;

  if (
    workflow === "selfSign" &&
    role === "signer" &&
    signatory_status === "in progress"
  ) {
    kata = status;
  } else {
    if (status === "completed") {
      kata = "completed";
      color = "green";
    }

    if (status === "rejected" && role === null) {
      kata = "rejected";
      color = "red";
    }

    if (
      status === "rejected" &&
      role === "signer" &&
      !is_approve &&
      signatory_status === "in progress"
    ) {
      kata = "unsigned (rejected)";
      color = "red";
    }

    if (
      status === "rejected" &&
      role === "reviewer" &&
      !is_approve &&
      signatory_status === "in progress"
    ) {
      kata = "unreviewed (rejected)";
      color = "red";
    }

    if (role === "reviewer" && signatory_status === "completed") {
      kata = "reviewed";
      color = "red";
    }

    if (
      role === "reviewer" &&
      signatory_status === "rejected" &&
      status === "rejected"
    ) {
      kata = "reviewed (rejected)";
      color = "red";
    }

    if (
      role === "signer" &&
      signatory_status === "rejected" &&
      status === "rejected"
    ) {
      kata = "signed (rejected)";
      color = "red";
    }

    if (role === "signer" && signatory_status === "completed") {
      kata = "signed";
      color = "green";
    }

    if (status === "draft") {
      kata = "draft";
      color = "grey";
    }

    if (status === "on progress") {
      if (role === null && signatory_status === null) {
        kata = "on progress";
        color = "yellow";
      }
      if (role === "signer" && signatory_status === "in progress") {
        kata = "waiting for sign";
        color = "yellow";
      }
      if (role === "signer" && signatory_status === "completed") {
        kata = "signed";
        color = "yellow";
      }
      if (role === "reviewer" && signatory_status === "in progress") {
        kata = "waiting for review";
        color = "yellow";
      }
    }
  }
  return {
    kata,
    color,
  };
};

export const recipientStatus = (recipient) => {
  let kata;
  let color;
  const { role, signatory_status, status, is_approve } = recipient;

  if (role === "signer" && signatory_status === "completed") {
    kata = "signed";
    color = "green";
  }
  if (role === "reviewer" && signatory_status === "completed") {
    kata = "reviewed";
    color = "green";
  }
  if (role === "signer" && signatory_status === "in progress") {
    kata = "waiting for sign";
    color = "yellow";
  }
  if (role === "reviewer" && signatory_status === "in progress") {
    kata = "waiting for review";
    color = "yellow";
  }

  if (
    (role === "reviewer" &&
      signatory_status === "rejected" &&
      status === "rejected" &&
      is_approve) ||
    (role === "signer" &&
      signatory_status === "rejected" &&
      status === "rejected" &&
      is_approve)
  ) {
    kata = "rejected";
    color = "red";
  }

  if (
    role === "reviewer" &&
    signatory_status === "in progress" &&
    status === "rejected" &&
    !is_approve
  ) {
    kata = "unreviewed (rejected)";
    color = "red";
  }

  if (
    role === "signer" &&
    signatory_status === "rejected" &&
    status === "rejected" &&
    !is_approve
  ) {
    kata = "unsigned (rejected)";
    color = "red";
  }

  return {
    kata: kata?.toUpperCase(),
    color,
  };
};

export const colorOfItem = (action) => {
  let color;
  if (action === "OPENED") {
    color = "black";
  } else if (action === "REJECTED") {
    color = "red";
  } else if (action === "SIGNED" || action === "SIGNED") {
    color = "green";
  } else {
    color = "blue";
  }

  return color;
};
