# ConnexOne Tech Test: Oscar James

This is the README file for the ConnexOne technical test of candidate Oscar James. The app consists of an Express API backend and a React dashboard frontend.

The Express API is designed to handle requests, authenticate users, measure and expose Prometheus metrics, and provide a simple API endpoint for retrieving the current epoch time. 

The frontend dashboard is a React application that displays real-time server time and various metrics, providing up-to-date information about the server time and prometheus metrics.

Below, you will find information on how to set up and use the application.

## Getting Started

### Prerequisites

To run this application, you need to have the following software installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node.js package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/oscarjamessv/connexone.git
   cd connexone
   ```
2. Cd into the respecitve directories and install the required dependencies:
   ```bash
   cd connex-one-api
   npm install
   npm run build
   cd ..
   cd connex-one-frontend
   npm install
   ```

## Usage

To start the express server, run the following command:
```bash
cd connex-one-api
npm start
```
This will start the server on port 8080 (matching the default port in the front end react app ). You should also see a message in the console indicating that the server has started and is running from port 8080.

To start the react app, run the following command in another terminal window:
```bash
cd connex-one-frontend
npm start
```

# Express API
Please find further details on the backend api below:

## Endpoints
### /time endpoint
The '/time' endpoint provides the current epoch time in seconds. 
- **Endpoint:** `/time`
- **HTTP Method:** GET
- **Authentication:** Required (Token-based)
- **Response Format:** JSON

### /metrics endpoint
The /metrics endpoint provides Prometheus metrics about the application's performance, including request durations, request lengths, and response lengths. These metrics are automatically collected by the Prometheus middleware.

- **Endpoint:** `/mertics`
- **HTTP Method:** GET
- **Authentication:** Required (Token-based)
- **Response Format:** Plain Text (Prometheus metrics)

## Testing

The application includes unit tests to ensure its functionality. The testing framework used is Jest along with TypeScript support (ts-jest).

### Running Tests

Testing is provided by Jest and Supertest.
To run the tests, follow these steps:

1. Make sure you have all the dependencies installed by running:

   ```bash
   npm install

2. Make sure you have all the dependencies installed by running:

   ```bash
   npm test

## Dependencies

The application relies on the following dependencies:

- [cors](https://www.npmjs.com/package/cors): For enabling Cross-Origin Resource Sharing.
- [express](https://www.npmjs.com/package/express): The web application framework used for routing and handling requests.
- [express-prometheus-middleware](https://www.npmjs.com/package/express-prometheus-middleware): Middleware for collecting and exposing Prometheus metrics.
- [jsonschema](https://www.npmjs.com/package/jsonschema): For validating JSON responses against a schema.
- [dotenv](https://www.npmjs.com/package/dotenv): For loading environment variables from a `.env` file.
- [ts-jest](https://www.npmjs.com/package/ts-jest): TypeScript support for Jest testing framework.

For development, the project also includes additional dependencies for TypeScript, Jest testing, and development server.