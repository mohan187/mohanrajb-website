import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5501;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/resume", (_req, res) => {
  res.sendFile(path.join(__dirname, "pages", "resume.html"));
});

app.get("/portfolio", (_req, res) => {
  res.sendFile(path.join(__dirname, "pages", "portfolio.html"));
});

app.get("/blog", (_req, res) => {
  res.sendFile(path.join(__dirname, "pages", "blog.html"));
});

app.get("/contact", (_req, res) => {
  res.sendFile(path.join(__dirname, "pages", "contact.html"));
});

app.listen(PORT, () => {
  console.log(`Marketing site running on http://localhost:${PORT}`);
});
