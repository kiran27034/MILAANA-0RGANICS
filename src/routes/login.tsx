
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  LockKeyhole, Milk, Phone, ArrowRight, Eye, EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  component: Login,
});

function normalizePhone(value: string) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (digits.length === 10) return `+91${digits}`;

  if (trimmed.startsWith("+") && digits.length >= 10 && digits.length <= 15) {
    return `+${digits}`;
  }

  return "";
}

function Login() {
  const nav = useNavigate();
  const { user } = useAuth();

  const [mode, setMode] = useState<"in" | "up">("up");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const formattedPhone = normalizePhone(phone);

    if (!formattedPhone) {
      toast.error("Enter a valid mobile number.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setBusy(true);

    const res = mode === "up"
      ? await supabase.auth.signUp({
          phone: formattedPhone,
          password,
          options: {
            data: { phone: formattedPhone },
          },
        })
      : await supabase.auth.signInWithPassword({
          phone: formattedPhone,
          password,
        });

    setBusy(false);

    if (res.error) {
      toast.error(res.error.message);
      return;
    }

    if (mode === "up" && !res.data.session) {
      toast.error(
        "Disable phone confirmation in Supabase to register without OTP."
      );
      return;
    }

    toast.success(
      mode === "up" ? "Account created successfully!" : "Welcome back!"
    );

    nav({ to: "/membership" });
  }

  if (user) {
    return (
      <main className="min-h-screen bg-[#0b1711] px-4 py-20">
        <div className="mx-auto max-w-md rounded-3xl bg-[#14251c] p-8 text-center">
          <Milk className="mx-auto mb-5 h-10 w-10 text-emerald-400" />
          <h1 className="text-3xl font-bold text-white">
            You're signed in
          </h1>
          <p className="mt-3 text-slate-400">{user.phone}</p>

          <Button
            className="mt-7 w-full bg-emerald-500 text-black hover:bg-emerald-400"
            onClick={() => nav({ to: "/membership" })}
          >
            Go to membership
          </Button>

          <Button
            variant="outline"
            className="mt-3 w-full"
            onClick={() => supabase.auth.signOut()}
          >
            Sign out
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[#0b1711] px-4 py-12">

      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#101e17] shadow-2xl md:grid-cols-2">

        {/* Left side branding */}
        <section className="hidden flex-col justify-between bg-gradient-to-br from-[#173b29] to-[#09170f] p-12 md:flex">

          <div>
            <div className="flex items-center gap-3 text-emerald-300">
              <Milk className="h-9 w-9" />
              <span className="font-display text-3xl font-bold">
                MILAANA
              </span>
            </div>

            <h1 className="mt-24 font-display text-5xl font-bold leading-tight text-white">
              Pure goodness, right at your doorstep.
            </h1>

            <p className="mt-5 text-sm leading-7 text-emerald-100/60">
              Fresh, quality-checked dairy products delivered
              to your home with care.
            </p>
          </div>

          <p className="text-xs tracking-widest text-emerald-100/40">
            FRESH • NATURAL • TRUSTED
          </p>
        </section>

        {/* Right side login */}
        <section className="px-6 py-12 sm:px-12">

          <div className="mb-8 flex items-center gap-3 md:hidden">
            <Milk className="h-9 w-9 text-emerald-400" />
            <span className="font-display text-2xl font-bold text-white">
              MILAANA
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Welcome to Milaana
          </p>

          <h2 className="mt-3 font-display text-4xl font-bold text-white">
            {mode === "up" ? "Create account" : "Welcome back"}
          </h2>

          <p className="mt-3 text-sm text-slate-400">
            {mode === "up"
              ? "Sign up for free membership and enjoy home delivery."
              : "Login using your mobile number and password."}
          </p>

          {/* Login / Signup tabs */}
          <div className="mt-8 grid grid-cols-2 rounded-xl border border-white/10 bg-black/20 p-1">

            <button
              type="button"
              onClick={() => setMode("up")}
              className={`rounded-lg py-3 text-sm font-semibold ${
                mode === "up"
                  ? "bg-emerald-500 text-black"
                  : "text-slate-400"
              }`}
            >
              Sign up
            </button>

            <button
              type="button"
              onClick={() => setMode("in")}
              className={`rounded-lg py-3 text-sm font-semibold ${
                mode === "in"
                  ? "bg-emerald-500 text-black"
                  : "text-slate-400"
              }`}
            >
              Login
            </button>
          </div>

          <form onSubmit={submit} className="mt-7 space-y-5">

            {/* Mobile number */}
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Mobile number
              </label>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />

                <Input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="Enter mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 border-white/10 bg-[#0a1510] pl-11 text-white placeholder:text-slate-600"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Indian numbers automatically use +91.
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />

                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-white/10 bg-[#0a1510] pl-11 pr-12 text-white placeholder:text-slate-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label="Toggle password visibility"
                >
                  {showPassword
                    ? <EyeOff className="h-4 w-4" />
                    : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={busy}
              className="h-12 w-full rounded-xl bg-emerald-500 font-semibold text-black hover:bg-emerald-400"
            >
              {busy
                ? "Please wait..."
                : mode === "up"
                  ? "Create account"
                  : "Login"}

              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

          </form>

          <p className="mt-8 text-center text-xs text-slate-500">
            Your MILAANA account, just a mobile number away.
          </p>

        </section>
      </div>
    </main>
  );
}
