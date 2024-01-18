const fs = require('fs');

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: true, // Change to false if using a self-signed certificate
    // Ensure the certificate file is present in the project directory or provide the correct path
    ca: fs.readFileSync(process.env.SL_CERT_PATHSL_CERT_PATH).toString()
  }
};

module.exports = config;
