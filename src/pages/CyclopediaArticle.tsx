import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/cyclopedia-insulin-resistance.jpg";

const CyclopediaArticle = () => {
  const navigate = useNavigate();

  const sectionLabel: React.CSSProperties = {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "hsl(var(--primary))",
    fontWeight: 600,
    marginTop: 24,
    marginBottom: 10,
  };

  const bodyText: React.CSSProperties = {
    fontSize: 16,
    color: "var(--text-body)",
    lineHeight: 1.7,
  };

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col overflow-y-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {/* Back arrow */}
          <div className="px-5" style={{ marginTop: 24 }}>
            <button onClick={() => navigate("/cyclopedia")}><ArrowLeft className="h-5 w-5" style={{ color: "#6B7280" }} /></button>
          </div>

          {/* Hero image */}
          <img src={heroImg} alt="Insulin resistance illustration" style={{ width: "100%", height: 200, objectFit: "cover", marginTop: 12 }} />

          {/* Content */}
          <div className="px-5 pb-10" style={{ marginTop: 24 }}>
            <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "hsl(var(--primary))", fontWeight: 700 }}>
              HORMONES · 8 MIN READ · IR TYPE
            </p>

            <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "var(--text-ink)", lineHeight: 1.2, marginTop: 10 }}>
              What is Insulin Resistance PCOS and why does it affect everything?
            </h1>

            <div style={{ width: 48, height: 4, backgroundColor: "hsl(var(--accent))", borderRadius: 2, marginTop: 12, marginBottom: 20 }} />

            <p className="font-body" style={bodyText}>
              If you have PCOS, there's a 70% chance insulin resistance is at the root of it. Not just a contributing factor, the actual driver. Yet most women with PCOS are never told this clearly. They're given a diet sheet and sent home.
            </p>

            <p className="font-body" style={sectionLabel}>WHAT IS INSULIN RESISTANCE?</p>
            <p className="font-body" style={bodyText}>
              Insulin is the hormone that unlocks your cells to let glucose in. When cells become resistant to insulin, your pancreas produces more and more of it trying to get the job done. High insulin levels then signal your ovaries to produce more androgens, the male hormones that cause acne, hair loss, and irregular periods.
            </p>

            <p className="font-body" style={sectionLabel}>WHY IT AFFECTS EVERYTHING</p>
            <p className="font-body" style={bodyText}>
              High insulin doesn't just affect blood sugar. It affects your weight (makes fat storage easier and fat burning harder), your cycle (disrupts ovulation), your skin (drives sebum production = acne), your mood (blood sugar crashes = anxiety and irritability), and your cravings (low blood sugar = desperate need for carbohydrates and sugar). This is why fixing insulin sensitivity — not cutting calories — is the foundation of managing IR PCOS.
            </p>

            <p className="font-body" style={sectionLabel}>WHAT THE RESEARCH SAYS</p>
            <p className="font-body" style={bodyText}>
              A 2022 clinical review found that lifestyle interventions targeting insulin sensitivity — specifically protein-prioritised eating, resistance training, and sleep quality — were more effective at reducing androgen levels in PCOS than calorie restriction alone. The mechanism is direct: lower insulin → lower LH pulsatility → lower androgen production → more regular ovulation.
            </p>

            {/* Callout card */}
            <div style={{ backgroundColor: "#EAF3F3", borderRadius: 16, padding: 18, marginTop: 8, marginBottom: 8 }}>
              <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "hsl(var(--primary))", fontWeight: 700, marginBottom: 8 }}>
                WHAT THIS MEANS FOR YOU
              </p>
              <p className="font-body" style={{ fontSize: 14, color: "hsl(var(--primary))", lineHeight: 1.6 }}>
                Your plan already prioritises blood sugar stability at every meal — this is why. Every nutrition recommendation Cysta gives you is designed around keeping your insulin low and steady, which over time reduces the androgen excess driving your symptoms.
              </p>
            </div>

            <p className="font-body" style={sectionLabel}>THE DISCLAIMER</p>
            <p className="font-body italic" style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>
              This article is based on current research evidence and is written for educational purposes. It is not a substitute for medical advice. If you suspect you have insulin resistance, ask your doctor for a fasting insulin test — not just HbA1c, which can miss early insulin resistance.
            </p>

            <div className="text-center" style={{ marginTop: 24, marginBottom: 32 }}>
              <button onClick={() => navigate("/cyclopedia")} className="font-body" style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--primary))" }}>
                ← Back to Cyclopedia
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CyclopediaArticle;
