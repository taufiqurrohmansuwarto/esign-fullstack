const { default: prisma } = require("@/lib/prisma");
const { serializeNotification } = require("@/lib/serialize.utils");

const listNotificationsController = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const lastId = req?.query?.lastId;

    let query = {
      where: {
        to_id: userId,
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        from_id: true,
        to_id: true,
        message: true,
        is_read: true,
        type: true,
        created_at: true,
        sender: {
          select: {
            user_info: true,
          },
        },
        document: {
          select: {
            filename: true,
          },
        },
      },
    };

    const result = await prisma.Notification.findMany(
      lastId ? { ...query, cursor: { id: lastId } } : query
    );

    if (result.length > 0) {
      const notifications = result.map((notification) =>
        serializeNotification(notification)
      );

      res.json(notifications);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const markAsAllReadController = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const result = await prisma.Notification.updateMany({
      where: {
        to_id: userId,
        is_read: false,
      },
      data: {
        is_read: true,
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  listNotificationsController,
  markAsAllReadController,
};
