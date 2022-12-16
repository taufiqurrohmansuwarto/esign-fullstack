const BASE_PATH = `/api/entity`;

module.exports.getExpiredCert = () => {
  return bsreFetcher.get(`${BASE_PATH}/cert/expired`);
};

module.exports.getReport = () => {
  return bsreFetcher.get(`${BASE_PATH}/report`);
};
