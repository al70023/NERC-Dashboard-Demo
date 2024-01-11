/* PRACTICE VM SQL DATABASE */
const config = {
  user: 'react',
  password: 'password',
  server: 'VMSUDNERCSQL01',
  database: 'TutorialDB',
  options: {
    trustServerCertificate: true,
    trustedConnection: false, // Enable for secure connection
  },
  port: 1433,
};



/* NERC ENVIRONMENT VM SQL DATABASE */
const realConfig = {
  user: 'gui',
  password: 'password',
  server: 'TXHDCOTVSQL02',
  database: 'TestDB',
  options: {
    trustServerCertificate: true,
    trustedConnection: false, // Enable for secure connection
  },
  port: 1433,
};

module.exports = realConfig, config;