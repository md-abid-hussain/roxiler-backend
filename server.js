require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;

app.use("/api/v1/transactions", require("./routes/transactionRoute"));

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
