const { nanoid } = require("nanoid");

// digunakan untuk menentukan nama file pdf
const changeFilenamePdf = (bodyTitle, file) => {
  const filename = bodyTitle
    ? `${nanoid()}_${bodyTitle}.pdf`
    : `${nanoid()}_${file?.originalname}`;

  return filename;
};

// data you will be insert to documents table and recipients table
const documentData = ({ file, user, workflow, title, currentFilename }) => {
  return {
    original_filename: file?.originalname,
    type: file?.mimetype,
    status: "DRAFT",
    filename: title ? `${title}.pdf` : file?.originalname,
    workflow,
    size: file?.size,
    initial_document: currentFilename,
    upload_date: new Date(),
    created_at: new Date(),
    user_id: user?.id,
  };
};

const firstRecipientRequestFromOthers = ({ user, document }) => {
  return {
    recipient_id: user?.id,
    filename: document?.filename,
    document_id: document?.id,
    created_at: new Date(),
    sequence: 0,
    recipient_json: user?.user_info,
    role: "owner",
    signatory_status: "PENDING",
    is_owner: true,
    status: "DRAFT",
  };
};

module.exports = {
  changeFilenamePdf,
  firstRecipientRequestFromOthers,
  documentData,
};
