// excelUpdateRouter.js
const express = require("express");
const excel = require("exceljs");
const db = require("../db/index.js");
const router = express.Router();

router.get("/update", async (req, res) => {
  try {
    const formData = await db.query("SELECT * FROM formData");
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("FormData");

    worksheet.columns = [
      { header: "Form Type", key: "formType", width: 15 },
      { header: "Name", key: "name", width: 30 },
      { header: "Country Code", key: "countryCode", width: 15 },
      { header: "Phone Number", key: "phoneNumber", width: 20 },
    ];

    formData.forEach((row) => {
      worksheet.addRow(row);
    });

    const fileName = `FormData_${Date.now()}.xlsx`;
    const filePath = `path/to/excel/files/${fileName}`;
    await workbook.xlsx.writeFile(filePath);

    res.json({ success: true, message: "Excel sheet updated successfully" });
  } catch (error) {
    console.error("Error updating Excel sheet:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update Excel sheet" });
  }
});

module.exports = router;
