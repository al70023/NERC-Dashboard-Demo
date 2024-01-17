const fs = require('fs');

const config = {
  user: 'postgres',
  host: 'nerc-dashboard-db.c7ga2i68i3pb.us-east-2.rds.amazonaws.com',
  database: 'Nerc_Dashboard_Demo_DB',
  password: 'password',
  port: 5432,
  ssl: {
    rejectUnauthorized: true, // Change to false if using a self-signed certificate
    ca: fs.readFileSync('rds-ca-2019-root.pem').toString()
  }
};



module.exports = config;