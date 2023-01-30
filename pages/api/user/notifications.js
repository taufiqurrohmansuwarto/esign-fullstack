const { createRouter } = require("next-connect");
import auth from "@/controllers/auth.controller";
import {
  listNotificationsController,
  markAsAllReadController,
} from "@/controllers/notifications.controller";

const router = createRouter();

router
  .use(auth())
  .get(listNotificationsController)
  .put(markAsAllReadController);

export default router.handler();
