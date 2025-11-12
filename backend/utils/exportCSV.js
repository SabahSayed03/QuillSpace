//exportCSV.js
import { Parser } from "json2csv";

export const exportToCSV = (data, res) => {
  try {
    const fields = ["title", "author", "created_at"];
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("posts.csv");
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ error: "Error exporting CSV" });
  }
};
