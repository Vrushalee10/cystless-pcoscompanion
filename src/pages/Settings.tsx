import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuiz } from "@/context/QuizContext";
import { useUserProfile } from "@/hooks/useUserProfile";

const goalLabels: Record<string, string> = {
  symptoms: "Manage my symptoms day to day",
  cycle: "Regulate my cycle",
  fertility: "Improve my fertility",
  weight: "Lose weight sustainably",
  understand: "Understand my body better",
  feel_better: "I just want to feel better",
  new_diagnosis: "Just diagnosed, don't know where to start",
};

const SectionLabel = ({ children, mt = 28 }: { children: string; mt?: number }) => (
  <p
    className="font-body"
    style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.8, color: "hsl(var(--primary))", fontWeight: 700, marginTop: mt, marginBottom: 12 }}
  >
    {children}
  </p>
);

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div className="bg-card" style={{ borderRadius: 16, padding: 18, boxShadow: "var(--shadow-card)", ...style }}>
    {children}
  </div>
);

const SettingsRow = ({ label, right, onClick, danger }: { label: string; right?: string; onClick?: () => void; danger?: boolean }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between py-3">
    <span className="font-body" style={{ fontSize: 15, fontWeight: 500, color: danger ? "#D4614F" : "var(--text-ink)" }}>{label}</span>
    {right && <span className="font-body" style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--primary))" }}>{right}</span>}
  </button>
);

const Divider = () => <div style={{ height: 1, backgroundColor: "#E2DDD7" }} />;

