// ini digunakan pada client menggunakan react-query

import axios from "axios";

const baseURL = "/esign/api/user";

const fetcher = axios.create({
  baseURL,
});

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
  // object to qeury strign

  const queryString = Object.keys(query)
    .map((key) => key + "=" + query[key])
    .join("&");

  return fetcher.get("/documents").then((res) => res?.data);
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
