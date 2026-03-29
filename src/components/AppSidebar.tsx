import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  PenTool,
  ShieldCheck,
  Send,
  BarChart3,
  LogOut,
  Zap,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/create", icon: PenTool, label: "Content Creator" },
  { to: "/compliance", icon: ShieldCheck, label: "Compliance" },
  { to: "/distribute", icon: Send, label: "Distribution" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

const AppSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-border bg-sidebar flex flex-col z-50">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-lg text-gradient">ContentOps</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 font-display">AI-POWERED PLATFORM</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-sidebar-accent text-primary glow-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-destructive transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
