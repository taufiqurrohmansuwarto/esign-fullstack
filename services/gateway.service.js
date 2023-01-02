import axios from "axios";

export const biodataPegawai = async (fetcher, nip) => {
  const result = await fetcher.get(`/master/pegawai/${nip}`);
  const employeeData = result?.data;
  return employeeData;
};

export const getBiodataWithHeaders = async (accessToken, nip) => {
  const fetcher = axios.create({
    baseURL: process.env.API_GATEWAY,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await biodataPegawai(fetcher, nip);
  return result;
};
