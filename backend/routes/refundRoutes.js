const express = require("express");
const {
  getRefunds,
  getRefund,
  postRefund,
  updateRefund,
  deleteRefund,
} = require("../controllers/refundController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/:id")
  .get(protect, getRefund)
  .put(protect, updateRefund)
  .delete(protect, deleteRefund);
router.route("/").get(protect, getRefunds).post(protect, postRefund);

module.exports = router;
