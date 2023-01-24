const base64ToBuffer = (base64) => {
  const imageBuffer = Buffer.from(base64, "base64");
  const imageArray = new Uint8Array(imageBuffer);
  return imageArray;
};

module.exports = {
  base64ToBuffer,
};
