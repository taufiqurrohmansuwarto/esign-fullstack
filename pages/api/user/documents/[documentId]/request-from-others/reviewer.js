import { createRouter } from "next-connect";
const router = createRouter();

// di terima dan di tolak
router.use().patch().delete();

export default router.handler();
