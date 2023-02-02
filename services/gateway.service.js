import axios from "axios";

const biodataPegawai = async (fetcher, nip) => {
  const result = await fetcher.get(`/master/pegawai/${nip}`);
  const employeeData = result?.data;
  return employeeData;
};

const biodataPegawaiPTTPK = async (fetcher) => {
  const result = await fetcher.get(`/pttpk/info`);
  const employeeData = result?.data;
  return employeeData;
};

const biodataPegawaiAtasan = async (fetcher, skpd_id) => {
  const result = await fetcher.get(`/master/employees/departments/${skpd_id}`);
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

const getBiodataWithHeadersPTTPK = async (accessToken, nipttk) => {
  const fetcher = axios.create({
    baseURL: process.env.API_GATEWAY,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await biodataPegawaiPTTPK(fetcher);
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
  getBiodataWithHeadersPTTPK,
  biodataPegawaiAtasan,
};
