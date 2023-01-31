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

export const detailInformationDocument = (documentId) => {
  return fetcher
    .get(`/documents/${documentId}/information`)
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

export const selfSignApproveSign = ({ documentId, data }) => {
  return fetcher
    .patch(`/documents/${documentId}/self-sign`, data)
    .then((res) => res?.data);
};

// request from others

// upload
export const requestFromOthersUpload = (data) => {
  return fetcher
    .post("/upload-request-from-others", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res?.data);
};

// add recipients
export const requestFromOthersAddRecipients = ({ documentId, data }) => {
  return fetcher
    .post(`/documents/${documentId}/request-from-others/recipients`, data)
    .then((res) => res?.data);
};

// submit recipients
export const requestFromOthrersSubmitRecipients = (documentId) => {
  return fetcher
    .put(`/documents/${documentId}/request-from-others`)
    .then((res) => res?.data);
};

// approve sign and reject sign
export const requestFromOthersApproveSign = ({ documentId, data }) => {
  return fetcher
    .put(`/documents/${documentId}/request-from-others/recipients/sign`, data)
    .then((res) => res?.data);
};

export const requestFromOthersRejectSign = ({ documentId, data }) => {
  return fetcher
    .patch(`/documents/${documentId}/request-from-others/recipients/sign`, data)
    .then((res) => res?.data);
};

// approve review and reject review
export const requestFromOthersApproveReview = (documentId) => {
  return fetcher
    .put(`/documents/${documentId}/request-from-others/recipients/review`)
    .then((res) => res?.data);
};

export const requestFromOthersRejectReview = (id) => {
  return fetcher
    .patch(`/documents/${id}/request-from-others/recipients/review`)
    .then((res) => res?.data);
};

// end request from others

export const findRecipients = (employeeNumber) => {
  return fetcher.get(`/stamps/${employeeNumber}`).then((res) => res?.data);
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

export const getHistories = async (query) => {
  const queryString = Object.keys(query)
    .map((key) => key + "=" + query[key])
    .join("&");

  return fetcher.get(`/histories?${queryString}`).then((res) => res?.data);
};

export const documentHistories = async (documentId, query) => {
  const queryString = Object.keys(query)
    .map((key) => key + "=" + query[key])
    .join("&");

  return fetcher
    .get(`/documents/${documentId}/histories?${queryString}`)
    .then((res) => res?.data);
};

// documents Information
export const getRecipinents = async (documentId) => {
  return fetcher
    .get(`/documents/${documentId}/recipients`)
    .then((res) => res?.data);
};

// bsreProfile
export const getBsreProfile = async () => {
  return fetcher.get(`/bsre-profile`).then((res) => res?.data);
};

export const searchingAutocomplete = async (search) => {
  return fetcher
    .get(`/documents/searching?search=${search}`)
    .then((res) => res?.data);
};

// delete document
export const removeDocument = async (documentId) => {
  return fetcher.delete(`/documents/${documentId}`).then((res) => res?.data);
};

export const archieved = async (documentId) => {
  return fetcher
    .patch(`/documents/${documentId}/archived`)
    .then((res) => res?.data);
};

export const getUrls = async (documentId) => {
  return fetcher.get(`/documents/${documentId}/urls`).then((res) => res?.data);
};

export const forgotPassphrase = async () => {
  return fetcher.post(`/settings/forgot-passphrase`).then((res) => res?.data);
};

// notification services
export const getNotification = async (lastId = null, type = "unread") => {
  return fetcher
    .get(`/notifications?lastId=${lastId}&type=${type}`)
    .then((res) => res?.data);
};

export const markAsReadNotification = async () => {
  return fetcher.put(`/notifications`).then((res) => res?.data);
};

// document collectives
export const getDocumentCollectivesRequest = async (query) => {
  const queryString = Object.keys(query)
    .map((key) => key + "=" + query[key])
    .join("&");

  return fetcher
    .get(`/document-collectives?${queryString}`)
    .then((res) => res?.data);
};

export const createDocumentCollectiveRequest = async (data) => {
  return fetcher.post(`/document-collectives`, data).then((res) => res?.data);
};

export const removeDocumentCollectiveRequest = async (id) => {
  return fetcher.delete(`/document-collectives/${id}`).then((res) => res?.data);
};

export const updateDocumentCollectiveRequest = async ({ id, data }) => {
  return fetcher
    .patch(`/document-collectives/${id}`, data)
    .then((res) => res?.data);
};
