import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5501;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = process.env.VERCEL ? process.cwd() : __dirname;

app.use(express.static(ROOT_DIR));

app.get("/", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "pages", "index.html"));
});

app.get("/resume", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "pages", "resume.html"));
});

app.get("/portfolio", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "pages", "portfolio.html"));
});

app.get("/blog", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "pages", "blog.html"));
});

app.get("/contact", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "pages", "contact.html"));
});

app.listen(PORT, () => {
  console.log(`Marketing site running on http://localhost:${PORT}`);
});
