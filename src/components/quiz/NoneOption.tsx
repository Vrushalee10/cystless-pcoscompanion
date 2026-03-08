import { cn } from "@/lib/utils";

interface NoneOptionProps {
  text?: string;
  selected: boolean;
  onSelect: () => void;
}

const NoneOption = ({
  text = "None of these apply to me",
  selected,
  onSelect,
}: NoneOptionProps) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full rounded-full py-[12px] px-6 transition-all duration-200 font-body",
        selected
          ? "border-2 border-primary text-primary"
          : "border-2 border-border text-[var(--text-muted)]"
      )}
      style={{ fontSize: "14px" }}
    >
      {text}
    </button>
  );
};

export default NoneOption;
