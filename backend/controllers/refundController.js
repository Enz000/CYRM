const asyncHandler = require("express-async-handler");

const getRefunds = asyncHandler(async (request, response) => {
  console.log(request.body);
  response.status(200).json({ message: "Get Refunds" });
});
const getRefund = asyncHandler(async (request, response) => {
  const id = Number(request.params.id);
  response.status(200).json({ message: `Get one refund with id ${id}` });
});
const postRefund = asyncHandler(async (request, response) => {
  response.status(200).json({ message: "Post Refund" });
});

const updateRefund = asyncHandler(async (request, response) => {
  const id = Number(request.params.id);
  response.status(200).json({ message: `Update refund ${id}` });
});
const deleteRefund = asyncHandler(async (request, response) => {
  const id = Number(request.params.id);
  response.status(200).json({ message: `Delete refund ${id}` });
});

module.exports = {
  getRefunds,
  getRefund,
  postRefund,
  updateRefund,
  deleteRefund,
};
