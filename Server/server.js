// server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, "data.db");

app.use(cors());
app.use(bodyParser.json());

// Open / create DB
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error("Failed to open DB:", err);
    process.exit(1);
  }
  console.log("SQLite DB opened:", DB_FILE);
});

// Create tables if not exists
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    city TEXT,
    contact TEXT,
    gst TEXT,
    notes TEXT,
    quotes TEXT,
    follow_up_date TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime'))
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    amount REAL,
    note TEXT,
    date TEXT,
    type TEXT,
    created_at TEXT DEFAULT (datetime('now','localtime')),
    FOREIGN KEY(customer_id) REFERENCES customers(id)
  )`);
});

// Helpers
const runAsync = (sql, params=[]) => new Promise((res, rej) => {
  db.run(sql, params, function(err) { if (err) rej(err); else res(this); });
});
const allAsync = (sql, params=[]) => new Promise((res, rej) => {
  db.all(sql, params, (err, rows) => { if (err) rej(err); else res(rows); });
});
const getAsync = (sql, params=[]) => new Promise((res, rej) => {
  db.get(sql, params, (err, row) => { if (err) rej(err); else res(row); });
});

// Routes

// GET all customers
app.get("/api/customers", async (req, res) => {
  try {
    const rows = await allAsync(`SELECT * FROM customers ORDER BY id DESC`);
    res.json(rows);
  } catch (err) {
    console.error("GET /api/customers error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST add customer
app.post("/api/customers", async (req, res) => {
  try {
    const { name, city, contact, gst, notes, quotes, follow_up_date } = req.body;
    const result = await runAsync(
      `INSERT INTO customers (name, city, contact, gst, notes, quotes, follow_up_date)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, city, contact, gst, notes, quotes, follow_up_date]
    );
    const id = result.lastID;
    const created = await getAsync(`SELECT * FROM customers WHERE id = ?`, [id]);
    res.json(created);
  } catch (err) {
    console.error("POST /api/customers error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE customer
app.delete("/api/customers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await runAsync(`DELETE FROM payments WHERE customer_id = ?`, [id]);
    await runAsync(`DELETE FROM customers WHERE id = ?`, [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/customers/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET payments for customer
app.get("/api/customers/:id/payments", async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await allAsync(`SELECT * FROM payments WHERE customer_id = ? ORDER BY id DESC`, [id]);
    res.json(rows);
  } catch (err) {
    console.error("GET payments error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST add payment for customer
app.post("/api/customers/:id/payments", async (req, res) => {
  try {
    const customerId = req.params.id;
    const { amount, note = "", date = null, type = "payment" } = req.body;

    if (!amount || isNaN(Number(amount))) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const dt = date || new Date().toISOString();
    const r = await runAsync(
      `INSERT INTO payments (customer_id, amount, note, date, type) VALUES (?, ?, ?, ?, ?)`,
      [customerId, amount, note, dt, type]
    );

    const created = await getAsync(`SELECT * FROM payments WHERE id = ?`, [r.lastID]);
    res.json(created);
  } catch (err) {
    console.error("POST payment error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET ledger summary (quoted, totalPaid, outstanding)
app.get("/api/customers/:id/ledger", async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await getAsync(`SELECT * FROM customers WHERE id = ?`, [id]);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    // quotes stored as string in customer.quotes (maybe numeric). If empty -> 0
    const quoted = Number(customer.quotes || 0);

    const sumRow = await getAsync(
      `SELECT COALESCE(SUM(amount),0) as totalPaid FROM payments WHERE customer_id = ?`,
      [id]
    );
    const totalPaid = Number(sumRow.totalPaid || 0);
    const outstanding = (quoted - totalPaid);

    res.json({
      quoted: quoted.toFixed(2),
      totalPaid: totalPaid.toFixed(2),
      outstanding: outstanding.toFixed(2)
    });
  } catch (err) {
    console.error("GET ledger error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET generate PDF quotation (simple)
app.get("/api/customers/:id/quotation", async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await getAsync(`SELECT * FROM customers WHERE id = ?`, [id]);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    // payments for history
    const payments = await allAsync(`SELECT * FROM payments WHERE customer_id = ? ORDER BY id DESC`, [id]);

    // Create PDF in-memory and stream to client
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=quotation_customer_${id}.pdf`);

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    doc.fontSize(18).text("Quotation", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Customer: ${customer.name || "-"}`);
    doc.text(`City: ${customer.city || "-"}`);
    doc.text(`Contact: ${customer.contact || "-"}`);
    doc.text(`GST: ${customer.gst || "-"}`);
    doc.text(`Notes: ${customer.notes || "-"}`);
    doc.moveDown();

    doc.text(`Quoted Value: ₹${Number(customer.quotes || 0).toFixed(2)}`);
    doc.moveDown();

    doc.text("Payment History:");
    if (payments.length === 0) {
      doc.text("  No payments yet");
    } else {
      payments.forEach(p => {
        doc.text(`  ${p.date} — ₹${Number(p.amount).toFixed(2)} — ${p.note || "-"}`);
      });
    }

    doc.end();
  } catch (err) {
    console.error("GET /quotation error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET export CSV of customers
app.get("/api/customers/export", async (req, res) => {
  try {
    const rows = await allAsync(`SELECT * FROM customers ORDER BY id DESC`);
    // Build CSV
    const header = ["id","name","city","contact","gst","notes","quotes","follow_up_date","created_at"];
    const csvLines = [header.join(",")];
    rows.forEach(r => {
      const line = [
        r.id,
        `"${(r.name||"").replace(/"/g,'""')}"`,
        `"${(r.city||"").replace(/"/g,'""')}"`,
        `"${(r.contact||"").replace(/"/g,'""')}"`,
        `"${(r.gst||"").replace(/"/g,'""')}"`,
        `"${(r.notes||"").replace(/"/g,'""')}"`,
        (r.quotes||""),
        (r.follow_up_date||""),
        (r.created_at||"")
      ].join(",");
      csvLines.push(line);
    });

    const csv = csvLines.join("\n");
    res.setHeader("Content-disposition", "attachment; filename=customers.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
  } catch (err) {
    console.error("GET /export error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
