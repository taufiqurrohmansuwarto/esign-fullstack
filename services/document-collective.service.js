import axios from "axios";

const baseURL = "/esign/api/user";

const fetcher = axios.create({
  baseURL,
});

export const documentsCollectiveSign = async () => {
  return fetcher.get("/document-collectives-sign").then((res) => res?.data);
};

export const acceptDocumentCollective = async ({ id, data }) => {
  return fetcher
    .put(`/document-collectives/${id}/confirmation`)
    .then((res) => res?.data);
};

export const rejectDocumentCollective = async (id) => {
  return fetcher
    .delete(`/document-collectives/${id}/confirmation`)
    .then((res) => res?.data);
};
