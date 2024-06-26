const express = require("express");
const router = express.Router();
const sql = require("mssql");
const dbConnection = require("../../../Config/dbConnection");

router.get("/", async (req, res) => {
  try {
    await dbConnection();
    const pool = await sql.connect(dbConnection);
    const request = pool.request();
    const query = `
    SELECT m.movieid, m.moviename, m.views, m.poster, m.movieurl,
    (SELECT CAST(AVG(value) AS DECIMAL(10, 1)) FROM Rating WHERE movieid = m.movieid) AS average_rating
    FROM Movie m
    WHERE NOT EXISTS (SELECT 1 FROM Video v WHERE v.movieid = m.movieid);
    `;
    const result = await request.query(query);
    const movies = result.recordset;
    res.status(200).json({ movies: movies });
  } catch (error) {
    res.status(500).json({ message: "Error connecting to SQL Server" });
  }
});

module.exports = router;
