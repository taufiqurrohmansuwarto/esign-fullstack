const recipientsIndex = async (req, res) => {
  try {
    const { documentId } = req?.query;
    const currentDocument = await prisma.Document.findUnique({
      where: {
        id: documentId,
      },
      include: {
        Recipient: {
          orderBy: {
            sequence: "asc",
          },
        },
      },
    });

    res.json(currentDocument);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// post merupakan penambahan recipients dalam dokumen
const post = async (req, res) => {
  try {
    const { documentId } = req?.query;
    const data = req?.body;
    const user = req?.user;

    let promise = [];

    // upsert user dulu karena menggunakan foreign key, kalau ga ada maka akan error
    data?.forEach((d) => {
      promise.push(
        prisma.User.upsert({
          where: {
            id: d?.recipient_id,
          },
          update: {},
          create: {
            id: d?.recipient_id,
            user_info: d?.recipient_json,
            username: d?.recipient_json?.nama,
            group: "MASTER",
            role: "USER",
            image: d?.recipient_json?.fileDiri?.foto,
          },
        })
      );
    });

    await Promise.all(promise);

    // insert semua request body ke dalam tabel recipients
    await prisma.Recipient.createMany({
      data,
    });

    // buat status dokumen itu yang tadinya draft menjadi ongoing
    await prisma.Document.update({
      where: {
        id: documentId,
      },
      data: {
        status: "ONGOING",
      },
    });

    // update juga signatory status dari ownernya
    await prisma.Recipient.updateMany({
      where: {
        document_id: documentId,
        recipient_id: user?.id,
        is_owner: true,
      },
      data: {
        signatory_status: "COMPLETED",
        status: "ONGOING",
        approval_date: new Date(),
      },
    });

    // apa perlu ditambahkan ke tabel history?
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  recipientsIndex,
  post,
};
