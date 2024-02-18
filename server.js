require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;

app.use("/api/v1/transactions", require("./routes/transactionRoute"));

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
