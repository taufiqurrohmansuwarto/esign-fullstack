import { remove } from "@/controllers/documents-discussions.controller";
import CheckDocumentAllowAccessMiddleware from "@/middlewares/check-document-to-allow-access.middleware";
import auth from "middlewares/auth.middleware";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(auth()).use(CheckDocumentAllowAccessMiddleware).delete(remove);

export default router.handler();
