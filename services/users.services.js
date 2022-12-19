import axios from "axios";

const BASE_PATH = "/esign/api";

const fetcher = axios.create({
  baseURL: BASE_PATH,
});

export const verifyDocumentUser = (data) => {
  return fetcher
    .post("/bsre/sign/verify", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res?.data);
};
