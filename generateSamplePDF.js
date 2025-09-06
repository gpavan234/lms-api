import fs from "fs";
import PDFDocument from "pdfkit";

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream("certificates/sample.pdf"));

doc.fontSize(25).text("Sample Certificate", { align: "center" });
doc.moveDown();
doc.fontSize(16).text("This is a mock certificate for testing.", { align: "center" });
doc.moveDown();
doc.text("Course: Sample Course", { align: "center" });
doc.text("Student: John Doe", { align: "center" });
doc.text("Date: 06-Sep-2025", { align: "center" });

doc.end();
console.log("Sample PDF created at certificates/sample.pdf");
