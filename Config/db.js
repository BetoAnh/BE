const db = {
  host     : process.env.DB_HOST,
  user     : process.env.DB_USERNAME,
  password :  process.env.DB_PASSWORD,
  database : process.env.DB_DBNAME,
  waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  // user: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // // server: '26.150.181.207', // DESKTOP-DU2RDFE
  // // server: '26.138.51.32',   // DESKTOP-8F687F2
  // server: process.env.DB_HOST,   // VIETANH
  // database: process.env.DB_DBNAME,
  // port: process.env.DB_DBNAME,
  // options: {
  //   encrypt: true,
  //   trustServerCertificate: true
  // },
};

module.exports = db;