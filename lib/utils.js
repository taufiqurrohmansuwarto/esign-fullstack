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
};

// preview document with minio
export const minioPreviewDocument = async ({ minio, filename }) => {
  return new Promise((resolve, reject) => {
    minio.presignedGetObject(
      "storage",
      `/esign/${filename}`,
      24 * 60 * 60,
      (err, presignedUrl) => {
        if (err) {
          return reject(err);
        }
        return resolve(presignedUrl);
      }
    );
  });
};
