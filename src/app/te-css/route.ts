import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export function GET() {
  const filePath = path.join(process.cwd(), "styles/te.css");
  const css = fs.readFileSync(filePath, "utf-8");
  return new Response(css, {
    headers: { "Content-Type": "text/css; charset=utf-8" },
  });
}
