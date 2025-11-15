import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import db from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

// Lightweight health check for deploy diagnostics
app.get("/api/health", (req, res) => {
	// run a trivial query to verify DB connectivity
	db.query("SELECT 1", (err) => {
		if (err) {
			console.error("Health check: database connection failed:", err);
			return res.status(500).json({ ok: false, db: false, error: "Database connection failed" });
		}
		res.json({ ok: true, db: true });
	});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
