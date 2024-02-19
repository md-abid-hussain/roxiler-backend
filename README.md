# Backend Service

This is the backend service for your application. It provides APIs for managing transactions.

## Frontend Service : https://transaction-dashboard-frontend.onrender.com/

## Getting Started

To get started with the backend service, follow these steps:

1. Clone the repository: `git clone https://github.com/md-abid-hussain/roxiler-backend`
2. Change directory: `cd roxiler-backend`
3. Install dependencies: `npm install`
4. Set up mongodb database
5. Create `.env` file same as `.env.example`
6. Run `npx prisma db push`
7. Run seed script to populate the database with initial data: `npx prisma db seed`
8. Start the server: `npm run dev`

## API Endpoints
All endpoints require month as query parameter which accept number range from 1 to 12. 

`Example`: `https://transaction-backend.onrender.com/api/v1/transactions?month=1`

### Get All Transactions

Returns all transactions. Supports pagination and search as well

`Example`: `https://transaction-backend.onrender.com/api/v1/transactions?month=7&currentPage=1&limit=10`

- **URL:** `/api/v1/transactions?month=1`
- **Method:** `GET`
- **Query Param:** `month` (required)
- **Response:** JSON array of transactions

### Get Transaction Statistics

Returns statistics about transactions.

- **URL:** `https://transaction-backend.onrender.com/api/v1/transactions/stats?month=1`
- **Method:** `GET`
- **Response:** JSON object with transaction statistics

### Get Bar Chart Data

Returns data for a bar chart visualization of transactions.

- **URL:** `https://transaction-backend.onrender.com/api/v1/transactions/bar-chart?month=1`
- **Method:** `GET`
- **Response:** JSON array of data for the bar chart

### Get Pie Chart Data

Returns data for a pie chart visualization of transactions.

- **URL:** `https://transaction-backend.onrender.com/api/v1/transactions/pie-chart?month=1`
- **Method:** `GET`
- **Response:** JSON array of data for the pie chart

### Get Monthly Statistics

Returns monthly statistics about transactions.

- **URL:** `https://transaction-backend.onrender.com/api/v1/transactions/monthly-stats?month=1`
- **Method:** `GET`
- **Response:** JSON object with monthly transaction statistics

