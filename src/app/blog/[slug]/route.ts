import fs from "fs";
import path from "path";

// Catch-all: serves any blog/[slug].html that doesn't have its own route.ts.
// To publish a new article: create blog/my-slug.html — no route handler needed.
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "blog", `${slug}.html`);
  if (!fs.existsSync(filePath)) {
    return new Response("Not found", { status: 404 });
  }

  const html = fs.readFileSync(filePath, "utf-8");
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
