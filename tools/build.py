"""
Build all HTML pages for jobs.israelis.nl.

Single source of truth for shared layout (nav, footer, CSS).
Page content lives in _pages/<slug>.html as small partials.
This script combines them into self-contained HTML files in the project root.

Usage:  python tools/build.py
"""
from pathlib import Path
import sys
import re

ROOT = Path(__file__).resolve().parent.parent
CSS = (ROOT / "styles" / "te.css").read_text(encoding="utf-8")


def head(title, description, og_image="", url=""):
    full_url = f"https://jobs.israelis.nl{url}"
    return f"""<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:url" content="{full_url}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="he_IL">
  <meta property="og:site_name" content="jobs.israelis.nl">
  {f'<meta property="og:image" content="{og_image}">' if og_image else ''}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{description}">
  {f'<meta name="twitter:image" content="{og_image}">' if og_image else ''}
  <link rel="canonical" href="{full_url}">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🇮🇱</text></svg>">
  <script defer src="https://cloud.umami.is/script.js" data-website-id="fe4e09f5-6b61-4820-8704-716ef86776b6"></script>
  <style>
{CSS}
  </style>
</head>
<body>

<!-- NAV -->
<header class="te-nav" id="site-nav">
  <div class="te-container te-nav-inner">
    <a href="/" class="te-nav-logo" aria-label="jobs.israelis.nl">
      <span class="te-nav-mark">ij</span>
      <span class="te-nav-wordmark">israelis<em>.nl</em>&thinsp;jobs</span>
    </a>
    <nav class="te-nav-links" id="nav-links">
      <a href="/articles">מאמרים</a>
      <a href="/library">ספרייה</a>
      <a href="/coaching">ליווי</a>
      <a href="/advisory">ייעוץ</a>
      <a href="/prompts">כלי AI</a>
      <a href="/contact" class="te-nav-cta">בואו נדבר</a>
    </nav>
    <button class="te-hamburger" id="hamburger" aria-label="תפריט">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
"""


def footer():
    return """
<!-- FOOTER -->
<footer class="te-footer">
  <div class="te-container">
    <div class="te-footer-inner">
      <div class="te-footer-brand">
        <div class="te-footer-wordmark">israelis<em>.nl</em>&thinsp;jobs</div>
        <div class="te-footer-tagline">הפלטפורמה של הישראלים בהולנד.</div>
      </div>
      <div class="te-footer-links">
        <a href="/articles">מאמרים</a>
        <a href="/library">ספרייה</a>
        <a href="/coaching">ליווי</a>
        <a href="/advisory">ייעוץ</a>
        <a href="/prompts">כלי AI</a>
        <a href="/post-job">פרסום משרה</a>
        <a href="https://techexpats.nl" target="_blank" rel="noopener">B2B · TechExpats.nl</a>
        <a href="https://www.facebook.com/groups/1550032319015043/" target="_blank" rel="noopener">קהילה</a>
        <a href="https://israelis.nl" target="_blank" rel="noopener">israelis.nl</a>
      </div>
    </div>
    <div class="te-footer-bottom">
      <p class="te-footer-copy">© <span id="year"></span> israelis.nl · הפלטפורמה של הישראלים בהולנד</p>
    </div>
  </div>
</footer>

<script>
document.getElementById("year").textContent = new Date().getFullYear();
(function(){
  const nav = document.getElementById("site-nav");
  const burger = document.getElementById("hamburger");
  const links = document.getElementById("nav-links");
  window.addEventListener("scroll", function(){ nav.classList.toggle("is-scrolled", window.scrollY > 32); }, { passive:true });
  burger.addEventListener("click", function(){
    const o = links.classList.toggle("is-open");
    burger.classList.toggle("is-open", o);
  });
  document.addEventListener("click", function(e){
    if (!nav.contains(e.target)){ links.classList.remove("is-open"); burger.classList.remove("is-open"); }
  });
})();
</script>

</body>
</html>
"""


