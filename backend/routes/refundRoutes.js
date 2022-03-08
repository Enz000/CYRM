const express = require("express");
const {
  getRefunds,
  getRefund,
  postRefund,
  updateRefund,
  deleteRefund,
} = require("../controllers/refundController");
const router = express.Router();

router
  .route("/refund/:id")
  .get(getRefund)
  .put(updateRefund)
  .delete(deleteRefund);
router.route("/refund").get(getRefunds).post(postRefund);

module.exports = router;
