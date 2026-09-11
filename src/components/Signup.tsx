import { useState, FormEvent } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShoppingBag, Hammer } from "lucide-react";

/**
 * Signup — Kori (করি) marketplace
 *
 * Icons: lucide-react
 * Colors: inline Tailwind arbitrary hex values — no config setup needed.
 *
 * Wire up `onSubmit` to your actual auth call (Better Auth / your API).
 * Role selection (Buyer / Artisan) determines the account type and which
 * dashboard the user lands on after signup.
 */

export type UserRole = "buyer" | "artisan";

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface SignupProps {
  onSubmit?: (data: SignupData) => void;
}

export default function Signup({ onSubmit }: SignupProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole>("buyer");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreedToTerms) {
      setError("Please agree to the Terms of Heritage Trade");
      return;
    }

    onSubmit?.({ name, email, password, role });
  }

  return (
    <div className="min-h-screen bg-[#14100c] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <a
            href="/"
            className="text-3xl font-bold text-[#ff9d7a] tracking-tight"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            করি Kori
          </a>
          <p className="text-sm text-[#b8aca0] mt-2">
            Join Bengal's heritage craft community
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl p-6 md:p-8 shadow-2xl">
          <h1
            className="text-2xl font-bold text-[#fbf7ee] mb-6"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Create Account
          </h1>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              type="button"
              onClick={() => setRole("buyer")}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border text-sm font-semibold transition-all ${
                role === "buyer"
                  ? "bg-[#ff9d7a] text-[#451200] border-[#ff9d7a]"
                  : "bg-[#1d1712] text-[#dec0b7] border-[#362c24] hover:border-[#ff9d7a]/50"
              }`}
            >
              <ShoppingBag size={20} />
              <span>I'm a Buyer</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("artisan")}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border text-sm font-semibold transition-all ${
                role === "artisan"
                  ? "bg-[#ff9d7a] text-[#451200] border-[#ff9d7a]"
                  : "bg-[#1d1712] text-[#dec0b7] border-[#362c24] hover:border-[#ff9d7a]/50"
              }`}
            >
              <Hammer size={20} />
              <span>I'm an Artisan</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs text-[#b8aca0] mb-1.5">
                Full Name
              </label>
              <div className="flex items-center bg-[#1d1712] border border-[#362c24] hover:border-[#ff9d7a]/50 rounded-lg px-3 py-2.5 focus-within:border-[#ff9d7a] focus-within:ring-2 focus-within:ring-[#ff9d7a]/20 transition-all">
                <User size={18} className="text-[#b8aca0] mr-2 shrink-0" />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-[#fbf7ee] placeholder:text-[#b8aca0]/50"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs text-[#b8aca0] mb-1.5">
                Email or Phone Number
              </label>
              <div className="flex items-center bg-[#1d1712] border border-[#362c24] hover:border-[#ff9d7a]/50 rounded-lg px-3 py-2.5 focus-within:border-[#ff9d7a] focus-within:ring-2 focus-within:ring-[#ff9d7a]/20 transition-all">
                <Mail size={18} className="text-[#b8aca0] mr-2 shrink-0" />
                <input
                  id="email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-[#fbf7ee] placeholder:text-[#b8aca0]/50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs text-[#b8aca0] mb-1.5">
                Password
              </label>
              <div className="flex items-center bg-[#1d1712] border border-[#362c24] hover:border-[#ff9d7a]/50 rounded-lg px-3 py-2.5 focus-within:border-[#ff9d7a] focus-within:ring-2 focus-within:ring-[#ff9d7a]/20 transition-all">
                <Lock size={18} className="text-[#b8aca0] mr-2 shrink-0" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-[#fbf7ee] placeholder:text-[#b8aca0]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-[#b8aca0] hover:text-[#ff9d7a] shrink-0"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs text-[#b8aca0] mb-1.5">
                Confirm Password
              </label>
              <div className="flex items-center bg-[#1d1712] border border-[#362c24] hover:border-[#ff9d7a]/50 rounded-lg px-3 py-2.5 focus-within:border-[#ff9d7a] focus-within:ring-2 focus-within:ring-[#ff9d7a]/20 transition-all">
                <Lock size={18} className="text-[#b8aca0] mr-2 shrink-0" />
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-[#fbf7ee] placeholder:text-[#b8aca0]/50"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 text-xs text-[#b8aca0] cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 accent-[#ff9d7a]"
              />
              <span>
                I agree to Kori's{" "}
                <a href="#terms" className="text-[#ff9d7a] hover:underline">
                  Terms of Heritage Trade
                </a>{" "}
                and{" "}
                <a href="#privacy" className="text-[#ff9d7a] hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            {error && (
              <p className="text-xs text-[#ffb4ab] bg-[#93000a]/20 border border-[#93000a]/40 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-11 bg-[#ff9d7a] hover:bg-[#e46f45] text-[#451200] font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 mt-2"
            >
              <span>Create Account</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-[#b8aca0] mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#ff9d7a] font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}