import {
  BarChart3,
  Bell,
  Download,
  LayoutDashboard,
  LineChart,
  LogOut,
  Plus,
  Search,
  Settings,
  TerminalSquare,
  TrendingUp,
  Users
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/cn";
import { useAuthStore } from "../stores/authStore";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/monitoring", label: "Monitoring", icon: TrendingUp },
  { to: "/export", label: "Export", icon: Download }
];

export function DashboardLayout() {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  function logout() {
    clearAuth();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-obsidian text-ink">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-80 border-r border-copper/35 bg-[#090b0b] lg:flex lg:flex-col">
        <div className="px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-brand text-obsidian shadow-[0_0_24px_rgba(245,160,0,0.35)]">
              <TerminalSquare size={27} />
            </div>
            <div>
              <p className="gold-shadow text-4xl font-black leading-none text-warning">LeadOps</p>
              <p className="mono mt-1 text-sm uppercase tracking-[0.28em] text-copper">Enterprise B2B</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 space-y-2 px-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "relative flex h-[50px] items-center gap-5 px-6 text-base font-semibold text-sand transition",
                    "hover:bg-white/[0.04] hover:text-warning",
                    isActive && "bg-white/[0.06] text-warning after:absolute after:right-0 after:top-0 after:h-full after:w-1 after:bg-warning"
                  )
                }
              >
                <Icon size={24} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto px-5 pb-8">
          <div className="mb-8 border-t border-copper/45" />
          <button className="mb-6 flex h-12 items-center gap-5 px-6 text-base font-semibold text-sand hover:text-warning">
            <Settings size={24} />
            Settings
          </button>
          <div className="panel flex items-center justify-between rounded p-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full border border-copper bg-[radial-gradient(circle_at_50%_30%,#f2c18b,#102225_42%,#050505_70%)]" />
              <div>
                <p className="font-semibold">{user?.name || "Alex Rivera"}</p>
                <p className="text-xs text-sand/70">{user?.role === "ADMIN" ? "Enterprise Admin" : "Sales Operator"}</p>
              </div>
            </div>
            <button aria-label="Logout" className="text-sand/70 hover:text-warning" onClick={logout}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-80">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-copper/35 bg-[#0c0e0e]/95 px-5 backdrop-blur md:px-8">
          <div className="relative w-full max-w-[560px]">
            <Search className="absolute left-4 top-3.5 text-sand/80" size={22} />
            <input
              className="h-12 w-full rounded border border-copper/60 bg-[#090b0b] pl-12 pr-4 text-base text-ink outline-none placeholder:text-stone-600 focus:border-warning"
              placeholder="Search pipeline, leads, or metadata..."
            />
          </div>
          <div className="ml-4 flex items-center gap-5">
            <button className="relative text-sand hover:text-warning" aria-label="Notifications">
              <Bell size={26} />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-warning" />
            </button>
            <div className="hidden h-9 w-px bg-copper/50 sm:block" />
            <Button className="h-12 min-w-[170px] rounded" onClick={() => navigate("/leads")}>
              <Plus size={19} />
              New Lead
            </Button>
          </div>
        </header>
        <main className="min-h-[calc(100vh-80px)] px-5 py-8 md:px-8">
          <Outlet />
        </main>
        <footer className="fixed bottom-0 left-0 right-0 hidden h-8 items-center justify-between border-t border-copper/35 bg-[#090b0b] px-6 text-xs text-sand/70 lg:left-80 xl:flex">
          <span className="mono flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-success" />
            SYSTEM READY
          </span>
          <span className="mono flex items-center gap-6">
            <span>LATENCY: 24ms</span>
            <span>API_VER: 4.8.2-stable</span>
            <span>SSH CON: LOCALHOST:8080</span>
          </span>
          <LineChart size={15} />
        </footer>
      </div>
    </div>
  );
}
