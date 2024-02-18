# Backend Service

This is the backend service for your application. It provides APIs for managing transactions.

## Frontend Service : https://transaction-dashboard-frontend.onrender.com/

## Getting Started

To get started with the backend service, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## API Endpoints
All endpoints require month as query parameter which accept number range from 1 to 12. 
`Example`: ``/api/v1/transactions?month=1`

### Get All Transactions

Returns all transactions.

- **URL:** `/api/v1/transactions`
- **Method:** `GET`
### Get All Transactions

Returns all transactions.

- **URL:** `/api/v1/transactions?month=1`
- **Method:** `GET`
- **Query Param:** `month` (required)
- **Response:** JSON array of transactions

### Get Transaction Statistics

Returns statistics about transactions.

- **URL:** `/api/v1/transactions/stats`
- **Method:** `GET`
- **Response:** JSON object with transaction statistics

### Get Bar Chart Data

Returns data for a bar chart visualization of transactions.

- **URL:** `/api/v1/transactions/bar-chart`
- **Method:** `GET`
- **Response:** JSON array of data for the bar chart

### Get Pie Chart Data

Returns data for a pie chart visualization of transactions.

- **URL:** `/api/v1/transactions/pie-chart`
- **Method:** `GET`
- **Response:** JSON array of data for the pie chart

### Get Monthly Statistics

Returns monthly statistics about transactions.

- **URL:** `/api/v1/transactions/monthly-stats`
- **Method:** `GET`
- **Response:** JSON object with monthly transaction statistics

