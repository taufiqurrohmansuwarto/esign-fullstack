const { createRouter } = require("next-connect");
import { list, upload } from "@/controllers/documents-collectives-files";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).get(list).post(upload);

export default router.handler();
