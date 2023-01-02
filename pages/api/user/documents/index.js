import { createRouter } from "next-connect";
import auth from "@/middlewares/auth.middleware";
import { index } from "@/controllers/users-documents.controller";

const router = createRouter();

router.use(auth()).get(index);

module.exports = router.handler();
