const PdfDocument = require("pdfkit");

const historiesDocument = async (req, res) => {
  try {
    const documentId = req?.query?.documentId;

    const pdf = new PdfDocument();

    pdf.text("Hello World!");

    const table = [
      ["Column 1", "Column 2"],
      ["Row 1, Cell 1", "Row 1, Cell 2"],
      ["Row 2, Cell 1", "Row 2, Cell 2"],
    ];

    pdf.table(table, {
      prepareHeader: () => pdf.font("Helvetica-Bold"),
      prepareRow: (row, i) => pdf.font("Helvetica").fontSize(12),
    });

    res.setHeader("Content-disposition", "attachment; filename=report.pdf");
    res.setHeader("Content-type", "application/pdf");

    pdf.pipe(res);
    pdf.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  historiesDocument,
};
