import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnswerCardProps {
  text: string;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}

const AnswerCard = ({ text, selected, onSelect, compact = false }: AnswerCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left rounded-[18px] transition-all duration-200 flex items-center justify-between",
        compact
          ? "px-[18px] py-[14px]"
          : "px-[18px] py-[17px]",
        selected
          ? "border-2 border-primary bg-primary-light"
          : "border-2 border-transparent bg-card shadow-[var(--shadow-card)]"
      )}
    >
      <span
        className="font-body"
        style={{
          fontSize: compact ? "14px" : "16px",
          fontWeight: 500,
          color: selected ? "var(--text-ink)" : "var(--text-ink)",
        }}
      >
        {text}
      </span>
      {selected && (
        <Check
          className="h-[15px] w-[15px] flex-shrink-0 ml-2"
          style={{ color: "hsl(var(--primary))" }}
          strokeWidth={3}
        />
      )}
    </button>
  );
};

export default AnswerCard;
