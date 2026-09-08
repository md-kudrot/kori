import { Sparkles, MapPin, Search, CheckCircle, Wallet, ArrowRight, Pin } from "lucide-react"

/**
 * Hero — Kori (করি) marketplace
 *
 * Icons: lucide-react
 * Colors: inline Tailwind arbitrary hex values — no config setup needed.
 *
 * Replace `spotlight.image` with a real artisan photo (Cloudinary/S3 URL)
 * before shipping — it's a placeholder here.
 */

export interface ArtisanSpotlight {
    image: string
    name: string
    role: string
    district: string
    quote: string
    piecesAvailable: number
}

interface HeroProps {
    spotlight?: ArtisanSpotlight
}

const CRAFT_TYPES: string[] = [
    "Jamdani Weaving",
    "Nakshi Kantha Quilting",
    "Terracotta & Pottery",
    "Shital Pati Reed Mats",
    "Cane & Bamboo"
]

const DISTRICTS: string[] = [
    "Sonargaon (Narayanganj)",
    "Tangail (Handloom)",
    "Jamalpur (Kantha)",
    "Bijoypur (Cumilla)",
    "Sylhet (Murta Reed)",
    "Rajshahi (Silk)"
]

const POPULAR_TAGS: string[] = ["Sonargaon", "Jamalpur Kantha", "Bijoypur Clay", "Tangail Sari"]

const DEFAULT_SPOTLIGHT: ArtisanSpotlight = {
    image: "https://placehold.co/640x480/2b231c/dec0b7?text=Artisan+Photo",
    name: "Jahanara Begum",
    role: "4th Generation Dhakai Jamdani Weaver",
    district: "Sonargaon, Narayanganj",
    quote: "প্রতিটা 'terchi' আর 'butidar' নকশা আমার দাদির স্মৃতি থেকে আসে, কোনো কাগজের নকশা ছাড়াই।",
    piecesAvailable: 14
}

