const serializeNotification = (notification) => {
  const { message, sender, document } = notification;

  const senderInfo = sender?.user_info;

  const senderName = senderInfo?.nama;
  const documentInfo = document?.filename;
  //   the sample result is like 'EKO ask you to sign "Menglola.pdf"'
  return `${senderName} ${message} "${documentInfo}"`;
};

module.exports = {
  serializeNotification,
};
