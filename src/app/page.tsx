"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(el);
          }
        },
        { threshold, rootMargin: "50px" }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, [threshold]);
  return { ref, inView };
}

/* ─── Animated wrapper ─── */
function Reveal({
  children,
  show,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  show: boolean;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "fade";
}) {
  const transforms: Record<string, string> = {
    up: "translateY(30px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
    fade: "translateY(0)",
  };
  return (
    <div
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translate(0)" : transforms[direction],
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── SVG Icons ─── */
const Icons = {
  briefcase: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  book: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  compass: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  heart: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  building: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <line x1="8" y1="6" x2="8" y2="6" />
      <line x1="12" y1="6" x2="12" y2="6" />
      <line x1="16" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="8" y2="10" />
      <line x1="12" y1="10" x2="12" y2="10" />
      <line x1="16" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="8" y2="14" />
      <line x1="12" y1="14" x2="12" y2="14" />
      <line x1="16" y1="14" x2="16" y2="14" />
    </svg>
  ),
  bike: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
    </svg>
  ),
  send: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  arrow: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ transform: "scaleX(-1)" }}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

/* ─── Data ─── */
const features = [
  {
    icon: Icons.briefcase,
    title: "לוח משרות",
    description:
      "משרות מותאמות מחברות הולנדיות שמחפשות כישרונות ישראליים. הייטק, פיננסים, ייעוץ ועוד.",
    tag: "בקרוב",
  },
  {
    icon: Icons.book,
    title: "משאבי קריירה",
    description:
      "מדריכים על תרבות העבודה ההולנדית, עיצוב קו״ח, טיפים לראיונות וניווט ב-30% ruling.",
    tag: "משאבים",
  },
  {
    icon: Icons.users,
    title: "קהילה",
    description:
      "התחברו לאלפי אנשי מקצוע ישראלים שכבר משגשגים בהולנד.",
    tag: "נטוורקינג",
  },
  {
    icon: Icons.compass,
    title: "תמיכה ברילוקיישן",
    description:
      "מהנחיית ויזה ועד מציאת דיור — תמיכה מעשית למעבר שלכם להולנד.",
    tag: "הכוונה",
  },
];

const whyNL = [
  {
    icon: Icons.globe,
    title: "סביבת עבודה באנגלית",
    description:
      "הולנד היא אחת המדינות עם רמת האנגלית הגבוהה ביותר באירופה. רוב המשרות בהייטק ובתאגידים מתנהלות לחלוטין באנגלית.",
  },
  {
    icon: Icons.building,
    title: "מרכז חדשנות",
    description:
      "הבית של ASML, Booking.com, Adyen ומאות סטארטאפים. האקוסיסטם הטכנולוגי ההולנדי מתחרה בכל מקום באירופה.",
  },
  {
    icon: Icons.heart,
    title: "איכות חיים",
    description:
      "מערכת בריאות מצוינת, איזון עבודה-חיים, ואחד העמים המאושרים בעולם. מדיניות ידידותית למשפחות היא הנורמה.",
  },
  {
    icon: Icons.bike,
    title: "הטבת מס 30%",
    description:
      "מהגרים מיומנים יכולים לקבל 30% מהמשכורת פטורים ממס עד 5 שנים — הטבה כלכלית משמעותית.",
  },
];

const stats = [
  { value: "5,000+", label: "ישראלים מקצועיים בהולנד" },
  { value: "200+", label: "חברות שמגייסות" },
  { value: "92%", label: "רמת אנגלית" },
  { value: "€65K", label: "משכורת הייטק ממוצעת" },
];

