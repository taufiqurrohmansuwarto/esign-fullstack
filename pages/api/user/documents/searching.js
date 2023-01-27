const { createRouter } = require("next-connect");
import { searching } from "@/controllers/user-document.controller";
import auth from "@/middlewares/auth.middleware";

const router = createRouter();

router.use(auth()).get(searching);

export default router.handler();
