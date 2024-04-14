// const sql = require('mssql');
const dbConfig = require('./db');
const mysql = require('mysql');

async function connectToDatabase() {
  try {
    let pool = await mysql.createPool(dbConfig); //connect
    // const result = await pool.request().query('SELECT * FROM Users');
    // const users = result.recordset;
    // console.log(users);
    // return users;
    // console.log("Connected SQL");
    // return pool;
    pool.getConnection((err, conn) => {
      if(err) console.log(err)
      console.log("Connected successfully")
  })
  } catch (error) {
    console.log('Error connecting to SQL Server:', error);
  }
}

module.exports = connectToDatabase;