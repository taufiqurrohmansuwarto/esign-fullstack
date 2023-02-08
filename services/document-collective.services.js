import axios from "axios";

const baseURL = "/esign/api/user/document-collectives";

const fetcher = axios.create({
  baseURL,
});

export const listDocumentCollectivesConfirmation = () => {
  return fetcher.get("/confirmations").then((res) => res?.data);
};
