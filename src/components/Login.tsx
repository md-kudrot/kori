import { useState, FormEvent } from "react"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"

/**
 * Login — Kori (করি) marketplace
 *
 * Icons: lucide-react
 * Colors: inline Tailwind arbitrary hex values — no config setup needed.
 *
 * Wire up `onSubmit` to your actual auth call (Better Auth / your API).
 */

interface LoginProps {
    onSubmit?: (data: { email: string; password: string }) => void
}

export default function Login({ onSubmit }: LoginProps) {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onSubmit?.({ email, password })
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
                    <p className="text-sm text-[#b8aca0] mt-2">Welcome back to Bengal's heritage marketplace</p>
                </div>

                {/* Card */}
                <div className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl p-6 md:p-8 shadow-2xl">
                    <h1
                        className="text-2xl font-bold text-[#fbf7ee] mb-6"
                        style={{ fontFamily: "Merriweather, serif" }}
                    >
                        Sign In
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="password" className="block text-xs text-[#b8aca0]">
                                    Password
                                </label>
                                <a href="#forgot-password" className="text-xs text-[#ff9d7a] hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="flex items-center bg-[#1d1712] border border-[#362c24] hover:border-[#ff9d7a]/50 rounded-lg px-3 py-2.5 focus-within:border-[#ff9d7a] focus-within:ring-2 focus-within:ring-[#ff9d7a]/20 transition-all">
                                <Lock size={18} className="text-[#b8aca0] mr-2 shrink-0" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
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

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full h-11 bg-[#ff9d7a] hover:bg-[#e46f45] text-[#451200] font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 mt-2"
                        >
                            <span>Sign In</span>
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="h-px flex-1 bg-[#362c24]" />
                        <span className="text-xs text-[#b8aca0]">or</span>
                        <div className="h-px flex-1 bg-[#362c24]" />
                    </div>

                    {/* Google */}
                    <button
                        type="button"
                        className="w-full h-11 bg-[#1d1712] border border-[#362c24] hover:border-[#ff9d7a]/50 text-[#fbf7ee] font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18">
                            <path
                                fill="#4285F4"
                                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.68-3.88 2.68-6.62z"
                            />
                            <path
                                fill="#34A853"
                                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z"
                            />
                            <path
                                fill="#EA4335"
                                d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z"
                            />
                        </svg>
                        <span>Continue with Google</span>
                    </button>
                </div>

                {/* Sign up link */}
                <p className="text-center text-sm text-[#b8aca0] mt-6">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-[#ff9d7a] font-semibold hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}
