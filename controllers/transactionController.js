const prisma = require("../prisma/client");
const asyncHandler = require("express-async-handler");

// @desc Get All Sales Data
// @route GET /sales
const getAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await prisma.transaction.findMany({
    
  });
  if (!transactions.length) {
    return res.status(404).json({ message: "transaction data not found" });
  }

  res.json({ data: transactions });
});

module.exports = {
  getAllTransactions,
};
