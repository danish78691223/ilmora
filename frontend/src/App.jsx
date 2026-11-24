import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  ArrowUpRight,
  CheckCircle2,
  BookOpen,
  Monitor,
  Clock3,
  Users,
  Star,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  GraduationCap,
  LogOut,
  LayoutDashboard,
  Inbox,
  FileText,
  Settings,
  Download,
  Trash2,
  Search,
  Save,
  LockKeyhole,
} from "lucide-react";
import api from "./api";

const LangCtx = createContext(null);
const useLang = () => useContext(LangCtx);
const get = (obj, lang) => obj?.[lang] ?? obj?.en ?? "";
function App() {
  const [lang, setLang] = useState(localStorage.getItem("ILMORA_lang") || "en"),
    [content, setContent] = useState(null),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    localStorage.setItem("ILMORA_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.body.classList.toggle("rtl", lang !== "en");
  }, [lang]);
  useEffect(() => {
    api
      .get("/api/content")
      .then((r) => setContent(r.data))
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, []);
  const value = useMemo(
    () => ({ lang, setLang, content, setContent, loading }),
    [lang, content, loading],
  );
  return (
    <LangCtx.Provider value={value}>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<PublicSite />} />
      </Routes>
    </LangCtx.Provider>
  );
}
function tr(o) {
  const { lang } = useLang();
  return get(o, lang);
}
function PublicSite() {
  const { content: c, lang, setLang } = useLang();
  const [menu, setMenu] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    const f = (e) => setLang(e.detail);
    window.addEventListener("ILMORA-language", f);
    return () => window.removeEventListener("ILMORA-language", f);
  }, [setLang]);
  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
  }, [loc.pathname]);
  if (!c)
    return (
      <div className="loading">
        ILMORA <span>Loading learning possibilities…</span>
      </div>
    );
  const s = c.settings,
    nav = c.nav;
  return (
    <>
      <header className="navbar">
        <div className="nav-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">I</span>
            {tr(s.brand)}
          </Link>
          <button
            className="mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
          <nav className={menu ? "nav-links open" : "nav-links"}>
            <NavLink to="/" end>
              {tr(nav.home)}
            </NavLink>
            <NavLink to="/about">{tr(nav.about)}</NavLink>
            <NavLink to="/contact">{tr(nav.contact)}</NavLink>
            <div className="lang-switch" aria-label="Choose language">
              <Globe size={16} />
              {["en", "ur", "ar"].map((x) => (
                <button
                  key={x}
                  className={lang === x ? "selected" : ""}
                  onClick={() => useLangSafe(x)}
                >
                  {x === "en" ? "EN" : x === "ur" ? "اردو" : "العربية"}
                </button>
              ))}
            </div>
            <Link className="btn btn-gold nav-apply" to="/contact">
              {tr(nav.apply)} <ArrowUpRight size={16} />
            </Link>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
  function useLangSafe(x) {
    /* language setter is obtained from context in the component below */ window.dispatchEvent(
      new CustomEvent("ILMORA-language", { detail: x }),
    );
  }
}
function Home() {
  const { content: c } = useLang();
  const h = c.home;
  const [faq, setFaq] = useState(0),
    [slide, setSlide] = useState(0);
  return (
    <>
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <span /> {tr(h.hero.eyebrow)}
          </div>
          <h1>{tr(h.hero.title)}</h1>
          <p className="lead">{tr(h.hero.subtitle)}</p>
          <div className="hero-actions">
            <Link className="btn btn-gold" to="/contact">
              {tr(h.hero.primary)} <ArrowUpRight size={17} />
            </Link>
            <Link className="btn btn-outline" to="/about">
              {tr(h.hero.secondary)}
            </Link>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack">
              <i>A</i>
              <i>ع</i>
              <i>ا</i>
            </div>
            <span>Thoughtful teaching. Real progress.</span>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-glow" />
          <div className="art-card main-art">
            <div className="art-top">
              <span>ILMORA / ACADEMY</span>
              <span className="live-dot">● LIVE</span>
            </div>
            <div className="art-globe">文</div>
            <h3>Words connect worlds.</h3>
            <p>English · اردو · العربية</p>
            <div className="art-progress">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="floating-note note-one">
            <BookOpen />
            <div>
              <b>Learn with purpose</b>
              <small>Personalised lessons</small>
            </div>
          </div>
          <div className="floating-note note-two">
            <div className="round-icon">
              <GraduationCap />
            </div>
            <div>
              <b>Expert guidance</b>
              <small>Every step of the way</small>
            </div>
          </div>
        </div>
      </section>
      <section className="section-wrap section-pad">
        <div className="section-heading">
          <span className="eyebrow">OUR PROGRAMMES</span>
          <h2>Languages that open doors.</h2>
          <p>
            Build practical skills and cultural understanding, one lesson at a
            time.
          </p>
        </div>
        <div className="language-grid">
          {h.languages.map((x, i) => (
            <article className="language-card" key={i}>
              <div className={"language-icon icon-" + i}>{x.icon}</div>
              <span className="card-kicker">0{i + 1} / LANGUAGE</span>
              <h3>{tr(x.name)}</h3>
              <p>{tr(x.desc)}</p>
              <Link to="/contact" className="text-link">
                Explore course <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="why-section section-pad">
        <div className="section-wrap why-layout">
          <div>
            <span className="eyebrow">THE ILMORA DIFFERENCE</span>
            <h2>{tr(h.why.title)}</h2>
            <p className="muted">
              A supportive learning experience designed around your goals,
              schedule and pace.
            </p>
            <div className="why-list">
              {h.why.items.map((x, i) => (
                <div key={i}>
                  <CheckCircle2 />
                  <span>{tr(x)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="why-visual">
            <div className="why-big">
              01<span> / 05</span>
            </div>
            <div className="why-quote">
              “Confidence grows when learning feels personal.”
            </div>
            <div className="why-bottom">
              <span>ILMORA TEACHING METHOD</span>
              <GraduationCap size={28} />
            </div>
          </div>
        </div>
      </section>
      <section className="section-wrap section-pad">
        <div className="section-heading">
          <span className="eyebrow">SIMPLE BY DESIGN</span>
          <h2>{tr(h.steps.title)}</h2>
          <p>
            From your first enquiry to your first class, we make getting started
            simple.
          </p>
        </div>
        <div className="steps-grid">
          {h.steps.items.map((x, i) => (
            <div className="step" key={i}>
              <div className="step-no">0{i + 1}</div>
              <div className="step-line" />
              <h3>{tr(x)}</h3>
              <p>
                {
                  [
                    "Share your details through our short application form.",
                    "Our team reviews your application and prepares access.",
                    "Use your secure credentials to enter your learning space.",
                    "Meet your teacher and begin your structured lessons.",
                  ][i]
                }
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="teachers-section section-pad">
        <div className="section-wrap">
          <div className="section-heading">
            <span className="eyebrow">MEET YOUR GUIDES</span>
            <h2>Learn from people who care.</h2>
            <p>Experienced educators who make every lesson count.</p>
          </div>
          <div className="teacher-grid">
            {h.teachers.map((x, i) => (
              <article className="teacher-card" key={i}>
                <div className="teacher-photo">
                  {x.photo ? (
                    <img src={x.photo} alt={tr(x.name)} />
                  ) : (
                    <div className="teacher-placeholder">
                      {tr(x.name).slice(0, 1)}
                    </div>
                  )}
                  <span>ILMORA EDUCATOR</span>
                </div>
                <div className="teacher-info">
                  <h3>{tr(x.name)}</h3>
                  <p>{tr(x.qualification)}</p>
                  <small>{tr(x.experience)}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="stats-band">
        <div className="section-wrap stats-grid">
          {h.stats.map((x, i) => (
            <div key={i}>
              <strong>{x.value}</strong>
              <span>{tr(x.label)}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section-wrap section-pad">
        <div className="section-heading">
          <span className="eyebrow">LEARNER STORIES</span>
          <h2>Progress worth sharing.</h2>
        </div>
        <div className="testimonial-wrap">
          <button
            className="slider-arrow"
            onClick={() => setSlide((slide + 1) % h.testimonials.length)}
            aria-label="Next testimonial"
          >
            ‹
          </button>
          <div className="testimonial">
            <div className="stars">★★★★★</div>
            <blockquote>“{tr(h.testimonials[slide]?.quote)}”</blockquote>
            <b>{tr(h.testimonials[slide]?.name)}</b>
            <small>ILMORA LEARNER</small>
          </div>
          <button
            className="slider-arrow"
            onClick={() =>
              setSlide(
                (slide + h.testimonials.length - 1) % h.testimonials.length,
              )
            }
            aria-label="Previous testimonial"
          >
            ›
          </button>
        </div>
      </section>
      <section className="faq-section section-pad">
        <div className="section-wrap faq-layout">
          <div>
            <span className="eyebrow">GOOD TO KNOW</span>
            <h2>Questions, answered.</h2>
            <p className="muted">
              Need more information? Our team is happy to help.
            </p>
            <Link to="/contact" className="text-link">
              Talk to our team <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="faq-list">
            {h.faqs.map((x, i) => (
              <div className="faq-item" key={i}>
                <button onClick={() => setFaq(faq === i ? -1 : i)}>
                  <span>{tr(x.q)}</span>
                  <ChevronDown className={faq === i ? "rotated" : ""} />
                </button>
                {faq === i && <p>{tr(x.a)}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-wrap">
        <div className="cta-banner">
          <div>
            <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
            <h2>{tr(h.cta.title)}</h2>
            <p>{tr(h.cta.text)}</p>
          </div>
          <Link to="/contact" className="btn btn-gold">
            {tr(c.nav.apply)} <ArrowUpRight />
          </Link>
        </div>
      </section>
    </>
  );
}
function About() {
  const { content: c } = useLang(),
    a = c.about;
  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">THE STORY BEHIND ILMORA</span>
        <h1>{tr(a.title)}</h1>
        <p>{tr(a.story)}</p>
      </section>
      <section className="section-wrap section-pad about-grid">
        <div className="about-feature">
          <span className="eyebrow">OUR PURPOSE</span>
          <h2>Language is more than words.</h2>
          <p>
            It is confidence, connection and the freedom to take part in a wider
            world.
          </p>
        </div>
        <div className="about-copy">
          <h3>Our mission</h3>
          <p>{tr(a.mission)}</p>
          <h3>Our vision</h3>
          <p>{tr(a.vision)}</p>
          <h3>Our teaching methodology</h3>
          <p>{tr(a.method)}</p>
          <h3>Online learning, made accessible</h3>
          <p>{tr(a.lms)}</p>
          <Link className="btn btn-gold" to="/contact">
            {tr(c.nav.apply)} <ArrowUpRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
function Contact() {
  const { content: c } = useLang();
  const [form, setForm] = useState({
      name: "",
      email: "",
      phone: "",
      country: "",
      course: "English",
      level: "Beginner",
      message: "",
      website: "",
    }),
    [state, setState] = useState("idle");
  const nav = useNavigate();
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setState("sending");
    try {
      await api.put("/api/contact", form);
      setState("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        country: "",
        course: "English",
        level: "Beginner",
        message: "",
        website: "",
      });
    } catch (err) {
      setState(err.response?.data?.message || "error");
    }
  };
  return (
    <main>
      <section className="page-hero contact-hero">
        <span className="eyebrow">LET’S GET YOU STARTED</span>
        <h1>{tr(c.contact.title)}</h1>
        <p>{tr(c.contact.subtitle)}</p>
      </section>
      <section className="section-wrap contact-layout" id="application">
        <div className="contact-card">
          <h2>Book Free Class</h2>
          <p className="muted">All fields marked * are required.</p>
          {state === "success" && (
            <div className="alert success">
              <CheckCircle2 />
              {tr(c.contact.success)}
            </div>
          )}
          {state !== "idle" && state !== "success" && state !== "sending" && (
            <div className="alert error">
              {state === "error" ? tr(c.contact.error) : state}
            </div>
          )}
          <form onSubmit={submit}>
            <div className="honeypot">
              <label>
                Website
                <input
                  name="website"
                  value={form.website}
                  onChange={update}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </label>
            </div>
            <div className="form-grid">
              <label>
                Full name *
                <input
                  required
                  minLength="2"
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Your full name"
                />
              </label>
              <label>
                Email address *
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Phone / WhatsApp *
                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  placeholder="+ country code"
                />
              </label>
              <label>
                Country *
                <input
                  required
                  name="country"
                  value={form.country}
                  onChange={update}
                  placeholder="Your country"
                />
              </label>
              <label>
                Preferred course *
                <select name="course" value={form.course} onChange={update}>
                  <option>English</option>
                  <option>Urdu</option>
                  <option>Arabic</option>
                </select>
              </label>
              <label>
                Current level *
                <select name="level" value={form.level} onChange={update}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>
            </div>
            <label>
              Message
              <textarea
                name="message"
                rows="4"
                maxLength="2000"
                value={form.message}
                onChange={update}
                placeholder="Tell us about your learning goals…"
              />
            </label>
            <button
              disabled={state === "sending"}
              className="btn btn-primary submit-btn"
            >
              {state === "sending" ? "Submitting…" : "Submit application"}{" "}
              <ArrowUpRight />
            </button>
            <p className="form-note">
              <LockKeyhole size={14} />
              {tr(c.contact.note)}
            </p>
          </form>
        </div>
        <aside className="contact-aside">
          <span className="eyebrow">WE’RE HERE TO HELP</span>
          <h2>Let’s talk about your goals.</h2>
          <div className="contact-detail">
            <Mail />
            <div>
              <small>EMAIL</small>
              <a href={`mailto:${c.settings.email}`}>{c.settings.email}</a>
            </div>
          </div>
          <div className="contact-detail">
            <Phone />
            <div>
              <small>PHONE / WHATSAPP</small>
              <a href={`tel:${c.settings.phone}`}>{c.settings.phone}</a>
            </div>
          </div>
          <div className="contact-detail">
            <MapPin />
            <div>
              <small>LOCATION</small>
              <p>{tr(c.settings.address)}</p>
            </div>
          </div>
          <div className="contact-detail">
            <Clock3 />
            <div>
              <small>WORKING HOURS</small>
              <p>{tr(c.settings.hours)}</p>
            </div>
          </div>
          <div className="map-placeholder">
            <MapPin size={26} />
            <span>ILMORA · ONLINE LEARNING</span>
            <small>Learn with us from anywhere</small>
          </div>
        </aside>
      </section>
    </main>
  );
}
function Footer() {
  const { content: c } = useLang();
  return (
    <footer className="footer">
      <div className="section-wrap footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark">L</span>
            {tr(c.settings.brand)}
          </Link>
          <p>
            {tr(c.settings.tagline)} Learn with expert teachers, from wherever
            life takes you.
          </p>
          <div className="socials">
            {[
              ["instagram", Instagram],
              ["facebook", Facebook],
              ["youtube", Youtube],
              ["linkedin", Linkedin],
            ].map(
              ([k, I]) =>
                c.settings.socials?.[k] && (
                  <a key={k} href={c.settings.socials[k]} aria-label={k}>
                    <I size={17} />
                  </a>
                ),
            )}
          </div>
        </div>
        <div>
          <h4>EXPLORE</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About ILMORA</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/contact">Apply now</Link>
        </div>
        <div>
          <h4>OUR COURSES</h4>
          {["English", "Urdu", "Arabic"].map((x) => (
            <Link to="/contact" key={x}>
              {x}
            </Link>
          ))}
          <a href={c.settings.lmsUrl} target="_blank" rel="noreferrer">
            LMS Login ↗
          </a>
        </div>
        <div>
          <h4>CONTACT</h4>
          <a href={`mailto:${c.settings.email}`}>{c.settings.email}</a>
          <a href={`tel:${c.settings.phone}`}>{c.settings.phone}</a>
          <p>{tr(c.settings.address)}</p>
          <Link className="admin-link" to="/admin/login">
            Admin Login
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="section-wrap">
          <span>
            © {new Date().getFullYear()} {tr(c.settings.brand)}. All rights
            reserved.
          </span>
          <div>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
function Admin() {
  const [me, setMe] = useState(null),
    [checking, setChecking] = useState(true);
  const loc = useLocation();
  useEffect(() => {
    api
      .get("/api/admin/me")
      .then((r) => setMe(r.data))
      .catch(() => setMe(null))
      .finally(() => setChecking(false));
  }, [loc.pathname]);
  if (checking) return <div className="loading">Checking secure session…</div>;
  if (!me && !loc.pathname.endsWith("/login")) return <AdminLogin />;
  if (loc.pathname.endsWith("/login"))
    return me ? <AdminShell me={me} /> : <AdminLogin />;
  return <AdminShell me={me} />;
}
function AdminLogin() {
  const [username, setU] = useState(""),
    [password, setP] = useState(""),
    [err, setErr] = useState(""),
    [busy, setBusy] = useState(false),
    nav = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await api.post("/api/admin/login", { username, password });
      nav("/admin");
    } catch (x) {
      setErr(x.response?.data?.message || "Unable to sign in");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="login-screen">
      <div className="login-panel">
        <Link to="/" className="brand">
          <span className="brand-mark">L</span>ILMORA
        </Link>
        <span className="eyebrow">SECURE CONTENT MANAGEMENT</span>
        <h1>Welcome back.</h1>
        <p>Sign in to manage your institute website.</p>
        {err && <div className="alert error">{err}</div>}
        <form onSubmit={login}>
          <label>
            Username
            <input
              required
              value={username}
              onChange={(e) => setU(e.target.value)}
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setP(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          <button className="btn btn-primary" disabled={busy}>
            {busy ? "Signing in…" : "Sign in securely"} <ArrowUpRight />
          </button>
        </form>
        <Link to="/" className="back-link">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
function AdminShell({ me }) {
  const [tab, setTab] = useState("dashboard"),
    [dash, setDash] = useState(null),
    [subs, setSubs] = useState({ items: [], total: 0, page: 1, pages: 1 }),
    [search, setSearch] = useState(""),
    [status, setStatus] = useState(""),
    [course, setCourse] = useState(""),
    [content, setContent] = useState(null),
    [contentText, setContentText] = useState(""),
    [msg, setMsg] = useState("");
  const nav = useNavigate();
  const loadDash = () =>
    api.get("/api/admin/dashboard").then((r) => setDash(r.data));
  const loadSubs = (page = 1) =>
    api
      .get("/api/admin/submissions", {
        params: { page, search, status, course },
      })
      .then((r) => setSubs(r.data));
  useEffect(() => {
    loadDash();
    loadSubs();
    api.get("/api/content").then((r) => {
      setContent(r.data);
      setContentText(JSON.stringify(r.data, null, 2));
    });
  }, []);
  useEffect(() => {
    if (tab === "submissions") loadSubs(1);
  }, [tab, status, course]);
  const logout = async () => {
    await api.post("/api/admin/logout");
    nav("/admin/login");
  };
  const setSubmission = async (id, v) => {
    await api.patch("/api/admin/submissions/" + id, { status: v });
    loadSubs(subs.page);
    loadDash();
  };
  const remove = async (id) => {
    if (confirm("Delete this submission permanently?")) {
      await api.delete("/api/admin/submissions/" + id);
      loadSubs(subs.page);
      loadDash();
    }
  };
  const save = async () => {
    try {
      await api.put("/api/admin/content", content);
      setMsg("Website content saved successfully.");
      setTimeout(() => setMsg(""), 3000);
    } catch (e) {
      setMsg(e.response?.data?.message || "Save failed");
    }
  };
  const exportCsv = async () => {
    const r = await api.get("/api/admin/export.csv", { responseType: "blob" });
    const url = URL.createObjectURL(r.data),
      a = document.createElement("a");
    a.href = url;
    a.download = "ILMORA-submissions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  const editJson = (e) => {
    setContentText(e.target.value);
    try {
      setContent(JSON.parse(e.target.value));
      setMsg("JSON is valid — save to publish.");
    } catch {
      setMsg("JSON has a syntax error. Correct it before saving.");
    }
  };
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link to="/" className="brand">
          <span className="brand-mark">L</span>ILMORA <small>CMS</small>
        </Link>
        <div className="admin-user">
          <div className="admin-avatar">
            {me.username.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <b>{me.username}</b>
            <small>{me.role}</small>
          </div>
        </div>
        <span className="side-label">WORKSPACE</span>
        {[
          ["dashboard", LayoutDashboard, "Dashboard"],
          ["submissions", Inbox, "Applications"],
          ["content", FileText, "Website content"],
          ["settings", Settings, "Account settings"],
        ].map(([id, I, label]) => (
          <button
            key={id}
            className={tab === id ? "side-active" : ""}
            onClick={() => setTab(id)}
          >
            <I size={18} />
            {label}
          </button>
        ))}
        <div className="sidebar-bottom">
          <button onClick={logout}>
            <LogOut size={18} />
            Sign out
          </button>
          <Link to="/">← View website</Link>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-top">
          <div>
            <span className="eyebrow">ILMORA / ADMINISTRATION</span>
            <h1>
              {
                {
                  dashboard: "Dashboard",
                  submissions: "Applications",
                  content: "Website content",
                  settings: "Account settings",
                }[tab]
              }
            </h1>
          </div>
          <span className="admin-live">
            <i /> Admin session active
          </span>
        </div>
        {tab === "dashboard" && (
          <>
            <div className="admin-stats">
              {[
                ["Total applications", dash?.total ?? "—"],
                ["New / unread", dash?.fresh ?? "—"],
                ["Contacted", dash?.contacted ?? "—"],
                ["Registered", dash?.registered ?? "—"],
              ].map(([a, b]) => (
                <div className="admin-stat" key={a}>
                  <span>{a}</span>
                  <strong>{b}</strong>
                </div>
              ))}
            </div>
            <div className="admin-box">
              <div className="box-heading">
                <div>
                  <h2>Recent applications</h2>
                  <p>Latest enquiries from prospective learners.</p>
                </div>
                <button
                  className="btn btn-light"
                  onClick={() => setTab("submissions")}
                >
                  View all <ArrowUpRight />
                </button>
              </div>
              <SubmissionTable
                items={subs.items.slice(0, 5)}
                setSubmission={setSubmission}
                remove={remove}
              />
            </div>
          </>
        )}
        {tab === "submissions" && (
          <div className="admin-box">
            <div className="box-heading">
              <div>
                <h2>All applications</h2>
                <p>{subs.total} total submissions</p>
              </div>
              <button className="btn btn-light" onClick={exportCsv}>
                <Download /> Export CSV
              </button>
            </div>
            <div className="filters">
              <div className="search-field">
                <Search />
                <input
                  placeholder="Search name, email, phone…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && loadSubs(1)}
                />
              </div>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="">All courses</option>
                <option>English</option>
                <option>Urdu</option>
                <option>Arabic</option>
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All statuses</option>
                {["New", "Read", "Contacted", "Registered"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <button className="btn btn-light" onClick={() => loadSubs(1)}>
                Search
              </button>
            </div>
            <SubmissionTable
              items={subs.items}
              setSubmission={setSubmission}
              remove={remove}
            />
            <div className="pagination">
              <span>
                Page {subs.page} of {Math.max(1, subs.pages)}
              </span>
              <div>
                <button
                  disabled={subs.page <= 1}
                  onClick={() => loadSubs(subs.page - 1)}
                >
                  Previous
                </button>
                <button
                  disabled={subs.page >= subs.pages}
                  onClick={() => loadSubs(subs.page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
        {tab === "content" && (
          <div className="admin-box">
            <div className="box-heading">
              <div>
                <h2>Multilingual content studio</h2>
                <p>
                  Edit every public website section and all EN / UR / AR copy.
                  Changes publish instantly after saving.
                </p>
              </div>
              <button className="btn btn-primary" onClick={save}>
                <Save /> Save & publish
              </button>
            </div>
            {msg && <div className="alert success">{msg}</div>}
            <div className="content-help">
              <b>How to edit:</b> This structured editor exposes the complete
              site content. Keep the existing JSON shape and edit each{" "}
              <code>en</code>, <code>ur</code> and <code>ar</code> value. Arrays
              control teachers, courses/language cards, testimonials, FAQs and
              statistics. Site colours, contact details and LMS URL are under{" "}
              <code>settings</code>.
            </div>
            <textarea
              className="json-editor"
              spellCheck="false"
              value={contentText}
              onChange={editJson}
            />
            <div className="editor-actions">
              <button className="btn btn-primary" onClick={save}>
                <Save /> Save changes
              </button>
              <span>Changes are visible on the public site after save.</span>
            </div>
          </div>
        )}
        {tab === "settings" && <PasswordSettings />}
      </main>
    </div>
  );
}
function SubmissionTable({ items, setSubmission, remove }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Course / level</th>
            <th>Received</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((x) => (
            <tr key={x._id}>
              <td>
                <b>{x.name}</b>
                <small>
                  {x.email} · {x.phone}
                </small>
              </td>
              <td>
                {x.course}
                <small>
                  {x.level} · {x.country}
                </small>
              </td>
              <td>{new Date(x.createdAt).toLocaleDateString()}</td>
              <td>
                <span className={"status status-" + x.status.toLowerCase()}>
                  {x.status}
                </span>
              </td>
              <td>
                <div className="row-actions">
                  <select
                    aria-label="Update application status"
                    value={x.status}
                    onChange={(e) => setSubmission(x._id, e.target.value)}
                  >
                    {["New", "Read", "Contacted", "Registered"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <button title="Delete" onClick={() => remove(x._id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!items.length && (
        <div className="empty-state">No applications found.</div>
      )}
    </div>
  );
}
function PasswordSettings() {
  const [old, setOld] = useState(""),
    [next, setNext] = useState(""),
    [msg, setMsg] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/admin/change-password", {
        currentPassword: old,
        newPassword: next,
      });
      setMsg("Password updated successfully.");
      setOld("");
      setNext("");
    } catch (x) {
      setMsg(x.response?.data?.message || "Could not update password");
    }
  };
  return (
    <div className="admin-box password-box">
      <h2>Change administrator password</h2>
      <p>Use a unique password with at least 12 characters.</p>
      {msg && <div className="alert success">{msg}</div>}
      <form onSubmit={submit}>
        <label>
          Current password
          <input
            type="password"
            required
            value={old}
            onChange={(e) => setOld(e.target.value)}
          />
        </label>
        <label>
          New password
          <input
            type="password"
            minLength="12"
            required
            value={next}
            onChange={(e) => setNext(e.target.value)}
          />
        </label>
        <button className="btn btn-primary">
          Update password <ArrowUpRight />
        </button>
      </form>
    </div>
  );
}
export default App;
