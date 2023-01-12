// ini digunakan pada client menggunakan react-query

import axios from "axios";

const baseURL = "/esign/api/user";

const fetcher = axios.create({
  baseURL,
});

export const getDashboard = () => {
  return fetcher.get("/dashboard").then((res) => res?.data);
};

export const check = () => {
  return fetcher.get("/check");
};

export const detailUser = () => {
  return fetcher.get("/").then((res) => res?.data);
};

export const stampInfo = () => {
  return fetcher.get("/stamps").then((res) => res?.data);
};

export const stampInfoByEmployeeNumber = (employeeNumber) => {
  return fetcher.get(`/stamps/${employeeNumber}`).then((res) => res?.data);
};

export const listDocuments = (query) => {
  // object to qeury string
  const queryString = Object.keys(query)
    .map((key) => key + "=" + query[key])
    .join("&");

  return fetcher.get(`/documents?${queryString}`).then((res) => res?.data);
};

export const detailDocument = (documentId) => {
  return fetcher
    .get(`/documents/${documentId}/detail`)
    .then((res) => res?.data);
};

export const discussions = (documentId) => {
  return fetcher
    .get(`/documents/${documentId}/discussions`)
    .then((res) => res?.data);
};

export const createDiscussion = ({ documentId, data }) => {
  return fetcher
    .post(`/documents/${documentId}/discussions`, data)
    .then((res) => res?.data);
};

export const removeDiscussion = ({ documentId, discussionId }) => {
  return fetcher
    .delete(`/documents/${documentId}/discussions/${discussionId}`)
    .then((res) => res?.data);
};

// self sign
export const selfSignUpload = (data) => {
  return fetcher
    .post("/upload-self-sign", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res?.data);
};

export const selfSignApproveSign = (data) => {
  return fetcher.post("/self-sign/approve", data).then((res) => res?.data);
};

// request from others
export const requestFromOthersUpload = (data) => {
  return fetcher
    .post("/request-from-others/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res?.data);
};

export const requestFromOthersAddRecipients = (data) => {
  return fetcher
    .post("/request-from-others/add-recipients", data)
    .then((res) => res?.data);
};

export const requestFromOthersApproveSign = (data) => {
  return fetcher
    .post("/request-from-others/approve", data)
    .then((res) => res?.data);
};

export const requestFromOthersRejectSign = (data) => {
  return fetcher
    .post("/request-from-others/reject", data)
    .then((res) => res?.data);
};

export const requestFromOthersApproveReview = (data) => {
  return fetcher
    .post("/request-from-others/approve-review", data)
    .then((res) => res?.data);
};

export const requestFromOthersRejectReview = (data) => {
  return fetcher
    .post("/request-from-others/reject-review", data)
    .then((res) => res?.data);
};

// notifications
export const notifications = async () => {
  return fetcher.get("/notifications").then((res) => res?.data);
};

export const markAsRead = async (notificationId) => {
  return fetcher
    .post("/notifications/mark-as-read", { notificationId })
    .then((res) => res?.data);
};

export const markAllAsRead = async () => {
  return fetcher
    .post("/notifications/mark-all-as-read")
    .then((res) => res?.data);
};

export const informationDocument = async (documentId) => {
  return fetcher
    .get(`/documents/${documentId}/information`)
    .then((res) => res?.data);
};
