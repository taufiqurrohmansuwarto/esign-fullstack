const { default: bsreFetcher } = require("../../lib/fetcher");

const BASE_PATH = "/api/sign";

// service untuk signing data pdf
module.exports.signCms = (data) => {
  return bsreFetcher.post(`${BASE_PATH}/cms`, data);
};

// download sign dokumen
module.exports.signDokumen = (id) => {
  return bsreFetcher.get(`${BASE_PATH}/download/${id}`);
};

// service untuk signing dokumen pdf
module.exports.signPdf = (data) => {
  return bsreFetcher.get(`${BASE_PATH}/pdf`, data);
};

// verifikasi dokumen yang telah ditandatangani
module.exports.verify = (data) => {
  return bsreFetcher.post(`${BASE_PATH}/verify`, data);
};
