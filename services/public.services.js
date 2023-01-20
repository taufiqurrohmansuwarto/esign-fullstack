import axios from "axios";

const baseURL = "/esign/api/public";

const fetcher = axios.create({
  baseURL,
});

export const checkDocumentById = (id) => {
  return fetcher.get(`/check-documents/${id}`).then((res) => res?.data);
};

export const verifyDocumentUser = async (data) => {
  return fetcher
    .post(`/verify-document`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res?.data);
};