export default function Hero({ spotlight = DEFAULT_SPOTLIGHT }: HeroProps) {
    return (
        <section className="relative bg-gradient-to-b from-[#16120e] to-[#14100c] py-12 md:py-24 overflow-hidden border-b border-[rgba(212,163,56,0.18)]">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left: editorial copy + filter bar */}
                    <div className="lg:col-span-7 flex flex-col space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2e241b] border border-[rgba(212,163,56,0.18)] w-max">
                            <Sparkles size={14} className="text-[#e6b445]" />
                            <span className="text-xs font-semibold text-[#f3bf51] tracking-wide">
                                বাংলার ঐতিহ্য, কারিগরের স্পর্শ
                            </span>
                        </div>

                        <h1
                            className="text-4xl md:text-6xl font-bold text-[#fbf7ee] tracking-tight leading-tight"
                            style={{ fontFamily: "Merriweather, serif" }}
                        >
                            Direct from the Hands that Keep Bengal's Heritage Alive
                        </h1>

                        <p className="text-base md:text-lg text-[#dec0b7] max-w-2xl leading-relaxed">
                            Every thread, clay vessel, and reed mat carries generational knowledge from rural cottage
                            workshops across 64 districts. We connect conscious patrons directly to verified master
                            makers with 100% fair-wage transparency.
                        </p>

                        {/* Filter bar */}
                        <div className="bg-[#241d16] p-3 md:p-4 rounded-xl border border-[rgba(212,163,56,0.18)] shadow-2xl mt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="flex flex-col">
                                    <label className="text-xs text-[#b8aca0] mb-1 flex items-center gap-1">
                                        <span className="text-[#ff9d7a]">◆</span>
                                        <span>Craft Discipline</span>
                                    </label>
                                    <select
                                        className="w-full text-sm text-[#fbf7ee] bg-[#1d1712] border border-[#362c24] rounded-lg py-2 px-2.5 focus:border-[#ff9d7a] focus:ring-[#ff9d7a]"
                                        defaultValue={CRAFT_TYPES[0]}
                                    >
                                        {CRAFT_TYPES.map((c) => (
                                            <option key={c} className="bg-[#2e241b]">
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs text-[#b8aca0] mb-1 flex items-center gap-1">
                                        <MapPin size={12} className="text-[#ff9d7a]" />
                                        <span>District / Origin</span>
                                    </label>
                                    <select
                                        className="w-full text-sm text-[#fbf7ee] bg-[#1d1712] border border-[#362c24] rounded-lg py-2 px-2.5 focus:border-[#ff9d7a] focus:ring-[#ff9d7a]"
                                        defaultValue={DISTRICTS[0]}
                                    >
                                        {DISTRICTS.map((d) => (
                                            <option key={d} className="bg-[#2e241b]">
                                                {d}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col justify-end">
                                    <button className="w-full h-11 bg-[#ff9d7a] hover:bg-[#e46f45] text-[#451200] font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                                        <Search size={18} />
                                        <span>Explore Crafts</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-[#362c24] flex flex-wrap items-center gap-2 text-xs text-[#b8aca0]">
                                <span className="font-semibold text-[#fbf7ee]">Popular provenances:</span>
                                {POPULAR_TAGS.map((tag) => (
                                    <a
                                        key={tag}
                                        href={`#${tag.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="px-2.5 py-0.5 rounded-full bg-[#2e241b] border border-[#362c24] hover:border-[#ff9d7a] hover:text-[#ff9d7a] transition-colors"
                                    >
                                        {tag}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Trust snippet */}
                        <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-[#b8aca0]">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-[#e6b445]" />
                                <span>GI Tag Authenticity</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wallet size={18} className="text-[#ff9d7a]" />
                                <span>bKash &amp; Nagad Instant Payouts</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: featured artisan spotlight card */}
                    <div className="lg:col-span-5">
                        <div className="relative bg-[#241d16] p-4 md:p-5 rounded-xl border border-[rgba(212,163,56,0.18)] shadow-2xl">
                            <div className="relative rounded-lg overflow-hidden aspect-[4/3] w-full mb-4 group ring-1 ring-white/5">
                                <img
                                    src={spotlight.image}
                                    alt={spotlight.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                <div className="absolute top-3 left-3 bg-[#120e0a]/90 backdrop-blur-sm border border-[rgba(212,163,56,0.18)] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                                    <span className="w-2 h-2 rounded-full bg-[#e6b445] animate-pulse" />
                                    <span className="text-xs text-[#fbf7ee]">Master Artisan Spotlight</span>
                                </div>

                                <div className="absolute bottom-3 left-3 bg-[#18233a]/90 text-[#fbf7ee] border border-[#243247] px-3 py-1 rounded-md text-xs flex items-center gap-1 backdrop-blur-sm">
                                    <Pin size={12} className="text-[#b0c7f1]" />
                                    <span>{spotlight.district}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3
                                            className="text-xl font-bold text-[#fbf7ee]"
                                            style={{ fontFamily: "Merriweather, serif" }}
                                        >
                                            {spotlight.name}
                                        </h3>
                                        <p className="text-sm text-[#b8aca0]">{spotlight.role}</p>
                                    </div>
                                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e6b445]/15 text-[#e6b445] border border-[#e6b445]/35 text-xs font-semibold shrink-0">
                                        <CheckCircle size={12} />
                                        <span>GI Certified</span>
                                    </div>
                                </div>

                                <blockquote className="text-sm italic text-[#dec0b7] border-l-2 border-[#ff9d7a] pl-3 py-1">
                                    "{spotlight.quote}"
                                </blockquote>

                                <div className="pt-2 flex items-center justify-between border-t border-[#362c24] text-sm">
                                    <span className="text-xs text-[#b8aca0]">
                                        {spotlight.piecesAvailable} pieces available from current loom
                                    </span>
                                    <a
                                        href="#artisan-profile"
                                        className="text-[#ff9d7a] font-semibold hover:underline flex items-center gap-1 shrink-0"
                                    >
                                        <span>Visit Her Workshop</span>
                                        <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
