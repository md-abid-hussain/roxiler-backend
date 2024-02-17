const express = require('express')

const router = express.Router()
const transactionController = require('../controllers/transactionController')

router.route('/')
      .get(transactionController.getAllTransactions)

router.route('/stats')
      .get(transactionController.getStats)

router.route('/bar-chart')
      .get(transactionController.getBarChartData)

router.route('/pie-chart')
      .get(transactionController.getPieChartData)

router.route('/monthly-stats')
      .get(transactionController.getMonthlyStats)

module.exports = router