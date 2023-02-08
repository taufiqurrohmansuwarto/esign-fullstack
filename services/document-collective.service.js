import axios from "axios";

const baseURL = "/esign/api/user";

const fetcher = axios.create({
  baseURL,
});

export const documentsCollectiveSign = async () => {
  return fetcher.get("/document-collectives-sign").then((res) => res?.data);
};
