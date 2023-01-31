const { createRouter } = require("next-connect");
import {
  listNotificationsController,
  markAsAllReadController,
} from "@/controllers/notifications.controller";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router
  .use(auth())
  .get(listNotificationsController)
  .put(markAsAllReadController);

export default router.handler();