# Page metadata: slug → (title, description, og_image, output_path)
PAGES = {
    "coaching": {
        "title": "ליווי אישי בחיפוש עבודה בהולנד · jobs.israelis.nl",
        "description": "ליווי אישי של 3 חודשים לישראלים שמחפשים את התפקיד הבא בהולנד. שיטה מבוססת חברה-מחלקה-אדם, מסמכים מקצועיים, רשת קשרים.",
        "url": "/coaching",
        "output": "coaching.html",
    },
    "advisory": {
        "title": "ייעוץ אסטרטגי · jobs.israelis.nl",
        "description": "ייעוץ אסטרטגי לבכירים, יזמים וכל מי שמחפש כיוון, פרספקטיבה ומפת דרכים. שיחות ממוקדות שמובילות להחלטה.",
        "url": "/advisory",
        "output": "advisory.html",
    },
    "library": {
        "title": "ספריית משאבים · jobs.israelis.nl",
        "description": "כל המשאבים שצריך כדי להתמצא בשוק העבודה ההולנדי — ויזות, מסים, לוחות דרושים, קהילות וכלים. נבחר ידנית.",
        "url": "/library",
        "output": "library.html",
    },
    "about": {
        "title": "על אלון · jobs.israelis.nl",
        "description": "8+ שנים של ליווי ישראלים בקריירה ההולנדית. מאמסטרדם, עם מאות שיחות, עשרות מועמדים, וכמה תובנות שכדאי לשמוע לפני שמתחילים.",
        "url": "/about",
        "output": "about.html",
    },
    "post-job": {
        "title": "פרסום משרה חינם · jobs.israelis.nl",
        "description": "מעסיקים שמחפשים ישראלים — פרסמו את המשרה שלכם חינם. הכרזה תגיע לקהילה של מאות מועמדים פעילים בהולנד.",
        "url": "/post-job",
        "output": "post-job.html",
    },
    "contact": {
        "title": "בואו נדבר · jobs.israelis.nl",
        "description": "שאלה על הליווי, על שוק העבודה, על משא ומתן או על רילוקיישן — כתבו, ואחזור אישית.",
        "url": "/contact",
        "output": "contact.html",
    },
    "index": {
        "title": "jobs.israelis.nl · הבית של הישראלים בקריירה ההולנדית",
        "description": "ליווי אישי, ייעוץ אסטרטגי, מאמרים, ספריית משאבים וכלי AI חינמיים — לישראלים שמחפשים את הצעד הבא בקריירה בהולנד.",
        "url": "/",
        "output": "index.html",
    },
    "articles": {
        "title": "מאמרים · jobs.israelis.nl",
        "description": "מאמרים מעשיים על חיפוש עבודה בהולנד — מהשטח, לא מהספרים. 8+ שנים של תובנות מליווי ישראלים.",
        "url": "/articles",
        "output": "articles.html",
    },
}


def build(slug):
    meta = PAGES[slug]
    content_path = ROOT / "_pages" / f"{slug}.html"
    if not content_path.exists():
        print(f"[skip] {slug}: no content file at {content_path}")
        return False
    content = content_path.read_text(encoding="utf-8")
    html = head(meta["title"], meta["description"], url=meta["url"]) + content + footer()
    out_path = ROOT / meta["output"]
    out_path.write_text(html, encoding="utf-8", newline="\n")
    size_kb = len(html) / 1024
    print(f"[ok]   {slug:10s} -> {meta['output']:20s} ({size_kb:.1f} KB)")
    return True


def main():
    targets = sys.argv[1:] if len(sys.argv) > 1 else list(PAGES.keys())
    built = 0
    for slug in targets:
        if slug not in PAGES:
            print(f"[err]  unknown page: {slug}")
            continue
        if build(slug):
            built += 1
    print(f"\nBuilt {built}/{len(targets)} pages.")


if __name__ == "__main__":
    main()
