const asyncHandler = require("express-async-handler");
const Refund = require("../models/refundsModel");

const getRefunds = asyncHandler(async (req, res) => {
  const refunds = await Refund.find();
  res.status(200).json(refunds);
});
const getRefund = asyncHandler(async (req, res) => {
  const refund = await Refund.findById(req.params.id);
  res.status(200).json(refund);
});
const postRefund = asyncHandler(async (req, res) => {
  const { title, price, tva, img, dateBuying, status } = req.body;
  const refund = await Refund.create({
    title,
    price,
    tva,
    img,
    dateBuying,
    status,
  });
  res.status(200).json(refund);
});

const updateRefund = asyncHandler(async (req, res) => {
  try {
    const refund = await Refund.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(refund);
  } catch (error) {
    res.status(500).json({
      error: `Refund not update`,
    });
  }
});
const deleteRefund = asyncHandler(async (req, res) => {
  try {
    const refund = await Refund.findByIdAndDelete(req.params.id);
    res.status(200).json(refund);
  } catch (error) {
    res.status(500).json({
      error: `Refund not delete`,
    });
  }
});

module.exports = {
  getRefunds,
  getRefund,
  postRefund,
  updateRefund,
  deleteRefund,
};