/* ═══════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════ */
export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useInView(0.05);
  const featuresRef = useInView(0.05);
  const whyRef = useInView(0.05);
  const statsRef = useInView(0.05);
  const ctaRef = useInView(0.05);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ═══ NAVIGATION ═══ */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-blue-deep rounded-xl rotate-3 opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                ✡
              </div>
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-blue-deep">
                מוצאים עבודה
              </span>
              <span className="text-orange-warm font-display text-xl font-bold">
                {" "}
                בהולנד
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate hover:text-blue-deep transition-colors">
              מה אנחנו מציעים
            </a>
            <a href="#why-nl" className="text-sm font-medium text-slate hover:text-blue-deep transition-colors">
              למה הולנד
            </a>
            <a href="#signup" className="text-sm font-medium text-slate hover:text-blue-deep transition-colors">
              הישארו מעודכנים
            </a>
            <a
              href="#signup"
              className="bg-blue-deep text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-mid transition-colors shadow-md hover:shadow-lg"
            >
              הצטרפו לקהילה
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section
        ref={heroRef.ref}
        className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.07] animate-float"
            style={{
              background: "radial-gradient(circle, var(--blue-deep) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.05]"
            style={{
              background: "radial-gradient(circle, var(--orange-warm) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--blue-deep) 1px, transparent 1px), linear-gradient(90deg, var(--blue-deep) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Right in RTL: Text content */}
            <div>
              <Reveal show={heroRef.inView} delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-light border border-orange-warm/20 mb-8">
                  <span className="text-orange-warm text-sm font-semibold">
                    🇮🇱 → 🇳🇱
                  </span>
                  <span className="text-slate text-sm">
                    המרכז שלכם לקריירה בהולנד
                  </span>
                </div>
              </Reveal>

              <Reveal show={heroRef.inView} delay={100}>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight mb-6">
                  מוצאים{" "}
                  <span className="text-gradient">עבודה</span>{" "}
                  <br className="hidden md:block" />
                  <span className="text-gradient">בהולנד</span>
                </h1>
              </Reveal>

              <Reveal show={heroRef.inView} delay={200}>
                <p className="text-lg md:text-xl text-slate leading-relaxed mb-10 max-w-xl">
                  המרכז לישראלים שבונים קריירה בהולנד. משרות, משאבים,
                  קהילה — הכל במקום אחד.
                </p>
              </Reveal>

              <Reveal show={heroRef.inView} delay={300}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#signup"
                    className="inline-flex items-center justify-center gap-2 bg-blue-deep text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-blue-mid transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    קבלו גישה מוקדמת
                    {Icons.arrow}
                  </a>
                  <a
                    href="#why-nl"
                    className="inline-flex items-center justify-center gap-2 bg-white text-foreground px-8 py-4 rounded-2xl text-base font-semibold border border-cream-dark hover:border-blue-deep/30 transition-all hover:-translate-y-0.5"
                  >
                    למה דווקא הולנד?
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Left in RTL: Decorative visual */}
            <Reveal
              show={heroRef.inView}
              delay={300}
              direction="left"
              className="hidden lg:flex justify-center"
            >
              <div className="relative w-[460px] h-[460px]">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-deep/10 animate-[spin_60s_linear_infinite]" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-80 bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-between border border-cream-dark/50">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-blue-light flex items-center justify-center text-blue-deep">
                        {Icons.briefcase}
                      </div>
                      <div>
                        <div className="text-xs text-slate-light font-medium uppercase tracking-wider">
                          ההזדמנות הבאה
                        </div>
                        <div className="font-display font-bold text-lg">
                          אמסטרדם
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-cream rounded-full w-full" />
                      <div className="h-3 bg-cream rounded-full w-4/5" />
                      <div className="h-3 bg-cream rounded-full w-3/5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-deep text-white text-xs flex items-center justify-center font-bold">א</div>
                      <div className="w-8 h-8 rounded-full bg-orange-warm text-white text-xs flex items-center justify-center font-bold">י</div>
                      <div className="w-8 h-8 rounded-full bg-blue-mid text-white text-xs flex items-center justify-center font-bold">נ</div>
                    </div>
                    <span className="text-xs text-slate-light">+847 אנשי מקצוע</span>
                  </div>
                </div>

                <div className="absolute top-8 left-4 bg-white rounded-2xl shadow-lg px-4 py-3 animate-float border border-cream-dark/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    <span className="text-sm font-semibold text-foreground">142 משרות חדשות</span>
                  </div>
                </div>

                <div
                  className="absolute bottom-12 -right-4 bg-white rounded-2xl shadow-lg px-4 py-3 animate-float border border-cream-dark/30"
                  style={{ animationDelay: "2s" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇮🇱</span>
                    <span className="text-sm font-semibold text-foreground">🇳🇱 מחוברים</span>
                  </div>
                </div>

                <div className="absolute top-20 -right-8 grid grid-cols-3 gap-2 opacity-20">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-blue-deep rounded-full" />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SCROLLING MARQUEE ═══ */}
      <div className="border-y border-cream-dark bg-cream/50 py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12" dir="ltr">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-12 pr-12">
              {["אמסטרדם", "רוטרדם", "איינדהובן", "האג", "אוטרכט", "ליידן", "דלפט", "חרונינגן"].map((city) => (
                <span key={`${setIdx}-${city}`} className="text-sm font-medium text-slate-light flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-warm rounded-full" />
                  {city}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ FEATURES SECTION ═══ */}
      <section id="features" ref={featuresRef.ref} className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <Reveal show={featuresRef.inView}>
              <span className="inline-block text-sm font-semibold text-orange-warm uppercase tracking-widest mb-4">
                מה אנחנו מציעים
              </span>
            </Reveal>
            <Reveal show={featuresRef.inView} delay={100}>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
                כל מה שצריך כדי{" "}
                <span className="text-blue-deep">להתחיל קריירה</span> בהולנד
              </h2>
            </Reveal>
            <Reveal show={featuresRef.inView} delay={200}>
              <p className="text-lg text-slate leading-relaxed">
                אנחנו בונים את הפלטפורמה המקיפה ביותר לישראלים מקצועיים
                בהולנד. הנה מה שבדרך.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <Reveal key={feature.title} show={featuresRef.inView} delay={(i + 2) * 100}>
                <div className="group relative bg-white rounded-3xl p-8 border border-cream-dark/50 hover:border-blue-deep/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-light flex items-center justify-center text-blue-deep group-hover:bg-blue-deep group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-slate-light bg-cream px-3 py-1 rounded-full">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="absolute bottom-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="absolute bottom-0 left-0 w-full h-full"
                      style={{
                        background: "linear-gradient(-135deg, transparent 50%, var(--blue-light) 50%)",
                        borderRadius: "0 0 0 1.5rem",
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section ref={statsRef.ref} className="py-16 bg-blue-deep relative overflow-hidden noise-overlay">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)",
              backgroundSize: "40px 40px",
              backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} show={statsRef.inView} delay={(i + 1) * 100}>
                <div className="text-center">
                  <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2" dir="ltr">
                    {stat.value}
                  </div>
                  <div className="text-blue-200 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY NETHERLANDS ═══ */}
      <section id="why-nl" ref={whyRef.ref} className="py-24 md:py-32 bg-cream/40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <Reveal show={whyRef.inView}>
                <span className="inline-block text-sm font-semibold text-orange-warm uppercase tracking-widest mb-4">
                  למה הולנד
                </span>
              </Reveal>
              <Reveal show={whyRef.inView} delay={100}>
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  התאמה טבעית{" "}
                  <span className="text-blue-deep">לאנשי מקצוע ישראלים</span>
                </h2>
              </Reveal>
              <Reveal show={whyRef.inView} delay={200}>
                <p className="text-lg text-slate leading-relaxed mb-8">
                  הולנד מציעה שילוב ייחודי של צמיחה מקצועית, איכות חיים
                  ופתיחות תרבותית שהופכים אותה לאחד היעדים המובילים
                  לכישרונות ישראליים בעולם.
                </p>
              </Reveal>
              <Reveal show={whyRef.inView} delay={300} className="hidden lg:block">
                <div className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-cream-dark/50 shadow-sm">
                  <span className="text-4xl">🌷</span>
                  <div>
                    <div className="font-display font-bold text-lg">הידעתם?</div>
                    <p className="text-sm text-slate">
                      יחסי המסחר בין הולנד לישראל הם מהחזקים באירופה,
                      עם מעל 200 חברות ישראליות שפועלות בהולנד.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="space-y-6">
              {whyNL.map((item, i) => (
                <Reveal key={item.title} show={whyRef.inView} delay={(i + 2) * 100}>
                  <div className="bg-white rounded-3xl p-8 border border-cream-dark/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-orange-light flex items-center justify-center text-orange-warm shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-slate leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA / EMAIL SIGNUP ═══ */}
      <section id="signup" ref={ctaRef.ref} className="py-24 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, var(--blue-deep) 0%, transparent 50%), radial-gradient(circle at 80% 50%, var(--orange-warm) 0%, transparent 50%)",
          }}
        />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <Reveal show={ctaRef.inView}>
            <span className="inline-block text-sm font-semibold text-orange-warm uppercase tracking-widest mb-4">
              הישארו מעודכנים
            </span>
          </Reveal>
          <Reveal show={ctaRef.inView} delay={100}>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              היו הראשונים לדעת
            </h2>
          </Reveal>
          <Reveal show={ctaRef.inView} delay={200}>
            <p className="text-lg text-slate leading-relaxed mb-10">
              הצטרפו לקהילת אנשי המקצוע הישראלים בהולנד. קבלו עדכונים
              על משרות חדשות, אירועים ומשאבים.
            </p>
          </Reveal>

          <Reveal show={ctaRef.inView} delay={300}>
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  dir="ltr"
                  className="flex-1 px-6 py-4 rounded-2xl border border-cream-dark bg-white text-foreground placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-blue-deep/30 focus:border-blue-deep transition-all text-base text-left"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-blue-deep text-white px-8 py-4 rounded-2xl text-base font-semibold hover:bg-blue-mid transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  הצטרפו
                  {Icons.send}
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-6 max-w-lg mx-auto">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                  {Icons.check}
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-800">
                    אתם ברשימה!
                  </div>
                  <div className="text-sm text-green-600">
                    נעדכן אתכם על הזדמנויות חדשות.
                  </div>
                </div>
              </div>
            )}
          </Reveal>

          <Reveal show={ctaRef.inView} delay={400} direction="fade">
            <p className="text-sm text-slate-light mt-6">
              בלי ספאם, אף פעם. ביטול בכל עת.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-foreground text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-9 h-9">
                  <div className="absolute inset-0 bg-blue-mid rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold">✡</div>
                </div>
                <span className="font-display text-lg font-bold">מוצאים עבודה בהולנד</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
                מחברים כישרונות ישראליים עם הזדמנויות בהולנד.
                הקריירה שלכם, הקהילה שלכם, הבית החדש שלכם.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇮🇱</span>
                <span className="text-gray-500">&larr;</span>
                <span className="text-2xl">🇳🇱</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wider text-gray-400 mb-4">
                קישורים מהירים
              </h4>
              <ul className="space-y-3">
                {["לוח משרות", "משאבי קריירה", "קהילה", "אודות"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wider text-gray-400 mb-4">
                משאבים
              </h4>
              <ul className="space-y-3">
                {["מדריך הטבת 30%", "תרבות עבודה הולנדית", "דיור בהולנד", "מידע על ויזה"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} jobs.israelis.nl — חלק מקהילת{" "}
              <a href="https://israelis.nl" className="text-blue-400 hover:text-blue-300 transition-colors">
                israelis.nl
              </a>
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">פרטיות</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">תנאים</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">צרו קשר</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
