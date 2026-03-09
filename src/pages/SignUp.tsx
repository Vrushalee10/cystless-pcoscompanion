import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = name.trim().length > 0 && email.trim().length > 0 && password.length >= 6;

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/onboarding/1` },
    });
    if (error) toast.error(error.message);
  };

  const handleSignUp = async () => {
    if (!isValid) return;
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: name.trim() },
        emailRedirectTo: `${window.location.origin}/onboarding/1`,
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email to confirm your account!");
      navigate("/onboarding/1");
    }
  };

  const inputStyle = {
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
  } as const;

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] flex flex-col px-5">
        {/* Wordmark */}
        <span className="font-display text-[22px] font-bold text-primary" style={{ marginTop: 24 }}>
          Cystless
        </span>

        {/* Header */}
        <div style={{ marginTop: 48 }}>
          <h1 className="font-display" style={{ fontSize: 32, fontWeight: 800, color: "#111111", lineHeight: 1.2 }}>
            Create your account
          </h1>
          <p className="font-body" style={{ fontSize: 14, color: "#6B7280", marginTop: 8, marginBottom: 32 }}>
            Your data is yours. Always private, never shared.
          </p>
        </div>

        {/* Google button */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 bg-card"
          style={{
            height: 58,
            borderRadius: 18,
            border: "1.5px solid #E2DDD7",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <GoogleIcon />
          <span className="font-body" style={{ fontSize: 16, fontWeight: 600, color: "#111111" }}>
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3" style={{ margin: "20px 0" }}>
          <div className="flex-1" style={{ height: 1, backgroundColor: "#E2DDD7" }} />
          <span className="font-body" style={{ fontSize: 13, color: "#6B7280" }}>or</span>
          <div className="flex-1" style={{ height: 1, backgroundColor: "#E2DDD7" }} />
        </div>

        {/* Name */}
        <div style={{ marginBottom: 16 }}>
          <label className="font-body block" style={{ fontSize: 11, textTransform: "uppercase", color: "#6B7280", marginBottom: 6, letterSpacing: 1 }}>
            YOUR NAME
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your first name"
            style={inputStyle}
            className="focus:!border-primary"
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label className="font-body block" style={{ fontSize: 11, textTransform: "uppercase", color: "#6B7280", marginBottom: 6, letterSpacing: 1 }}>
            EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={inputStyle}
            className="focus:!border-primary"
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 12 }}>
          <label className="font-body block" style={{ fontSize: 11, textTransform: "uppercase", color: "#6B7280", marginBottom: 6, letterSpacing: 1 }}>
            PASSWORD
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              style={{ ...inputStyle, paddingRight: 48 }}
              className="focus:!border-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: "#6B7280" }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <p className="font-body text-center" style={{ fontSize: 12, color: "#6B7280", marginTop: 12 }}>
          By continuing you agree to our{" "}
          <a href="#" className="underline" style={{ color: "hsl(var(--primary))" }}>Privacy Policy</a>
          {" "}and{" "}
          <a href="#" className="underline" style={{ color: "hsl(var(--primary))" }}>Terms of Service</a>.
        </p>

        {/* Submit */}
        <button
          disabled={!isValid || loading}
          onClick={handleSignUp}
          className="w-full font-body"
          style={{
            height: 58,
            borderRadius: 18,
            backgroundColor: isValid ? "hsl(var(--primary))" : "var(--disabled)",
            color: isValid ? "white" : "var(--text-muted)",
            fontSize: 16,
            fontWeight: 600,
            marginTop: 20,
            cursor: isValid ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Creating account..." : "Get Started →"}
        </button>

        {/* Sign in link */}
        <p className="text-center font-body" style={{ fontSize: 13, color: "#6B7280", marginTop: 16 }}>
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold" style={{ color: "hsl(var(--primary))" }}>
            Sign in →
          </Link>
        </p>

        {/* Privacy note */}
        <p className="text-center font-body italic mt-auto pb-8" style={{ fontSize: 12, color: "#6B7280" }}>
          🔒 Your health data is encrypted and never sold.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
