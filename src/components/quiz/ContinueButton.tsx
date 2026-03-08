import { ArrowRight } from "lucide-react";

interface ContinueButtonProps {
  enabled: boolean;
  onClick: () => void;
  label?: string;
}

const ContinueButton = ({ enabled, onClick, label }: ContinueButtonProps) => {
  return (
    <div className="sticky bottom-0 pb-5 pt-3 bg-background">
      <button
        disabled={!enabled}
        onClick={onClick}
        className="w-full h-[58px] rounded-[18px] font-body relative flex items-center justify-center transition-colors duration-200"
        style={{
          fontSize: "16px",
          fontWeight: 600,
          backgroundColor: enabled ? "hsl(var(--primary))" : "var(--disabled)",
          color: enabled ? "white" : "var(--text-muted)",
        }}
      >
        {enabled ? (label ?? "Continue") : "Select an answer"}
        {enabled && (
          <ArrowRight className="absolute right-5 h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default ContinueButton;
