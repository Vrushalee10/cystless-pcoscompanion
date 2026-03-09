import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-background flex justify-center">
      <div className="w-full max-w-[390px] min-h-[100dvh] relative flex flex-col px-5">
        {/* Top bar */}
        <div className="pt-6 pl-1">
          <span className="font-display text-[22px] font-bold text-primary">
            Cystless
          </span>
        </div>

        {/* Centre content — at ~40% from top */}
        <div className="absolute left-5 right-5" style={{ top: '40%', transform: 'translateY(-50%)' }}>
          <h1
            className="font-display leading-[1.1]"
            style={{ fontSize: '52px', fontWeight: 800, color: 'var(--text-ink)' }}
          >
            Go Cystless.
          </h1>

          {/* Accent bar */}
          <div className="w-12 h-1 bg-accent mt-[14px] rounded-full" />

          <p
            className="font-body mt-4"
            style={{ fontSize: '20px', fontWeight: 400, color: 'var(--text-body)' }}
          >
            Because less is more.
          </p>

          <p
            className="font-body mt-[6px]"
            style={{ fontSize: '14px', fontWeight: 400, color: 'var(--text-muted)' }}
          >
            Your personalised PCOS companion.
          </p>
        </div>

        {/* Bottom section — fixed to bottom of container */}
        <div className="mt-auto pb-9">
          <Button
            variant="hero"
            size="hero"
            onClick={() => navigate("/signup")}
            className="w-full relative"
          >
            Get Started
            <ArrowRight className="absolute right-5 h-5 w-5" />
          </Button>

          <p className="text-center mt-[14px] font-body" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Already have an account?{" "}
            <button onClick={() => navigate("/signin")} className="text-primary font-semibold hover:underline">
              Sign in
            </button>
          </p>
          <button
            onClick={() => navigate("/onboarding/1")}
            className="w-full text-center font-body mt-3"
            style={{ fontSize: 13, color: "var(--text-muted)" }}
          >
            Skip for now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
