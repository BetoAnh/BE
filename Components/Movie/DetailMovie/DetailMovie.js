// const express = require("express");
// const router = express.Router();
// const sql = require("mssql");
// const dbConnection = require("../../../Config/dbConnection");

// router.get("/:movieId", async (req, res) => {
//   try {
//     await dbConnection();
//     const pool = await sql.connect(dbConnection);
//     const request = pool.request();
//     const { movieId } = req.params;
//     // console.log("movieId: " + movieId);
//     const queryMovie = `
//       SELECT m.*
//       FROM Movie m
//       WHERE m.movieid = ${movieId}
//     `;
//     const queryCategory = `
//       SELECT c.*
//       FROM category c
//       INNER JOIN list_category lc ON lc.categoryid = c.categoryid
//       INNER JOIN Movie m ON m.movieid = lc.movieid
//       WHERE m.movieid = ${movieId}
//     `;
//     const queryType = `
//       SELECT t.*
//       FROM Type t
//       INNER JOIN list_type lt ON lt.typeid = t.typeid
//       INNER JOIN Movie m ON m.movieid = lt.movieid
//       WHERE m.movieid = ${movieId}
//     `;
//     const queryVideo = `
//       SELECT v.videoid, v.videoname
//       FROM Video v
//       INNER JOIN Movie m ON m.movieid = v.movieid
//       WHERE m.movieid = ${movieId}
//     `;
//     const movieResult = await request.query(queryMovie);
//     const categoryResult = await request.query(queryCategory);
//     const typeResult = await request.query(queryType);
//     const videoResult = await request.query(queryVideo);
//     const movies = movieResult.recordset;
//     const categories = categoryResult.recordset;
//     const types = typeResult.recordset;
//     const videos = videoResult.recordset;
//     res.status(200).json({
//       movies: movies,
//       categories: categories,
//       types: types,
//       videos: videos,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error connecting to SQL Server" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const mysql = require('mysql');
const dbConnection = require("../../../Config/db");

router.get("/:movieId", async (req, res) => {
  try {
    const pool = mysql.createPool(dbConnection);
    const { movieId } = req.params;

    const queryMovie = `
      SELECT *
      FROM Movie
      WHERE movieid = ?
    `;
    const queryCategory = `
      SELECT c.*
      FROM Category c
      INNER JOIN List_Category lc ON lc.categoryid = c.categoryid
      WHERE lc.movieid = ?
    `;
    const queryType = `
      SELECT t.*
      FROM Type t
      INNER JOIN List_Type lt ON lt.typeid = t.typeid
      WHERE lt.movieid = ?
    `;
    const queryVideo = `
      SELECT videoid, videoname
      FROM Video
      WHERE movieid = ?
    `;

    const movies = await executeQuery(pool, queryMovie, [movieId]);
    const categories = await executeQuery(pool, queryCategory, [movieId]);
    const types = await executeQuery(pool, queryType, [movieId]);
    const videos = await executeQuery(pool, queryVideo, [movieId]);

    res.status(200).json({
      movies: movies,
      categories: categories,
      types: types,
      videos: videos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error connecting to MySQL" });
  }
});

function executeQuery(pool, query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = router;
