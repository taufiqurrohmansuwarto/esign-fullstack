import { detailInformationDocument } from "@/controllers/user-document.controller";
import auth from "middlewares/auth.middleware";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(auth()).get(detailInformationDocument);

export default router.handler();
