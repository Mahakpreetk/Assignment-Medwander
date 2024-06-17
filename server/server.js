const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const db = require("./db/index.js");
const exceljs = require("exceljs");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

// Endpoint to handle form submission
app.post("/api/submit", (req, res) => {
  const { formType, name, countryCode, phoneNumber } = req.body;

  const query = `INSERT INTO forms (form_type, name, country_code, phone_number) VALUES (?, ?, ?, ?)`;
  db.run(query, [formType, name, countryCode, phoneNumber], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Form submitted successfully", id: this.lastID });
  });
});

// Endpoint to sync data with Excel
app.get("/api/sync-excel", (req, res) => {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet("Forms");

  db.all("SELECT * FROM forms", (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Error syncing Excel" });
    }

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Form Type", key: "form_type", width: 20 },
      { header: "Name", key: "name", width: 20 },
      { header: "Country Code", key: "country_code", width: 15 },
      { header: "Phone Number", key: "phone_number", width: 15 },
    ];

    rows.forEach((row) => {
      worksheet.addRow(row);
    });

    workbook.xlsx
      .writeFile("forms.xlsx")
      .then(() => {
        console.log("Excel file synced successfully");
        res.json({ message: "Excel sheet synced successfully" });
      })
      .catch((err) => {
        console.error("Error syncing Excel:", err);
        res.status(500).json({ error: "Error syncing Excel" });
      });
  });
});

// Catch-all handler to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
