const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
require("dotenv").config();

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MySQL from .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
});

// Check
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);
  }
  console.log("MySQL Connected...");
});

// Health-check 
app.get("/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.error("DB query error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

// Register user
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "User already exists or DB error" });
      }
      res.json({ message: "User registered successfully" });
    }
  );
});

// Login user
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.length === 0) {
        return res.status(401).json({ error: "User not found" });
      }

      const user = result[0];
      if (bcrypt.compareSync(password, user.password)) {
        res.json({
          message: "Login successful",
          user: {
            id: user.id,
            username: user.username,
            phone: user.phone || "",
            address: user.address || "",
          },
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
  );
});

// Update profile 
app.post("/update-profile", (req, res) => {
  const { userId, phone, address } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID required" });
  }

  db.query(
    "UPDATE users SET phone = ?, address = ? WHERE id = ?",
    [phone, address, userId],
    (err) => {
      if (err) {
        console.error("Update profile error:", err);
        return res.status(500).json({ error: "DB error" });
      }
      return res.json({ message: "Profile updated successfully" });
    }
  );
});

// Save cart
app.post("/save-cart", (req, res) => {
  const { userId, cart } = req.body;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  db.query(
    "UPDATE users SET cart = ? WHERE id = ?",
    [JSON.stringify(cart), userId],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error saving cart" });
      }
      res.json({ message: "Cart saved successfully" });
    }
  );
});

// Get cart
app.get("/get-cart/:id", (req, res) => {
  const userId = req.params.id;
  db.query("SELECT cart FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching cart" });
    if (result.length === 0) return res.json({ cart: [] });
    res.json({ cart: JSON.parse(result[0].cart || "[]") });
  });
});

// Change password
app.post("/change-password", (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result[0];
    const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Old password incorrect" });
    }

    const hashedNew = bcrypt.hashSync(newPassword, 10);
    db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedNew, userId],
      (err2) => {
        if (err2) {
          console.error("Update password error:", err2);
          return res.status(500).json({ error: "DB update error" });
        }
        return res.json({ message: "Password updated successfully" });
      }
    );
  });
});

// Checkout
app.post("/checkout", (req, res) => {
  const { userId, cart, address, phone } = req.body;

  if (!userId || !cart || cart.length === 0) {
    return res
      .status(400)
      .json({ error: "Cart is empty or invalid request" });
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  db.query(
    "INSERT INTO orders (user_id, items, total, address, phone) VALUES (?, ?, ?, ?, ?)",
    [userId, JSON.stringify(cart), total, address, phone],
    (err, result) => {
      if (err) {
        console.error("Checkout error:", err);
        return res.status(500).json({ error: "Error creating order" });
      }
      return res.json({
        message: "Order placed successfully",
        orderId: result.insertId,
      });
    }
  );
});

// Get all orders for a user
app.get("/orders/:userId", (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, result) => {
      if (err) {
        console.error("Orders error:", err);
        return res.status(500).json({ error: "DB error" });
      }
      res.json(result);
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
