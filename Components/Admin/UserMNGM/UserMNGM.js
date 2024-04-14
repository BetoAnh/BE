const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey =
  "as63d1265qw456q41rf32ds1g85456e1r32w1r56qr41_qwe1qw56e42a30s0";
const dbConfig  = require("../../../Config/db");
const mysql = require('mysql');

router.get("/", async (req, res) => {
  try {
    const pool = mysql.createPool(dbConfig);
    const query = "SELECT * FROM Users";
    
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting MySQL connection:", err);
        res.status(500).json({ error: "Failed to connect to MySQL" });
        return;
      }

      connection.query(query, (err, result) => {
        connection.release(); // Release the connection back to the pool
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Failed to retrieve users from MySQL" });
          return;
        }

        if (result.length > 0) {
          res.json(result);
        } else {
          res.status(404).json({ error: "No users found" });
        }
      });
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "An error occurred while retrieving users." });
  }
});

router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const pool = mysql.createPool(dbConfig);

    const query = "DELETE FROM Users WHERE UserId = ?";
    const values = [userId];

    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting MySQL connection:", err);
        res.status(500).json({ error: "Failed to connect to MySQL" });
        return;
      }

      connection.query(query, values, (err, result) => {
        connection.release(); // Release the connection back to the pool
        if (err) {
          console.error("Error executing MySQL query:", err);
          res.status(500).json({ error: "Failed to delete user from MySQL" });
          return;
        }

        if (result.affectedRows > 0) {
          res.json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      });
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "An error occurred while deleting the user." });
  }
});

module.exports = router;
