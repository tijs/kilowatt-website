import { Hono } from "https://esm.sh/hono@4.0.0";
import { readFile, serveFile } from "https://esm.town/v/std/utils@85-main/index.ts";

const app = new Hono();

// Re-throw errors to see full stack traces
app.onError((err, _c) => {
  throw err;
});

// Serve static files from frontend and shared directories
app.get("/frontend/*", (c) => serveFile(c.req.path, import.meta.url));
app.get("/shared/*", (c) => serveFile(c.req.path, import.meta.url));

// Serve favicon
app.get("/favicon.svg", (c) => serveFile("/frontend/favicon.svg", import.meta.url));
app.get("/favicon.ico", (c) => serveFile("/frontend/favicon.svg", import.meta.url));

// Main page
app.get("/", async (c) => {
  const html = await readFile("/frontend/index.html", import.meta.url);
  return c.html(html);
});

// Privacy Policy
app.get("/privacy", async (c) => {
  const html = await readFile("/frontend/privacy.html", import.meta.url);
  return c.html(html);
});

// Terms & Conditions
app.get("/terms", async (c) => {
  const html = await readFile("/frontend/terms.html", import.meta.url);
  return c.html(html);
});

// Redirect any other routes to home
app.get("*", (c) => {
  return c.redirect("/");
});

export default app.fetch;
