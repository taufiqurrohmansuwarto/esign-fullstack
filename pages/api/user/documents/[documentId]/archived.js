const { createRouter } = require("next-connect");
import { archiveDocument } from "@/controllers/user-document.controller";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).patch(archiveDocument);

export default router.handler()