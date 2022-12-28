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
export const uploadFile = ({ mc, file, filename }) => {
  return new Promise((resolve, reject) => {
    return mc.putObject(
      process.env.MINIO_BUCKET,
      filename,
      file,
      file.length,
      (err, etag) => {
        if (err) return reject(err);
        return resolve(etag);
      }
    );
  });
};
