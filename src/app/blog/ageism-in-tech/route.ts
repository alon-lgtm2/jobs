import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export function GET() {
  const filePath = path.join(process.cwd(), "blog-ageism-in-tech.html");
  const html = fs.readFileSync(filePath, "utf-8");
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
