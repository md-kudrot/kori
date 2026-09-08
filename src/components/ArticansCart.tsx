import { Stars, ArrowRight, CheckCircle, MapPin, ChevronRight } from "lucide-react"

/**
 * ArtisanCards — "Meet the Artisans" section, Kori marketplace
 *
 * Icons: lucide-react
 * Colors: inline Tailwind arbitrary hex values — no config setup needed.
 */

export interface Artisan {
    id: string
    name: string
    title: string
    district: string
    guild: string
    bio: string
    image: string
}

interface ArtisanCardsProps {
    artisans?: Artisan[]
}

const ARTISANS: Artisan[] = [
    {
        id: "abdul-jalil",
        name: "Master Abdul Jalil",
        title: "38 Years Weaving Legacy",
        district: "Tangail",
        guild: "Tangail Weavers Guild",
        bio: "Specializes in reviving Dhakai Muslin thread counts and handloom cotton saris dyed exclusively with river indigo and pomegranate rind.",
        image: "https://placehold.co/400x400/2b231c/dec0b7?text=Abdul+Jalil"
    },
    {
        id: "rabeya-khatun",
        name: "Rabeya Khatun",
        title: "Cooperative Leader (40 Artisans)",
        district: "Jamalpur",
        guild: "Jamalpur Kantha Samiti",
        bio: "Orchestrates a community of 40 rural women embroiderers, turning ancient needlecraft into fair independent livelihoods for their families.",
        image: "https://placehold.co/400x400/2b231c/dec0b7?text=Rabeya+Khatun"
    },
    {
        id: "narayan-pal",
        name: "Narayan Chandra Pal",
        title: "Earthen Kiln Master",
        district: "Bijoypur, Cumilla",
        guild: "Cumilla Potter Colony",
        bio: "Preserves 5 generations of heritage unglazed red terracotta clay drinkware, tea surahis, and architectural relief clay tiles.",
        image: "https://placehold.co/400x400/2b231c/dec0b7?text=Narayan+Pal"
    },
    {
        id: "subrata-das",
        name: "Subrata Das",
        title: "UNESCO Shital Pati Inscriber",
        district: "Sylhet",
        guild: "Sylhet Reed Guild",
        bio: "Wears the honor of UNESCO intangible heritage inscription, crafting silky cool mats from water-loving Murta cane that last for decades.",
        image: "https://placehold.co/400x400/2b231c/dec0b7?text=Subrata+Das"
    }
]

export default function ArtisanCards({ artisans = ARTISANS }: ArtisanCardsProps) {
    return (
        <section className="py-12 md:py-24 bg-[#1d1712] border-y border-[rgba(212,163,56,0.18)]">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[#e6b445] text-sm mb-1">
                            <Stars size={16} />
                            <span>Master Custodians</span>
                        </div>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-[#fbf7ee]"
                            style={{ fontFamily: "Merriweather, serif" }}
                        >
                            Meet the Artisans <span className="font-normal text-[#b8aca0]">(কারিগরদের গল্প)</span>
                        </h2>
                    </div>
                    <a
                        href="#artisan-directory"
                        className="text-[#ff9d7a] font-semibold hover:underline flex items-center gap-1.5 self-start md:self-auto shrink-0"
                    >
                        <span>Explore All 1,450+ Guild Members</span>
                        <ArrowRight size={14} />
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {artisans.map((a) => (
                        <div
                            key={a.id}
                            className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl p-4 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-shadow ring-1 ring-white/5"
                        >
                            <div>
                                <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                                    <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#e6b445] text-[#1c1206] text-[11px] font-bold flex items-center gap-1 shadow-md">
                                        <CheckCircle size={11} />
                                        <span>Verified</span>
                                    </div>
                                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#10192a]/85 border border-[#243247] text-[#fbf7ee] text-[11px] flex items-center gap-1">
                                        <MapPin size={11} className="text-[#b0c7f1]" />
                                        <span>{a.district}</span>
                                    </div>
                                </div>

                                <h3
                                    className="text-lg font-bold text-[#fbf7ee]"
                                    style={{ fontFamily: "Merriweather, serif" }}
                                >
                                    {a.name}
                                </h3>
                                <p className="text-xs text-[#ff9d7a] mt-0.5">{a.title}</p>
                                <p className="text-sm text-[#dec0b7] mt-2.5">{a.bio}</p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-[#362c24] flex items-center justify-between">
                                <span className="text-xs text-[#b8aca0]">{a.guild}</span>
                                <a
                                    href={`#workshop-${a.id}`}
                                    className="text-xs font-semibold text-[#ff9d7a] hover:underline flex items-center gap-1 shrink-0"
                                >
                                    <span>View Workshop</span>
                                    <ChevronRight size={12} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
