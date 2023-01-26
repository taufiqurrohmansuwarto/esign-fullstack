const {
  historiesDocument,
} = require("@/controllers/history-document.controller");
const { createRouter } = require("next-connect");

const router = createRouter();

router.get(historiesDocument);

export default router.handler();
