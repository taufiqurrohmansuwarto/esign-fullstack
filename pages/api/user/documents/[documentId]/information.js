import { detailDocument } from "@/controllers/user-document.controller";
import auth from "middlewares/auth.middleware";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(auth()).get(detailDocument);

export default router.handler();