const ToggleRow = ({ label, sub, on, onToggle }: { label: string; sub?: string; on: boolean; onToggle: () => void }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex-1 pr-4">
      <span className="font-body" style={{ fontSize: 15, fontWeight: 500, color: "var(--text-ink)" }}>{label}</span>
      {sub && <p className="font-body" style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{sub}</p>}
    </div>
    <button
      onClick={onToggle}
      className="flex-shrink-0 relative"
      style={{
        width: 48,
        height: 28,
        borderRadius: 14,
        backgroundColor: on ? "hsl(var(--primary))" : "#D1D5DB",
        transition: "background-color 0.2s",
      }}
    >
      <span
        className="block absolute top-[2px] bg-white rounded-full"
        style={{
          width: 24,
          height: 24,
          left: on ? 22 : 2,
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  const { userGoal } = useQuiz();
  const userProfile = useUserProfile();

  const [age, setAge] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [weight, setWeight] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [height, setHeight] = useState("");
  const [healthSaved, setHealthSaved] = useState(false);

  const [notifs, setNotifs] = useState({
    phaseChange: true,
    patternInsights: true,
    dailyLog: true,
    planReminders: true,
    weeklySummary: true,
    monthlyReview: true,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);

  const toggleNotif = (key: keyof typeof notifs) => setNotifs((p) => ({ ...p, [key]: !p[key] }));

  const handleSaveHealth = () => {
    setHealthSaved(true);
    setTimeout(() => setHealthSaved(false), 2000);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  const handleDeleteAccount = async () => {
    toast.error("Account deletion requested. Contact support to complete.");
    setShowDeleteModal(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 52,
    borderRadius: 14,
    border: "1.5px solid #E2DDD7",
    padding: "0 16px",
    fontSize: 15,
    fontFamily: "var(--font-body)",
    color: "#111111",
    backgroundColor: "white",
    outline: "none",
  };

  const pillStyle = (active: boolean): React.CSSProperties => ({
    padding: "8px 18px",
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "var(--font-body)",
    backgroundColor: active ? "hsl(var(--primary))" : "white",
    color: active ? "white" : "var(--text-ink)",
    border: active ? "none" : "1.5px solid #E2DDD7",
    cursor: "pointer",
  });

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5 pb-10 overflow-y-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="flex items-center justify-between" style={{ marginTop: 24 }}>
            <button onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5" style={{ color: "#6B7280" }} /></button>
            <h1 className="font-display" style={{ fontSize: 28, fontWeight: 800, color: "#111111" }}>Settings</h1>
            <div style={{ width: 20 }} />
          </div>

          {/* Profile card */}
          <Card style={{ marginTop: 24, padding: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              className="flex items-center justify-center font-display"
              style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "hsl(var(--primary))", color: "white", fontSize: 24, fontWeight: 700 }}
            >
              {userProfile.initial}
            </div>
            <p className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#111111", marginTop: 12 }}>{userProfile.fullName || userProfile.firstName}</p>
            <p className="font-body" style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{userProfile.email || "—"}</p>
            <button onClick={() => navigate("/settings/profile")} className="font-body" style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--primary))", marginTop: 8 }}>
              Edit profile →
            </button>
          </Card>

          {/* MY PCOS PROFILE */}
          <SectionLabel>MY PCOS PROFILE</SectionLabel>

          <Card style={{ marginBottom: 10 }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "#111111" }}>My PCOS Pattern</p>
                <p className="font-body" style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>Insulin Resistance · Adrenal (secondary)</p>
              </div>
              <button onClick={() => navigate("/quiz/1")} className="font-body flex-shrink-0" style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--primary))" }}>Retake quiz →</button>
            </div>
          </Card>

          <Card style={{ marginBottom: 10 }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "#111111" }}>My Goal</p>
                <p className="font-body" style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>{goalLabels[userGoal || "symptoms"] || "Not set"}</p>
              </div>
              <button onClick={() => navigate("/goals/update")} className="font-body flex-shrink-0" style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--primary))" }}>Change →</button>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-body" style={{ fontSize: 15, fontWeight: 600, color: "#111111" }}>Cycle Tracking</p>
                <p className="font-body" style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>Last period: Not set</p>
              </div>
              <button onClick={() => navigate("/settings/cycle")} className="font-body flex-shrink-0" style={{ fontSize: 13, fontWeight: 600, color: "hsl(var(--primary))" }}>Set up →</button>
            </div>
          </Card>

          {/* HEALTH CONTEXT */}
          <SectionLabel>HEALTH CONTEXT</SectionLabel>

          <div style={{ backgroundColor: "#EAF3F3", borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <p className="font-body" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.8, color: "hsl(var(--primary))", fontWeight: 700, marginBottom: 6 }}>WHY WE ASK</p>
            <p className="font-body" style={{ fontSize: 13, color: "hsl(var(--primary))", lineHeight: 1.6 }}>
              Age and weight affect how PCOS presents and what helps. We use these as health signals only. Never for appearance, never shared, never judged.
            </p>
          </div>

          <Card style={{ padding: 20 }}>
            <label className="font-body block" style={{ fontSize: 11, textTransform: "uppercase", color: "#6B7280", marginBottom: 6, letterSpacing: 1 }}>YOUR AGE</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 28" style={inputStyle} />
            <p className="font-body italic" style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>Helps us adjust recommendations. PCOS management changes across your 20s, 30s and beyond.</p>

            <div style={{ height: 1, backgroundColor: "#E2DDD7", margin: "16px 0" }} />

            <label className="font-body block" style={{ fontSize: 11, textTransform: "uppercase", color: "#6B7280", marginBottom: 6, letterSpacing: 1 }}>YOUR WEIGHT (OPTIONAL)</label>
            <div className="flex gap-2 mb-2">
              <button style={pillStyle(weightUnit === "kg")} onClick={() => setWeightUnit("kg")}>kg</button>
              <button style={pillStyle(weightUnit === "lbs")} onClick={() => setWeightUnit("lbs")}>lbs</button>
            </div>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 68" style={inputStyle} />
            <p className="font-body italic" style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>Used only as a health signal for insulin resistance tracking. This is never about appearance.</p>

            <label className="font-body block" style={{ fontSize: 11, textTransform: "uppercase", color: "#6B7280", marginBottom: 6, letterSpacing: 1, marginTop: 16 }}>YOUR HEIGHT (OPTIONAL)</label>
            <div className="flex gap-2 mb-2">
              <button style={pillStyle(heightUnit === "cm")} onClick={() => setHeightUnit("cm")}>cm</button>
              <button style={pillStyle(heightUnit === "ft")} onClick={() => setHeightUnit("ft")}>ft</button>
            </div>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 163" style={inputStyle} />
            <p className="font-body italic" style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>Helps contextualise your metabolic health signals.</p>

            <button onClick={handleSaveHealth} className="w-full font-body" style={{ height: 50, borderRadius: 18, backgroundColor: "hsl(var(--primary))", color: "white", fontSize: 15, fontWeight: 600, marginTop: 20 }}>
              {healthSaved ? "Saved ✓" : "Save health context →"}
            </button>
          </Card>

          {/* NOTIFICATIONS */}
          <SectionLabel>NOTIFICATIONS</SectionLabel>
          <Card style={{ padding: 20 }}>
            <ToggleRow label="Phase change alerts" sub="Know when your cycle phase is shifting" on={notifs.phaseChange} onToggle={() => toggleNotif("phaseChange")} />
            <Divider />
            <ToggleRow label="Pattern insights" sub="When Cysta spots something worth flagging" on={notifs.patternInsights} onToggle={() => toggleNotif("patternInsights")} />
            <Divider />
            <ToggleRow label="Daily log reminder" sub="9:00 PM" on={notifs.dailyLog} onToggle={() => toggleNotif("dailyLog")} />
            <Divider />
            <ToggleRow label="Plan reminders" sub="Nudges when movement or nutrition goals slip" on={notifs.planReminders} onToggle={() => toggleNotif("planReminders")} />
            <Divider />
            <ToggleRow label="Weekly summary" sub="Every Sunday morning" on={notifs.weeklySummary} onToggle={() => toggleNotif("weeklySummary")} />
            <Divider />
            <ToggleRow label="Monthly review" sub="Your 30-day pattern report" on={notifs.monthlyReview} onToggle={() => toggleNotif("monthlyReview")} />
          </Card>

          {/* CONNECTED DEVICES */}
          <SectionLabel>CONNECTED DEVICES</SectionLabel>
          <Card>
            <SettingsRow label="⌚ Apple Watch" right="Connect →" onClick={() => navigate("/connect-device")} />
            <Divider />
            <SettingsRow label="💪 Fitbit" right="Connect →" onClick={() => navigate("/connect-device")} />
            <Divider />
            <div className="flex items-center justify-between py-3">
              <span className="font-body" style={{ fontSize: 15, fontWeight: 500, color: "var(--text-ink)" }}>🔵 Oura Ring</span>
              <span className="font-body" style={{ fontSize: 11, backgroundColor: "#EAF3F3", color: "hsl(var(--primary))", padding: "4px 10px", borderRadius: 100 }}>Coming soon</span>
            </div>
          </Card>

          {/* ACCOUNT */}
          <SectionLabel>ACCOUNT</SectionLabel>
          <Card>
            <SettingsRow label="Edit profile" right="→" onClick={() => navigate("/settings/profile")} />
            <Divider />
            <SettingsRow label="Change password" right="→" onClick={() => navigate("/settings/password")} />
            <Divider />
            <SettingsRow label="Export my data" right="→" onClick={() => toast.success("Export requested. Check your email.")} />
            <Divider />
            <SettingsRow label="Privacy settings" right="→" onClick={() => navigate("/settings/privacy")} />
            <Divider />
            <SettingsRow label="Delete my account" danger onClick={() => setShowDeleteModal(true)} />
          </Card>

          {/* ABOUT */}
          <SectionLabel>ABOUT</SectionLabel>
          <Card>
            <SettingsRow label="Cyclopedia: PCOS Science Library" right="→" onClick={() => navigate("/cyclopedia")} />
            <Divider />
            <SettingsRow label="Privacy Policy" right="→" onClick={() => window.open("#", "_blank")} />
            <Divider />
            <SettingsRow label="Terms of Service" right="→" onClick={() => window.open("#", "_blank")} />
            <Divider />
            <SettingsRow label="Clinical disclaimer" right="→" onClick={() => setShowDisclaimerModal(true)} />
            <Divider />
            <p className="font-body text-center py-2" style={{ fontSize: 12, color: "#6B7280" }}>Version 1.0.0 · Made with 💚 for women with PCOS</p>
          </Card>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="w-full font-body"
            style={{ height: 50, borderRadius: 18, backgroundColor: "white", border: "1.5px solid #E2DDD7", color: "#D4614F", fontSize: 15, fontWeight: 600, marginTop: 20, marginBottom: 40 }}
          >
            Sign out
          </button>
        </motion.div>

        {/* Delete modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowDeleteModal(false)}>
            <div className="bg-card mx-5 p-6 rounded-[18px] max-w-[340px]" onClick={(e) => e.stopPropagation()}>
              <p className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#111111" }}>Delete account?</p>
              <p className="font-body" style={{ fontSize: 14, color: "#6B7280", marginTop: 8, lineHeight: 1.6 }}>
                This permanently deletes all your data. This cannot be undone.
              </p>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 font-body" style={{ height: 44, borderRadius: 14, border: "1.5px solid #E2DDD7", fontSize: 14, fontWeight: 600 }}>Cancel</button>
                <button onClick={handleDeleteAccount} className="flex-1 font-body" style={{ height: 44, borderRadius: 14, backgroundColor: "#D4614F", color: "white", fontSize: 14, fontWeight: 600 }}>Delete everything</button>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer modal */}
        {showDisclaimerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowDisclaimerModal(false)}>
            <div className="bg-card mx-5 p-6 rounded-[18px] max-w-[340px]" onClick={(e) => e.stopPropagation()}>
              <p className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#111111" }}>Clinical Disclaimer</p>
              <p className="font-body" style={{ fontSize: 14, color: "#6B7280", marginTop: 8, lineHeight: 1.6 }}>
                Cystless is not a medical device. All content is educational and should not replace advice from your healthcare provider.
              </p>
              <button onClick={() => setShowDisclaimerModal(false)} className="w-full font-body mt-5" style={{ height: 44, borderRadius: 14, backgroundColor: "hsl(var(--primary))", color: "white", fontSize: 14, fontWeight: 600 }}>Got it</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
