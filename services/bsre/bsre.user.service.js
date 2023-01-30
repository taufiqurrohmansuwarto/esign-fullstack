const { bsreFetcher } = require("../../lib/fetcher");

const BASE_PATH = "/api/user";

// pengecekan status
module.exports.checkNik = (nik) => {
  return bsreFetcher.get(`${BASE_PATH}/status/${nik}`);
};

// mendaftarkan user
module.exports.registrasi = (data) => {
  return bsreFetcher.post(`${BASE_PATH}/registrasi`, data);
};

// get profile
module.exports.getProfile = (nik) => {
  return bsreFetcher.get(`${BASE_PATH}/profile/${nik}`);
};

// get certificate
module.exports.getCertificate = (id) => {
  return bsreFetcher.get(`${BASE_PATH}/certificate/chain/${id}`);
};

module.exports.keystore = (data) => {
  return bsreFetcher.post(`${BASE_PATH}/keystore`, data);
};

// permohonan lupa passphrase
module.exports.forgotPassphrase = (nik) => {
  return bsreFetcher.post(`${BASE_PATH}/passphrase/forget/${nik}`);
};
