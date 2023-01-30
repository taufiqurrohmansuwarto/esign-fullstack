import { createRouter } from "next-connect";
import { changePasswordController } from "@/controllers/user-document.controller";
import auth from "@/middlewares/auth.middleware";
const router = createRouter();

router.use(auth()).post(changePasswordController);

export default router.handler();
