// info signer untuk pengecekan dokumen
export const infoSigner = (data) => {
  const [information] = data?.details;

  const { info_signer } = information;

  return {
    signer_name: info_signer?.signer_name,
    jumlah_signature: data?.jumlah_signature,
    nama_dokumen: data?.nama_dokumen,
  };
};

<<<<<<< HEAD
export const uploadFile = ({ minio, filename, fileBuffer }) => {
  return new Promise((resolve, reject) => {
    minio.putObject(
      "storage",
      `/esign/${filename}`,
      fileBuffer,
      fileBuffer.length,
      "application/pdf",
      (err, etag) => {
        if (err) {
          return reject(err);
        }
        return resolve(etag);
      }
    );
  });
=======
// upload file using minio
export const uploadFile = ({ mc, file }) => {
  return new Promise((resolve, reject) => {});
>>>>>>> e9044192125223df79fbf1772a16ec38b94e7e15
};
