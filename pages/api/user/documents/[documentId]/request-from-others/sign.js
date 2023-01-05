import { createRouter } from "next-connect";
const router = createRouter();

// role harus signer dan status harus pending
router.use().patch().delete();

export default router.handler();
