import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Lock, Mail, TerminalSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { login } from "../features/auth/services/authApi";
import { useAuthStore } from "../stores/authStore";

type LoginForm = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const { token, setAuth } = useAuthStore();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<LoginForm>({
    defaultValues: { email: "demo@example.com", password: "DemoPass123!" }
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      navigate("/");
    },
    onError: () => setError("Invalid email or password")
  });

  if (token) return <Navigate to="/" replace />;

  return (
    <div className="grid min-h-screen bg-[#101211] text-ink lg:grid-cols-[60%_40%]">
      <section className="cube-field relative hidden min-h-screen overflow-hidden border-r border-copper/35 p-16 lg:flex lg:flex-col lg:justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(79,227,165,0.1),transparent_24%),linear-gradient(90deg,rgba(0,0,0,0.14),rgba(0,0,0,0.5))]" />
        <div className="relative max-w-4xl">
          <div className="mb-16 flex items-center gap-4">
            <h1 className="gold-shadow text-4xl font-black text-warning">LeadOps</h1>
            <span className="mono rounded border border-copper/70 px-3 py-2 text-sm uppercase tracking-[0.22em] text-warning">
              Enterprise
            </span>
          </div>
          <h2 className="max-w-5xl text-6xl font-black leading-[1.05] tracking-[-0.02em]">
            Manage leads with <span className="italic text-warning">precision.</span>
          </h2>
          <p className="mt-8 max-w-3xl text-2xl leading-relaxed text-sand">
            Enterprise-grade intelligence for high-velocity sales teams. Experience a dashboard-first mentality where every metric drives growth.
          </p>
          <div className="mt-16 grid max-w-5xl grid-cols-2 gap-12 border-t border-copper/60 pt-8">
            <div>
              <p className="text-sm font-black uppercase text-warning">Real-time Sync</p>
              <p className="mt-2 text-lg text-sand">Instant lead ingestion from 50+ sources.</p>
            </div>
            <div>
              <p className="text-sm font-black uppercase text-warning">AI Scoring</p>
              <p className="mt-2 text-lg text-sand">Predictive qualification with Obsidian ML.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center px-6">
        <div className="absolute bottom-8 left-6 hidden items-center gap-3 text-xs uppercase tracking-[0.22em] text-sand/60 lg:flex">
          <span className="h-3 w-3 rounded-full bg-success shadow-[0_0_16px_rgba(82,227,165,0.8)]" />
          System Operational
        </div>
        <form className="w-full max-w-[480px]" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <div className="mb-14 lg:hidden">
            <div className="flex items-center gap-3">
              <TerminalSquare className="text-warning" size={34} />
              <span className="gold-shadow text-4xl font-black text-warning">LeadOps</span>
            </div>
          </div>
          <h2 className="text-4xl font-black tracking-[-0.02em]">Welcome back</h2>
          <p className="mt-3 text-lg text-sand">Enter your credentials to access your dashboard.</p>

          <div className="mt-16 space-y-5">
            <label className="block">
              <span className="mb-2 block font-bold text-sand">Business Email</span>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-sand" size={18} />
                <input
                  className="h-[72px] w-full rounded border border-copper/60 bg-[#0b0d0d] pl-14 pr-4 text-xl text-ink outline-none placeholder:text-stone-700 focus:border-warning"
                  placeholder="name@company.com"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: true })}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center justify-between font-bold text-sand">
                Password
                <span className="text-sm text-warning">Forgot password?</span>
              </span>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-sand" size={18} />
                <input
                  className="h-[72px] w-full rounded border border-copper/60 bg-[#0b0d0d] pl-14 pr-4 text-xl text-ink outline-none placeholder:text-stone-700 focus:border-warning"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: true })}
                />
              </div>
            </label>
          </div>

          <label className="mt-6 flex items-center gap-3 text-sand">
            <span className="h-5 w-5 rounded border border-copper/70 bg-[#0b0d0d]" />
            Remember this device
          </label>

          {error ? <p className="mt-5 rounded border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p> : null}

          <Button className="mt-7 h-14 w-full rounded text-base font-black" disabled={mutation.isPending}>
            {mutation.isPending ? "Signing in..." : "Sign in"}
          </Button>

          <div className="my-12 flex items-center gap-4 text-sand">
            <span className="h-px flex-1 bg-copper/50" />
            OR
            <span className="h-px flex-1 bg-copper/50" />
          </div>

          <button
            type="button"
            className="flex h-16 w-full items-center justify-center gap-3 rounded border border-copper/60 bg-white/[0.03] font-bold tracking-wide text-ink"
          >
            <span className="text-2xl font-black text-[#4285f4]">G</span>
            Continue with Google
          </button>

          <p className="mt-12 text-center text-sand">
            Don't have an account? <span className="font-bold text-warning">Contact Sales</span>
          </p>
        </form>
      </section>
    </div>
  );
}
