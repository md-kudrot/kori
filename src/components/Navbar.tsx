import { useState } from "react"
import { Search, Heart, ShoppingBag, User, Menu, X, Handshake, Compass } from "lucide-react"

/**
 * Navbar — Kori (করি) marketplace
 *
 * Icons: lucide-react (yarn add lucide-react)
 * Colors: inline Tailwind arbitrary hex values — no config setup needed.
 */

interface NavbarProps {
    cartCount?: number
    wishlistCount?: number
}

const CATEGORIES: { label: string; href: string }[] = [
    { label: "Jamdani", href: "#jamdani" },
    { label: "Nakshi Kantha", href: "#nakshi-kantha" },
    { label: "Pottery", href: "#pottery" },
    { label: "Shital Pati", href: "#shital-pati" },
    { label: "Bamboo", href: "#bamboo" }
]

const DISTRICTS: string[] = ["All Bangladesh", "Tangail", "Rajshahi", "Jamalpur", "Sylhet", "Sonargaon"]

export default function Navbar({ cartCount = 2, wishlistCount = 3 }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)

    return (
        <nav className="bg-[#16120e]/95 backdrop-blur-md  border-b border-[rgba(212,163,56,0.18)] shadow-xl">
            <div className="flex items-center justify-between px-4 md:px-6 max-w-7xl mx-auto w-full py-3">
                {/* Brand */}
                <div className="flex items-center gap-4">
                    <a href="/" className="flex items-baseline gap-2 group">
                        <span
                            className="text-2xl font-bold text-[#ff9d7a] tracking-tight"
                            style={{ fontFamily: "Merriweather, serif" }}
                        >
                            করি Kori
                        </span>
                        <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#2e241b] text-[#e6b445] border border-[#e6b445]/25">
                            হেরিটেজ ক্রাফট
                        </span>
                    </a>
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
                    <button
                        className="px-2.5 py-1 text-xs text-[#dec0b7] hover:text-[#ff9d7a] rounded border border-[#362c24] bg-[#241d16] hover:bg-[#2e241b] transition-colors"
                        aria-label="Toggle language"
                    >
                        বাংলা / EN
                    </button>

                    <a
                        href="#join-maker"
                        className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#241d16] hover:bg-[#2e241b] text-[#fbf7ee] hover:text-[#ff9d7a] transition-all text-sm font-semibold border border-[rgba(212,163,56,0.18)]"
                    >
                        <Handshake size={16} className="text-[#e6b445]" />
                        <span>Join as Maker</span>
                    </a>

                    <div className="flex items-center gap-2">
                        <a
                            href="#favorites"
                            title="Saved Pieces"
                            className="p-2 text-[#dec0b7] hover:text-[#ff9d7a] rounded-full hover:bg-[#241d16] transition-colors relative"
                        >
                            <Heart size={20} />
                            {wishlistCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#e06d44] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                                    {wishlistCount}
                                </span>
                            )}
                        </a>

                        <a
                            href="#cart"
                            title="Shopping Bag"
                            className="p-2 text-[#dec0b7] hover:text-[#ff9d7a] rounded-full hover:bg-[#241d16] transition-colors relative"
                        >
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#ff9d7a] text-[#451200] text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                                    {cartCount}
                                </span>
                            )}
                        </a>

                        <a
                            href="#profile"
                            title="Account"
                            className="p-1.5 rounded-full border border-[#362c24] hover:border-[#ff9d7a] transition-colors flex items-center justify-center bg-[#241d16]"
                        >
                            <User size={18} className="text-[#dec0b7]" />
                        </a>
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
                <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 py-2 overflow-x-auto text-sm">
                    {CATEGORIES.map((cat, i) => (
                        <a
                            key={cat.label}
                            href={cat.href}
                            className={
                                i === 0
                                    ? "text-[#ff9d7a] border-b-2 border-[#ff9d7a] font-semibold py-1 whitespace-nowrap"
                                    : "text-[#dec0b7] font-semibold hover:text-[#ff9d7a] py-1 transition-colors whitespace-nowrap"
                            }
                        >
                            {cat.label}
                        </a>
                    ))}
                    <span className="text-[#362c24]">|</span>
                    <a
                        href="#directory"
                        className="text-[#e6b445] font-semibold hover:underline flex items-center gap-1 whitespace-nowrap"
                    >
                        <Compass size={14} />
                        <span>64 District Artisan Map</span>
                    </a>
                </div>
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
                            <a
                                key={cat.label}
                                href={cat.href}
                                className="py-2 text-sm text-[#dec0b7] hover:text-[#ff9d7a] border-b border-[#362c24] last:border-none"
                                onClick={() => setMobileOpen(false)}
                            >
                                {cat.label}
                            </a>
                        ))}
                        <a
                            href="#directory"
                            className="py-2 text-sm text-[#e6b445] flex items-center gap-1.5"
                            onClick={() => setMobileOpen(false)}
                        >
                            <Compass size={14} />
                            <span>64 District Artisan Map</span>
                        </a>
                    </div>

                    <a
                        href="#join-maker"
                        className="flex items-center justify-center gap-1.5 w-full px-3.5 py-2.5 rounded-lg bg-[#ff9d7a] text-[#451200] text-sm font-semibold"
                        onClick={() => setMobileOpen(false)}
                    >
                        <Handshake size={16} />
                        <span>Join as Maker</span>
                    </a>
                </div>
            )}
        </nav>
    )
}
