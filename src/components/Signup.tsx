import { useState, type FormEvent } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShoppingBag, Hammer } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

export type UserRole = "buyer" | "artisan";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole>("buyer");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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

    // Mirror idea-vault: signUp.email with name/email/password
    // role is persisted via additionalFields (see src/lib/auth.ts)
    const { data, error: authError } = await authClient.signUp.email({
      email,
      password,
      name,
      role,
    } as unknown as { email: string; password: string; name: string; role: UserRole });

    if (data) {
      toast.success("Account created successfully!");
      if (role === "artisan") {
        navigate("/artisan");
      } else {
        navigate("/");
      }
    }
    if (authError) {
      const msg = authError.message || "Signup failed";
      setError(msg);
      toast.error(msg);
    }
  }

  async function handleGoogleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }

  return (
    <div className="min-h-screen bg-[#14100c] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-bold text-[#ff9d7a] tracking-tight"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            করি Kori
          </Link>
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

          {/* Role selector — buyer / artisan (kori-specific; stored as user.role) */}
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
                  type="email"
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
                <Link to="#terms" className="text-[#ff9d7a] hover:underline">
                  Terms of Heritage Trade
                </Link>{" "}
                and{" "}
                <Link to="#privacy" className="text-[#ff9d7a] hover:underline">
                  Privacy Policy
                </Link>
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

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-[#362c24]" />
            <span className="text-xs text-[#b8aca0]">or</span>
            <div className="h-px flex-1 bg-[#362c24]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full h-11 bg-[#1d1712] border border-[#362c24] hover:border-[#ff9d7a]/50 text-[#fbf7ee] font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.68-3.88 2.68-6.62z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z" />
              <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z" />
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z" />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-[#b8aca0] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#ff9d7a] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
