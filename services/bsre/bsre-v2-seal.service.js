const { bsreFetcher } = require("../../lib/fetcher");
const BASE_PATH = `/api/v2/seal`;

// cek segel status
export const getSealStatus = (subscriberId) => {
  return bsreFetcher.get(`${BASE_PATH}/${subscriberId}`);
};

// enrollment seal
export const enrollmentSeal = (data) => {
  return bsreFetcher.post(`${BASE_PATH}/enrollment`, data);
};

// get totp for activation seal
export const getTotpActivation = (data) => {
  return bsreFetcher.post(`${BASE_PATH}/get/activation`, data);
};

// get totp for seal
export const getTotpForSeal = (data) => {
  return bsreFetcher.get(`${BASE_PATH}/get/totp`, data);
};

// seal hash
export const sealHash = (data) => {
  return bsreFetcher.post(`${BASE_PATH}/hash`, data);
};

// seal pdf
export const sealPdf = (data) => {
  return bsreFetcher.post(`/${BASE_PATH}/pdf`, data);
};

// get subscriber id by id permohonan
export const getSubscriberIdByIdPermohonan = (idPermohonan) => {
  return bsreFetcher.get(`${BASE_PATH}/permohonan/${idPermohonan}`);
};

export const revokeSeal = (data) => {
  return bsreFetcher.post(`${BASE_PATH}/revoke`, data);
};

export const revokeTotpForActivationSeal = () => {
  return bsreFetcher.post(`${BASE_PATH}/revoke/activation`, data);
};
