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

// upload file using minio
export const uploadFile = ({ fileBuffer, minio, filename }) => {
  return new Promise((resolve, reject) => {
    minio.putObject("storage", `esign/${filename}`, fileBuffer, (err, etag) => {
      if (err) {
        reject(err);
      }
      resolve(etag);
    });
  });
};
