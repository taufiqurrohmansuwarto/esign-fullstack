const { formatDate } = require("@/lib/client-utils");
const { default: prisma } = require("@/lib/prisma");
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const tableJudul = (data) => {
  return {
    style: "table",
    layout: "noBorders",
    table: {
      body: [
        ["Title", ":", data?.filename],
        ["Document Pages", ":", data?.document_pages],
        ["Owner", ":", data?.uploader?.user_info?.nama],
        ["Status", ":", data?.status],
        ["Created At", ":", formatDate(data?.created_at)],
      ],
    },
  };
};

const tableRecipient = (data) => {
  const recipients = data?.Recipient?.map((recipient) => {
    return [
      recipient?.recipient_json?.nama,
      recipient?.role?.toUpperCase(),
      recipient?.sequence,
      recipient?.signatory_status,
      formatDate(recipient?.approval_date),
    ];
  });

  return {
    style: "table",
    table: {
      body: [
        ["Account", "Role", "Sequence", "Status", "Information"],
        ...recipients,
      ],
    },
  };
};

const tableHistories = (data) => {
  const histories = data?.histories?.map((history) => {
    return [
      history?.user?.user_info?.nama,
      history?.action,
      history?.ip_address,
      formatDate(history?.created_at),
      history?.useragent,
    ];
  });

  return {
    style: "table",
    table: {
      body: [
        ["Name", "Activity", "IP Address", "Date", "User Agent"],
        ...histories,
      ],
    },
  };
};

const historiesDocument = async (req, res) => {
  const documentId = req?.query?.documentId;
  const userId = req?.user?.id;

  try {
    const currentDocument = await prisma.Document.findUnique({
      where: {
        id: documentId,
      },
      select: {
        filename: true,
        status: true,
        uploader: {
          select: {
            user_info: true,
          },
        },
        document_pages: true,
        created_at: true,
        Recipient: {
          orderBy: {
            sequence: "asc",
          },
          select: {
            recipient_json: true,
            role: true,
            signatory_status: true,
            approval_date: true,
            sequence: true,
          },
        },
        histories: {
          orderBy: {
            created_at: "asc",
          },
          select: {
            ip_address: true,
            useragent: true,
            created_at: true,
            activity: true,
            action: true,
            user: {
              select: {
                user_info: true,
              },
            },
          },
          where: {
            type: "DOCUMENT",
          },
        },
      },
    });

    const recipients = await prisma.Recipient.findMany({
      where: {
        recipient_id: userId,
        document_id: documentId,
      },
    });

    const checkIfCurrentUserInRecipient = recipients?.find(
      (recipient) => recipient?.recipient_id === userId
    );

    const docDefinition = {
      content: [
        {
          text: "Summary",
          style: "header",
        },

        tableJudul(currentDocument),
        {
          text: "Recipients",
          style: "header",
        },
        tableRecipient(currentDocument),
        {
          text: "Histories",
          style: "header",
        },
        tableHistories(currentDocument),
      ],
      styles: {
        header: {
          margin: [0, 15, 0, 5],
        },
        table: {
          fontSize: 8,
        },
      },
    };

    // buat judul

    // buat document information account, role, status, information

    // buat history name, activity, ip address, date, useragent

    const pdfDoc = pdfMake.createPdf(docDefinition);

    if (!checkIfCurrentUserInRecipient) {
      res.status(403).json({ message: "Forbidden" });
    } else {
      pdfDoc.getBase64((data) => {
        res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment;filename=histories.pdf",
        });

        const download = Buffer.from(data.toString("utf-8"), "base64");
        res.end(download);
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  historiesDocument,
};
