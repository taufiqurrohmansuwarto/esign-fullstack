import auth from "middlewares/auth.middleware";
import { createRouter } from "next-connect";

const router = createRouter();

router.use(auth()).get(async (req, res) => {
  res.json({
    user: "test",
  });
});

export default router.handler();
