import { createRouter } from "next-connect";
import auth from "@/middlewares/auth.middleware";
import CheckDocumentAllowAccessMiddleware from "@/middlewares/check-document-to-allow-access.middleware";
import { historyByDocument } from "@/controllers/histories.controller";
const router = createRouter();

router
  .use(auth())
  .use(CheckDocumentAllowAccessMiddleware)
  .get(historyByDocument);

export default router.handler();
