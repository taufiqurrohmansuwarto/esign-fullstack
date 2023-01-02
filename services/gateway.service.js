export const biodataPegawai = async (fetcher, nip) => {
  const result = await fetcher.get(`/master/pegawai/${nip}`);
  const employeeData = result?.data;
  return employeeData;
};
