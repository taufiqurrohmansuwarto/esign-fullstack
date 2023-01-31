const { default: prisma } = require("@/lib/prisma");
const { serializeNotification } = require("@/lib/serialize.utils");

const listNotificationsController = async (req, res) => {
  try {
    const userId = req?.user?.id;
    const lastId = req?.query?.lastId;
    const type = req?.query?.type || "unread";

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

    if (type === "unread") {
      query = {
        ...query,
        where: {
          ...query.where,
          is_read: false,
        },
      };
    }

    if (type === "read") {
      query = {
        ...query,
        where: {
          ...query.where,
          is_read: true,
        },
      };
    }

    const result = await prisma.Notification.findMany(
      lastId ? { ...query, skip: 1, take: 10, cursor: { id: lastId } } : query
    );

    if (result.length > 0) {
      const notifications = result.map((notification) =>
        serializeNotification(notification)
      );

      res.json({
        lastId: result[result.length - 1].id,
        data: notifications,
      });
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
