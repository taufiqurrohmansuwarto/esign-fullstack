import { createRouter } from "next-connect";
import auth from "@/middlewares/auth.middleware";
import { detailDocument } from "@/controllers/user-document.controller";

const router = createRouter();

router.use(auth()).get(detailDocument);

export default router.handler();
