import axios from "axios";

const baseURL = "/esign/api/public";

const fetcher = axios.create({
  baseURL,
});

export const checkDocumentById = (id) => {
  return fetcher.get(`/check-documents/${id}`).then((res) => res?.data);
};
