const { bsreFetcher } = require("../../lib/fetcher");
const BASE_PATH = `/api/v2/sign`;

export const getTotpSign = (data) => {
  return bsreFetcher.get(`${BASE_PATH}/get/totp`, data);
};

export const signPdf = (data) => {
  return bsreFetcher.post(`${BASE_PATH}/pdf`, data);
};
