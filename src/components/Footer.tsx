import { MapPin, CreditCard, Wallet, Package } from "lucide-react"

/**
 * Footer — bilingual footer, Kori marketplace
 *
 * Icons: lucide-react
 * Colors: inline Tailwind arbitrary hex values — no config setup needed.
 */

const HERITAGE_LINKS = [
    { label: "Jamdani Weaving", href: "#jamdani" },
    { label: "Nakshi Kantha Embroidery", href: "#nakshi-kantha" },
    { label: "Terracotta Pottery", href: "#pottery" },
    { label: "Shital Pati Mats", href: "#shital-pati" },
    { label: "Cane & Bamboo Fibers", href: "#cane" }
]

const GUILD_LINKS = [
    { label: "Artisan Directory", href: "#directory" },
    { label: "District Craft Map", href: "#district-map" },
    { label: "Impact & Fair Wages", href: "#impact" },
    { label: "Terms & Verification", href: "#verification" },
    { label: "GI Authenticity Papers", href: "#gi-tag" }
]

const TRUST_LINKS = [
    { label: "bKash & Nagad Payments", href: "#mfs" },
    { label: "Cash on Delivery", href: "#cod" },
    { label: "Nationwide 64 Zila Courier", href: "#shipping" },
    { label: "Artisan Craft Exchange Policy", href: "#returns" },
    { label: "Customer Care (সাপোর্ট)", href: "#contact" }
]

export default function Footer() {
    return (
        <footer className="bg-[#0f0c09] border-t border-[rgba(212,163,56,0.18)] text-[#fbf7ee]">
            <div className="w-full px-4 md:px-6 max-w-7xl mx-auto py-12 md:py-24">
                {/* Top grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand & mission */}
                    <div className="lg:col-span-2 space-y-4">
                        <a
                            href="/"
                            className="text-2xl font-bold text-[#ff9d7a] tracking-tight"
                            style={{ fontFamily: "Merriweather, serif" }}
                        >
                            করি Kori
                        </a>
                        <p className="text-sm text-[#dec0b7] max-w-sm">
                            Preserving generational Bangladeshi artisanal provenance. We operate at the intersection of
                            cultural documentation, regenerative craft economies, and rural livelihood dignity.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[#fbf7ee]">
                            <span className="flex items-center gap-1">
                                <MapPin size={14} className="text-[#ff9d7a]" />
                                <span>Dhaka • Sonargaon • Tangail</span>
                            </span>
                        </div>
                    </div>

                    {/* Heritage crafts */}
                    <div className="space-y-3">
                        <h4 className="text-base font-bold text-[#fbf7ee]">Heritage Crafts</h4>
                        <ul className="space-y-2 text-sm">
                            {HERITAGE_LINKS.map((l) => (
                                <li key={l.label}>
                                    <a href={l.href} className="text-[#b8aca0] hover:text-[#ff9d7a] transition-colors">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Artisan guilds */}
                    <div className="space-y-3">
                        <h4 className="text-base font-bold text-[#fbf7ee]">Artisan Guilds</h4>
                        <ul className="space-y-2 text-sm">
                            {GUILD_LINKS.map((l) => (
                                <li key={l.label}>
                                    <a href={l.href} className="text-[#b8aca0] hover:text-[#ff9d7a] transition-colors">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Payment & trust */}
                    <div className="space-y-3">
                        <h4 className="text-base font-bold text-[#fbf7ee]">Payment &amp; Trust</h4>
                        <ul className="space-y-2 text-sm">
                            {TRUST_LINKS.map((l) => (
                                <li key={l.label}>
                                    <a href={l.href} className="text-[#b8aca0] hover:text-[#ff9d7a] transition-colors">
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Payment badges */}
                <div className="pt-6 pb-6 border-t border-[#362c24] flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-[#b8aca0]">Direct Payment Partners:</span>

                    <div className="flex flex-wrap items-center gap-2.5">
                        <div className="h-8 px-3 rounded-md bg-[#241d16] border border-[#362c24] flex items-center gap-1.5 shadow-sm">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E2136E]" />
                            <span className="text-xs font-bold text-[#fbf7ee]">bKash</span>
                        </div>
                        <div className="h-8 px-3 rounded-md bg-[#241d16] border border-[#362c24] flex items-center gap-1.5 shadow-sm">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F7941D]" />
                            <span className="text-xs font-bold text-[#fbf7ee]">Nagad</span>
                        </div>
                        <div className="h-8 px-3 rounded-md bg-[#241d16] border border-[#362c24] flex items-center gap-1.5 shadow-sm">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#8C3494]" />
                            <span className="text-xs font-bold text-[#fbf7ee]">Rocket</span>
                        </div>
                        <div className="h-8 px-3 rounded-md bg-[#241d16] border border-[#362c24] flex items-center gap-1.5 shadow-sm">
                            <CreditCard size={12} className="text-[#b0c7f1]" />
                            <span className="text-xs font-semibold text-[#fbf7ee]">Visa / Master</span>
                        </div>
                        <div className="h-8 px-3 rounded-md bg-[#241d16] border border-[#362c24] flex items-center gap-1.5 shadow-sm">
                            <Wallet size={12} className="text-[#ff9d7a]" />
                            <span className="text-xs font-semibold text-[#fbf7ee]">Cash on Delivery (COD)</span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-6 border-t border-[#362c24] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#b8aca0]">
                    <p className="flex items-center gap-1.5">
                        <Package size={12} />
                        <span>
                            © {new Date().getFullYear()} Kori (করি) Craft Heritage Collective. Preserving generational
                            Bangladeshi artisanal provenance.
                        </span>
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#privacy" className="hover:text-[#ff9d7a] transition-colors">
                            Privacy
                        </a>
                        <a href="#terms" className="hover:text-[#ff9d7a] transition-colors">
                            Terms of Heritage Trade
                        </a>
                        <a href="#sitemap" className="hover:text-[#ff9d7a] transition-colors">
                            Artisan Registry
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
