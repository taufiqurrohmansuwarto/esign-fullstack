const { nanoid } = require("nanoid");
import { downloadFile } from "@/lib/utils";

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
    status: "draft",
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
    role: "owner",
    signatory_status: "pending",
    is_owner: true,
    uploader_id: user?.id,
    status: "draft",
  };
};

module.exports = {
  changeFilenamePdf,
  firstRecipientRequestFromOthers,
  documentData,
};
