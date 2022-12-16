// seal operation

const BASE_PATH = `/api/seal`;

// service untuk signing data hash
module.exports.signHash = (data) => {
  return bsreFetcher.post(`${BASE_PATH}/hash`, data);
};

// service untuk signing data pdf
module.exports.signPdf = (data) => {
  return bsreFetcher.post(`${BASE_PATH}/pdf`, data);
};
