const prisma = require("../prisma/client");
const asyncHandler = require("express-async-handler");
const SERVER_URL = process.env.SERVER_URL;

// @desc Get All Sales Data
// @route GET /sales
const getAllTransactions = asyncHandler(async (req, res) => {
  let { month, currentPage, limit, search } = req.query;
  limit = limit || 10;
  if (month === undefined || month < 1 || month > 12) {
    return res.json({ message: "Invalid month" });
  }
  currentPage = currentPage || 1;
  let skip = (currentPage - 1) * parseInt(limit);

  search = search || "";

  const results = await prisma.transaction.aggregateRaw({
    pipeline: [
      {
        $set: {
          _id: { $toString: "$_id" },
          dateOfSale: { $toString: "$dateOfSale" },
          month: {
            $month: "$dateOfSale",
          },
        },
      },
      {
        $match: {
          month: parseInt(month),
        },
      },
      {
        $match: {
          $or: [
            { title: { $regex: search, $options: "i" } },
            {
              description: {
                $regex: search,
                $options: "i",
              },
            },
            {
              price: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        },
      },
      {
        $facet: {
          totalItemCount: [
            {
              $group: {
                _id: null,
                total: {
                  $sum: 1,
                },
              },
            },
          ],
          data: [
            {
              $skip: skip,
            },
            {
              $limit: parseInt(limit),
            },
          ],
        },
      },
    ],
  });

  const formattedResponse = {
    totalPages: Math.ceil(results[0].totalItemCount[0].total / parseInt(limit)),
    currentPage: currentPage,
    data: results[0].data,
  };

  res.json({
    ...formattedResponse,
  });
});

// @desc Get Stats
// @route GET /stats
const getStats = asyncHandler(async (req, res) => {
  const { month } = req.query;
  const result = await prisma.transaction.aggregateRaw({
    pipeline: [
      {
        $project: {
          price: 1,
          sold: 1,
          month: {
            $month: "$dateOfSale",
          },
        },
      },
      {
        $match: {
          month: parseInt(month),
        },
      },
      {
        $facet: {
          pricePipe: [
            {
              $group: {
                _id: null,
                totalPrice: {
                  $sum: "$price",
                },
              },
            },
          ],
          soldUnsoldPipe: [
            {
              $group: {
                _id: "$sold",
                count: {
                  $sum: 1,
                },
              },
            },
          ],
        },
      },
    ],
  });

  const formattedResult = {
    totalPrice: result[0].pricePipe[0].totalPrice,
    sold: result[0].soldUnsoldPipe[1].count,
    unsold: result[0].soldUnsoldPipe[0].count,
  };
  res.json({ ...formattedResult });
});

// @desc Get Bar Chart Data
// @route GET /bar-chart
const getBarChartData = asyncHandler(async (req, res) => {
  const { month } = req.query;
  const result = await prisma.transaction.aggregateRaw({
    pipeline: [
      {
        $project: {
          price: 1,
          month: {
            $month: "$dateOfSale",
          },
        },
      },
      {
        $match: {
          month: parseInt(month),
        },
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                {
                  case: { $lte: ["$price", 100] },
                  then: "0 - 100",
                },
                {
                  case: { $lte: ["$price", 200] },
                  then: "101 - 200",
                },
                {
                  case: { $lte: ["$price", 300] },
                  then: "201 - 300",
                },
                {
                  case: { $lte: ["$price", 400] },
                  then: "301 - 400",
                },
                {
                  case: { $lte: ["$price", 500] },
                  then: "401 - 500",
                },
                {
                  case: { $lte: ["$price", 600] },
                  then: "501 - 600",
                },
                {
                  case: { $lte: ["$price", 700] },
                  then: "601 - 700",
                },
                {
                  case: { $lte: ["$price", 800] },
                  then: "701 - 800",
                },
                {
                  case: { $lte: ["$price", 900] },
                  then: "801 - 900",
                },
                {
                  case: { $gt: ["$price", 900] },
                  then: "901 - above",
                },
              ],
              default: "Unknown",
            },
          },
          count: { $sum: 1 },
        },
      },
    ],
  });

  const labels = [
    "0 - 100",
    "101 - 200",
    "201 - 300",
    "301 - 400",
    "401 - 500",
    "501 - 600",
    "601 - 700",
    "701 - 800",
    "801 - 900",
    "901-above",
  ];

  const formattedResponse = labels.map((label) => {
    return (
      result.find((item) => item._id === label) || { _id: label, count: 0 }
    );
  });

  res.json({ ...formattedResponse });
});

// @desc Get Pie Chart Data
// @route GET /pie-chart
const getPieChartData = asyncHandler(async (req, res) => {
  const { month } = req.query;
  const result = await prisma.transaction.aggregateRaw({
    pipeline: [
      {
        $project: {
          category: 1,
          month: {
            $month: "$dateOfSale",
          },
        },
      },
      {
        $match: {
          month: parseInt(month),
        },
      },
      {
        $group: {
          _id: "$category",
          value: {
            $sum: 1,
          },
        },
      },
    ],
  });

  let formattedResponse = result.map((item) => {
    return {
      label: item._id,
      value: item.value,
    };
  });
  res.json(formattedResponse);
});

// @desc Get Monthly Stats
// @route GET /monthly-stats
const getMonthlyStats = asyncHandler(async (req, res) => {
  const { month } = req.query;
  const statsResponse = await fetch(SERVER_URL + `stats?month=${month}`);
  const statData = await statsResponse.json();

  const barChartResponse = await fetch(SERVER_URL + `bar-chart?month=${month}`);

  const barChartData = await barChartResponse.json();

  const pieChartResponse = await fetch(SERVER_URL + `pie-chart?month=${month}`);

  const pieChartData = await pieChartResponse.json();

  res.json({
    stats: statData,
    barChartData: barChartData,
    pieChartData: pieChartData,
  });
});

module.exports = {
  getAllTransactions,
  getStats,
  getBarChartData,
  getPieChartData,
  getMonthlyStats,
};
