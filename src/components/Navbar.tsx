import { useState } from "react"
import { Search, Heart, ShoppingBag, User, Menu, X, Handshake, Compass, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { authClient } from "../lib/auth-client"
import { useLocation } from "react-router-dom"

const CATEGORIES: { label: string; href: string }[] = [
    { label: "Jamdani", href: "/jamdani" },
    { label: "Nakshi Kantha", href: "/nakshi-kantha" },
    { label: "Pottery", href: "/pottery" },
    { label: "Shital Pati", href: "/shital-pati" },
    { label: "Bamboo", href: "/bamboo" }
]

const DISTRICTS: string[] = ["All Bangladesh", "Tangail", "Rajshahi", "Jamalpur", "Sylhet", "Sonargaon"]

interface NavbarProps {
    cartCount?: number
    wishlistCount?: number
}

export default function Navbar({ cartCount = 1, wishlistCount = 1 }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const { data: session } = authClient.useSession()
    const user = session?.user as { name?: string; email?: string; image?: string; role?: string } | undefined
    const location = useLocation()
    const pathName = location.pathname

    async function handleLogout() {
        await authClient.signOut()
        toast.success("Logged out")
        navigate("/login")
    }

    return (
        <nav className="bg-[#16120e]/95 backdrop-blur-md  border-b border-[rgba(212,163,56,0.18)] shadow-xl">
            <div className="flex items-center justify-between px-4 md:px-6 max-w-7xl mx-auto w-full py-3">
                {/* Brand */}
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-baseline gap-2 group">
                        <span
                            className="text-2xl font-bold text-[#ff9d7a] tracking-tight"
                            style={{ fontFamily: "Merriweather, serif" }}
                        >
                            করি Kori
                        </span>
                        <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#2e241b] text-[#e6b445] border border-[#e6b445]/25">
                            হেরিটেজ ক্রাফট
                        </span>
                    </Link>
                </div>

                {/* Search + district (desktop only) */}
                <div className="hidden md:flex items-center flex-1 max-w-lg mx-6">
                    <div className="w-full flex items-center bg-[#1d1712] border border-[#362c24] hover:border-[#ff9d7a]/50 rounded-lg px-3 py-1.5 focus-within:border-[#ff9d7a] focus-within:ring-2 focus-within:ring-[#ff9d7a]/20 transition-all shadow-inner">
                        <Search size={18} className="text-[#b8aca0] mr-2 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search craft, weave, or master artisan..."
                            className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-[#fbf7ee] placeholder:text-[#b8aca0]/70"
                        />
                        <div className="h-4 w-px bg-[#362c24] mx-2" />
                        <select
                            className="bg-transparent border-none text-xs text-[#b8aca0] hover:text-[#fbf7ee] py-0 pl-1 pr-6 focus:ring-0 cursor-pointer"
                            defaultValue={DISTRICTS[0]}
                        >
                            {DISTRICTS.map((d) => (
                                <option key={d} className="bg-[#2e241b] text-[#fbf7ee]">
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-3 lg:gap-5">
                    <div className="flex items-center gap-2">
                        <Link
                            to="#favorites"
                            title="Saved Pieces"
                            className="p-2 text-[#dec0b7] hover:text-[#ff9d7a] rounded-full hover:bg-[#241d16] transition-colors relative"
                        >
                            <Heart size={20} />
                            {wishlistCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#e06d44] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            to="#cart"
                            title="Shopping Bag"
                            className="p-2 text-[#dec0b7] hover:text-[#ff9d7a] rounded-full hover:bg-[#241d16] transition-colors relative"
                        >
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#ff9d7a] text-[#451200] text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Auth-aware area — mirrors idea-vault nav logic */}
                        {!user ? (
                            <>
                                <Link
                                    to="/login"
                                    className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-[#451200] bg-[#ff9d7a] hover:bg-[#e46f45] rounded-lg transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-[#ff9d7a] border border-[#ff9d7a]/50 hover:bg-[#ff9d7a]/10 rounded-lg transition-colors"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to="/login"
                                    title="Account"
                                    className="sm:hidden p-1.5 rounded-full border border-[#362c24] hover:border-[#ff9d7a] transition-colors flex items-center justify-center bg-[#241d16]"
                                >
                                    <User size={18} className="text-[#dec0b7]" />
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/profile"
                                    title={user.name || user.email}
                                    className="w-8 h-8 rounded-full border border-[#362c24] hover:border-[#ff9d7a] overflow-hidden flex items-center justify-center bg-[#241d16] text-xs font-bold text-[#ff9d7a]"
                                >
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.name || "user"}
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span>{(user.name || user.email || "U")[0]?.toUpperCase()}</span>
                                    )}
                                </Link>
                                <span className="hidden lg:inline text-xs text-[#fbf7ee] max-w-[100px] truncate">
                                    {user.name || user.email}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    title="Log out"
                                    className="p-1.5 sm:px-2.5 sm:py-1 text-xs text-[#dec0b7] hover:text-[#ff9d7a] rounded border border-[#362c24] bg-[#241d16] hover:bg-[#2e241b] transition-colors flex items-center gap-1"
                                >
                                    <LogOut size={14} />
                                    <span className="hidden sm:inline">Log Out</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        className="md:hidden p-2 text-[#dec0b7] hover:text-[#ff9d7a] rounded-full hover:bg-[#241d16] transition-colors"
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Category sub-bar (desktop) */}
            <div className="border-t border-[rgba(212,163,56,0.09)] bg-[#1d1712] hidden sm:block">
                {pathName !== "/profile" && (
                    <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 py-2 overflow-x-auto text-sm">
                        {CATEGORIES.map((cat, i) => (
                            <Link
                                key={cat.label}
                                to={cat.href}
                                className={
                                    i === 0
                                        ? "text-[#ff9d7a] border-b-2 border-[#ff9d7a] font-semibold py-1 whitespace-nowrap"
                                        : "text-[#dec0b7] font-semibold hover:text-[#ff9d7a] py-1 transition-colors whitespace-nowrap"
                                }
                            >
                                {cat.label}
                            </Link>
                        ))}
                        <span className="text-[#362c24]">|</span>
                        <Link
                            to="#directory"
                            className="text-[#e6b445] font-semibold hover:underline flex items-center gap-1 whitespace-nowrap"
                        >
                            <Compass size={14} />
                            <span>64 District Artisan Map</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile menu panel */}
            {mobileOpen && (
                <div className="md:hidden bg-[#1d1712] border-t border-[rgba(212,163,56,0.18)] px-4 py-4 space-y-4">
                    <div className="flex items-center bg-[#1d1712] border border-[#362c24] rounded-lg px-3 py-2">
                        <Search size={18} className="text-[#b8aca0] mr-2 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search craft, weave, or artisan..."
                            className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-[#fbf7ee] placeholder:text-[#b8aca0]/70"
                        />
                    </div>

                    <select
                        className="w-full bg-[#241d16] border border-[#362c24] rounded-lg text-sm text-[#fbf7ee] py-2 px-3"
                        defaultValue={DISTRICTS[0]}
                    >
                        {DISTRICTS.map((d) => (
                            <option key={d}>{d}</option>
                        ))}
                    </select>

                    <div className="flex flex-col gap-1">
                        {CATEGORIES.map((cat) => (
                            <Link
                                key={cat.label}
                                to={cat.href}
                                className="py-2 text-sm text-[#dec0b7] hover:text-[#ff9d7a] border-b border-[#362c24] last:border-none"
                                onClick={() => setMobileOpen(false)}
                            >
                                {cat.label}
                            </Link>
                        ))}
                        <Link
                            to="#directory"
                            className="py-2 text-sm text-[#e6b445] flex items-center gap-1.5"
                            onClick={() => setMobileOpen(false)}
                        >
                            <Compass size={14} />
                            <span>64 District Artisan Map</span>
                        </Link>
                    </div>

                    {/* Auth links in mobile drawer */}
                    {!user ? (
                        <div className="grid grid-cols-2 gap-2">
                            <Link
                                to="/login"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center px-3.5 py-2.5 rounded-lg bg-[#ff9d7a] text-[#451200] text-sm font-semibold"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center px-3.5 py-2.5 rounded-lg border border-[#ff9d7a] text-[#ff9d7a] text-sm font-semibold"
                            >
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                setMobileOpen(false)
                                handleLogout()
                            }}
                            className="flex items-center justify-center gap-1.5 w-full px-3.5 py-2.5 rounded-lg border border-[#ff9d7a]/50 text-[#ff9d7a] text-sm font-semibold"
                        >
                            <LogOut size={16} />
                            <span>Log Out ({user.name || user.email})</span>
                        </button>
                    )}

                    <Link
                        to="#join-maker"
                        className="flex items-center justify-center gap-1.5 w-full px-3.5 py-2.5 rounded-lg bg-[#ff9d7a] text-[#451200] text-sm font-semibold"
                        onClick={() => setMobileOpen(false)}
                    >
                        <Handshake size={16} />
                        <span>Join as Maker</span>
                    </Link>
                </div>
            )}
        </nav>
    )
}

