import auth from "middlewares/auth.middleware";
import { createRouter } from "next-connect";
import { index } from "@/controllers/users-documents.controller";

const router = createRouter();

router.use(auth()).get((req, res) => res.json({ message: "ok" }));

export default router.handler();
