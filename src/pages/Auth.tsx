import { useState, type FormEvent, type ReactNode } from "react";

type Mode = "login" | "register";

interface LoginData {
  email: string;
  password: string;
}
interface RegisterData extends LoginData {
  name: string;
  phone: string;
}
interface Props {
  initialMode?: Mode;
  // Connect these to your Express API (e.g. POST /api/auth/login)
  onLogin?: (data: LoginData) => Promise<void>;
  onRegister?: (data: RegisterData) => Promise<void>;
}

const Bolt = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-200">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/15 bg-[#0B1224] px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40";

export default function AuthPage({ initialMode = "login", onLogin, onRegister }: Props) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirm: "", terms: false, remember: true });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const isLogin = mode === "login";
  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const switchMode = (m: Mode) => {
    setMode(m);
    setErrors({});
    setServerError("");
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!isLogin && form.name.trim().length < 3) e.name = "Enter your full name (at least 3 letters).";
    if (!isLogin && !/^03\d{9}$/.test(form.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a mobile number like 0300 1234567.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (!isLogin && form.confirm !== form.password) e.confirm = "Passwords do not match.";
    if (!isLogin && !form.terms) e.terms = "Accept the terms to create your account.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) return;
    setLoading(true);
    try {
      if (isLogin) await onLogin?.({ email: form.email, password: form.password });
      else await onRegister?.({ name: form.name, phone: form.phone, email: form.email, password: form.password });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const describe = (id: string) => (errors[id] ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {});

  return (
    <div className="grid min-h-screen bg-[#0A0F1F] text-white lg:grid-cols-2">
      {/* Brand panel */}
      <section className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 p-12 lg:flex">
        <div className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 text-[#0A0F1F] shadow-lg shadow-amber-500/30">
            <Bolt />
          </span>
          <span className="text-xl font-bold">
            Chohan <span className="text-amber-400">Electric</span> Store
          </span>
        </div>
        <div className="relative max-w-md">
          <h1 className="text-5xl font-bold leading-tight">
            Powering Your World with <span className="text-amber-400">Expert Electrical</span> Solutions
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            Sign in to track your orders, manage service bookings and shop quality electrical products.
          </p>
        </div>
        <p className="relative text-sm text-slate-400">Licensed and insured electricians</p>
      </section>

      {/* Form panel */}
      <main className="flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 text-[#0A0F1F]">
              <Bolt className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold">
              Chohan <span className="text-amber-400">Electric</span> Store
            </span>
          </div>

          <div className="mb-6 grid grid-cols-2 rounded-xl border border-white/10 bg-[#0B1224] p-1" role="tablist" aria-label="Account">
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className={`rounded-lg py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  mode === m ? "bg-gradient-to-r from-amber-400 to-amber-500 text-[#0A0F1F]" : "text-slate-300 hover:text-white"
                }`}
              >
                {m === "login" ? "Log in" : "Create account"}
              </button>
            ))}
          </div>

          <h2 className="text-3xl font-bold">{isLogin ? "Welcome back" : "Create your account"}</h2>
          <p className="mb-6 mt-1 text-slate-400">
            {isLogin ? "Log in to continue to your account." : "It takes less than a minute."}
          </p>

          <form onSubmit={submit} noValidate className="space-y-4">
            {!isLogin && (
              <>
                <Field id="name" label="Full name" error={errors.name}>
                  <input id="name" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ali Chohan" className={inputCls} {...describe("name")} />
                </Field>
                <Field id="phone" label="Mobile number" error={errors.phone}>
                  <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="0300 1234567" className={inputCls} {...describe("phone")} />
                </Field>
              </>
            )}

            <Field id="email" label="Email" error={errors.email}>
              <input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" className={inputCls} {...describe("email")} />
            </Field>

            <Field id="password" label="Password" error={errors.password}>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  placeholder="At least 8 characters"
                  className={`${inputCls} pr-16`}
                  {...describe("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-pressed={showPw}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-1 text-sm text-amber-400 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </Field>

            {!isLogin && (
              <Field id="confirm" label="Confirm password" error={errors.confirm}>
                <input id="confirm" type={showPw ? "text" : "password"} autoComplete="new-password" value={form.confirm} onChange={(e) => set("confirm", e.target.value)} placeholder="Re-enter your password" className={inputCls} {...describe("confirm")} />
              </Field>
            )}

            {isLogin ? (
              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-slate-300">
                  <input type="checkbox" checked={form.remember} onChange={(e) => set("remember", e.target.checked)} className="h-4 w-4 accent-amber-400" />
                  Keep me logged in
                </label>
                <a href="/forgot-password" className="text-amber-400 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                  Forgot password?
                </a>
              </div>
            ) : (
              <div>
                <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-300">
                  <input type="checkbox" checked={form.terms} onChange={(e) => set("terms", e.target.checked)} className="mt-0.5 h-4 w-4 accent-amber-400" />
                  <span>
                    I agree to the <a href="/terms" className="text-amber-400 hover:text-amber-300">terms</a> and <a href="/privacy" className="text-amber-400 hover:text-amber-300">privacy policy</a>.
                  </span>
                </label>
                {errors.terms && <p className="mt-1.5 text-sm text-red-400">{errors.terms}</p>}
              </div>
            )}

            {serverError && (
              <p role="alert" className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 px-5 py-3.5 font-semibold text-[#0A0F1F] shadow-lg shadow-amber-500/25 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (isLogin ? "Logging in..." : "Creating account...") : isLogin ? "Log in" : "Create account"}
              {!loading && <Arrow />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            {isLogin ? "New to Chohan Electric Store?" : "Already have an account?"}{" "}
            <button onClick={() => switchMode(isLogin ? "register" : "login")} className="font-semibold text-amber-400 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
              {isLogin ? "Create an account" : "Log in"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}