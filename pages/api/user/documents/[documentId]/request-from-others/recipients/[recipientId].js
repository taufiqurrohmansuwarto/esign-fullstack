import { createRouter } from "next-connect";
const router = createRouter();

router.use().get().patch().delete();

export default router.handler();
