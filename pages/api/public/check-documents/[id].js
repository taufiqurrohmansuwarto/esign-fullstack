import { publicSearch } from "@/controllers/public.controller";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(publicSearch);

export default router.handler();
