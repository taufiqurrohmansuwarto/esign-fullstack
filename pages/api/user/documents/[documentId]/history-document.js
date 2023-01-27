const { createRouter } = require("next-connect");
import { historiesDocument } from "@/controllers/history-document.controller";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).get(historiesDocument);

export default router.handler();
