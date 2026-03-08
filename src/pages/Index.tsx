import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background px-5">
      {/* Top bar */}
      <div className="pt-6">
        <span className="font-display text-[22px] font-bold text-primary">
          Cystless
        </span>
      </div>

      {/* Centre content — pulled slightly above centre */}
      <div className="flex-1 flex flex-col justify-center -mt-[8vh]">
        <h1
          className="font-display font-bold leading-[1.1]"
          style={{ fontSize: "44px", color: "var(--text-ink)" }}
        >
          Go Cystless.
        </h1>

        {/* Accent bar */}
        <div
          className="w-12 h-1 bg-accent mt-[14px] rounded-full"
        />

        <p
          className="font-body mt-4"
          style={{ fontSize: "19px", fontWeight: 400, color: "var(--text-body)" }}
        >
          Because less is more.
        </p>

        <p
          className="font-body mt-[6px]"
          style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-muted)" }}
        >
          Your personalised PCOS companion.
        </p>
      </div>

      {/* Bottom section */}
      <div className="pb-9">
        <Button
          variant="hero"
          size="hero"
          onClick={() => navigate("/quiz/1")}
          className="w-full relative"
        >
          Get Started
          <ArrowRight className="absolute right-5 h-5 w-5" />
        </Button>

        <p className="text-center mt-[14px] font-body" style={{ fontSize: "14px", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <button className="text-primary font-semibold hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Index;
