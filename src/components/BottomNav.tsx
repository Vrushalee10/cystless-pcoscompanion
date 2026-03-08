import { useNavigate } from "react-router-dom";
import { Home, ClipboardList, CalendarDays, MessageCircle } from "lucide-react";

const tabs = [
  { id: "home", label: "Home", icon: Home, route: "/home" },
  { id: "log", label: "Log", icon: ClipboardList, route: "/log" },
  { id: "plan", label: "Plan", icon: CalendarDays, route: "/plan" },
  { id: "chat", label: "Chat", icon: MessageCircle, route: "/chat" },
] as const;

interface BottomNavProps {
  active: string;
}

const BottomNav = ({ active }: BottomNavProps) => {
  const navigate = useNavigate();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex justify-center bg-card"
      style={{ borderTop: "1px solid hsl(var(--border))", zIndex: 50 }}
    >
      <div className="w-full max-w-[390px] h-16 flex items-center">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const color = isActive ? "hsl(var(--primary))" : "var(--text-muted)";
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.route)}
              className="flex-1 flex flex-col items-center justify-center gap-[2px]"
            >
              <Icon size={22} color={color} strokeWidth={isActive ? 2.2 : 1.8} />
              <span
                className="font-body"
                style={{ fontSize: 11, color }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
