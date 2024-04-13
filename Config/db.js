const db = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  // server: '26.150.181.207', // DESKTOP-DU2RDFE
  // server: '26.138.51.32',   // DESKTOP-8F687F2
  server: process.env.DB_HOST,   // VIETANH
  database: process.env.DB_DBNAME,
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
};

module.exports = db;