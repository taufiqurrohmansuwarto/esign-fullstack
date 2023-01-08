import axios from "axios";

const biodataPegawai = async (fetcher, nip) => {
  const result = await fetcher.get(`/master/pegawai/${nip}`);
  const employeeData = result?.data;
  return employeeData;
};

const getBiodataWithHeaders = async (accessToken, nip) => {
  const fetcher = axios.create({
    baseURL: process.env.API_GATEWAY,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await biodataPegawai(fetcher, nip);
  return result;
};

const getBiodataPTTPKWIthHeaders = async (accessToken, nipttk) => {
  const fetcher = axios.create({
    baseURL: process.env.API_GATEWAY,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await biodataPegawai(fetcher, nipttk);
  return result;
};

module.exports = {
  biodataPegawai,
  getBiodataWithHeaders,
  getBiodataPTTPKWIthHeaders,
};
