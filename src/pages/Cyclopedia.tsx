import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";
import featuredImg from "@/assets/cyclopedia-featured.jpg";

const categories = ["All", "Hormones", "Nutrition", "Movement", "Cycle Phases", "Symptoms", "Tests & Diagnosis", "Mindset"];

interface Article {
  title: string;
  meta: string;
  route?: string;
  category: string;
  section: string;
}

const articles: Article[] = [
  { title: "Why Progesterone Drops in Luteal Phase and What Happens to Your Body", meta: "5 min read · Luteal Phase · IR type", route: "/cyclopedia/progesterone-luteal", category: "Hormones", section: "HORMONES & YOUR CYCLE" },
  { title: "Magnesium and PCOS: The Missing Link Nobody Talks About", meta: "6 min read · All types", category: "Hormones", section: "HORMONES & YOUR CYCLE" },
  { title: "Oestrogen Dominance: What It Is and Whether You Have It", meta: "7 min read · IR + IN types", category: "Hormones", section: "HORMONES & YOUR CYCLE" },
  { title: "Blood Sugar Basics: Why Every Meal Matters for PCOS", meta: "5 min read · IR type", category: "Nutrition", section: "NUTRITION" },
  { title: "Anti-Inflammatory Eating for PCOS: Where to Start", meta: "6 min read · IN type", category: "Nutrition", section: "NUTRITION" },
  { title: "Seed Cycling: The Evidence, the Hype, and What Actually Works", meta: "8 min read · All types", category: "Nutrition", section: "NUTRITION" },
  { title: "Why PCOS Causes Hair Loss and What You Can Do", meta: "6 min read · AD + IR types", category: "Symptoms", section: "SYMPTOMS EXPLAINED" },
  { title: "Acne and PCOS: The Androgen Connection Explained", meta: "5 min read · AD type", category: "Symptoms", section: "SYMPTOMS EXPLAINED" },
  { title: "Brain Fog with PCOS: Is It Real? (Yes. Here's Why.)", meta: "7 min read · All types", category: "Symptoms", section: "SYMPTOMS EXPLAINED" },
  { title: "What Blood Tests to Ask For and What the Numbers Mean", meta: "8 min read · All types", category: "Tests & Diagnosis", section: "TESTS & DIAGNOSIS" },
  { title: "The Rotterdam Criteria: What Doctors Use to Diagnose PCOS", meta: "6 min read · All types", category: "Tests & Diagnosis", section: "TESTS & DIAGNOSIS" },
];

const Cyclopedia = () => {
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) => {
    const matchesCat = selectedCat === "All" || a.category === selectedCat;
    const matchesSearch = !search || a.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const sections = [...new Set(filtered.map((a) => a.section))];

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-10 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Header */}
          <div className="flex items-center justify-between" style={{ marginTop: 24 }}>
            <button onClick={() => navigate("/home")}><ArrowLeft className="h-5 w-5" style={{ color: "#6B7280" }} /></button>
            <h1 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: "var(--text-ink)" }}>Cyclopedia</h1>
            <div style={{ width: 20 }} />
          </div>
          <p className="text-center font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.8, color: "hsl(var(--primary))", fontWeight: 700, marginTop: 4 }}>
            PCOS SCIENCE, PLAIN AND SIMPLE
          </p>
          <div className="mx-auto" style={{ width: 48, height: 4, backgroundColor: "hsl(var(--accent))", borderRadius: 2, marginTop: 12 }} />
          <p className="text-center font-body" style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6, marginTop: 14, marginBottom: 24 }}>
            Everything you were never told about your body, explained clearly, backed by research, personalised to your pattern.
          </p>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: "#6B7280" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Cyclopedia..."
              className="w-full bg-card font-body"
              style={{ height: 48, borderRadius: 24, border: "1.5px solid hsl(var(--border))", paddingLeft: 44, paddingRight: 16, fontSize: 15, color: "var(--text-ink)", boxShadow: "var(--shadow-card)", outline: "none" }}
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-[10px] overflow-x-auto no-scrollbar" style={{ marginTop: 16, paddingBottom: 4 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className="flex-shrink-0 font-body"
                style={{
                  padding: "8px 16px",
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  backgroundColor: selectedCat === cat ? "hsl(var(--primary))" : "white",
                  color: selectedCat === cat ? "white" : "var(--text-muted)",
                  border: selectedCat === cat ? "none" : "1.5px solid hsl(var(--border))",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured article */}
          {(selectedCat === "All" || selectedCat === "Hormones") && !search && (
            <button
              onClick={() => navigate("/cyclopedia/insulin-resistance")}
              className="w-full bg-card text-left"
              style={{ borderRadius: 20, boxShadow: "var(--shadow-hero)", marginTop: 20, overflow: "hidden" }}
            >
              <img src={featuredImg} alt="Insulin resistance illustration" style={{ width: "100%", height: 160, objectFit: "cover" }} />
              <div style={{ padding: 20 }}>
                <p className="font-body" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "hsl(var(--accent))", fontWeight: 700, marginBottom: 8 }}>FEATURED</p>
                <p className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.3 }}>
                  What is Insulin Resistance PCOS and why does it affect everything?
                </p>
                <p className="font-body" style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>8 min read</p>
              </div>
            </button>
          )}

          {/* Article sections */}
          {sections.map((section) => (
            <div key={section}>
              <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.8, color: "hsl(var(--primary))", fontWeight: 700, marginTop: 24, marginBottom: 12 }}>
                {section}
              </p>
              {filtered
                .filter((a) => a.section === section)
                .map((article) => (
                  <button
                    key={article.title}
                    onClick={() => article.route && navigate(article.route)}
                    className="w-full bg-card text-left"
                    style={{ borderRadius: 16, padding: 18, boxShadow: "var(--shadow-card)", marginBottom: 10 }}
                  >
                    <p className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--text-ink)", lineHeight: 1.35 }}>{article.title}</p>
                    <p className="font-body" style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{article.meta}</p>
                  </button>
                ))}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center font-body" style={{ fontSize: 15, color: "var(--text-muted)", marginTop: 40 }}>No articles found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cyclopedia;
