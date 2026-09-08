import { Compass, ArrowRight } from "lucide-react"

/**
 * CraftCategories — Kori (করি) marketplace
 *
 * Icons: lucide-react
 * Colors: inline Tailwind arbitrary hex values — no config setup needed.
 */

export interface CraftCategory {
    id: string
    name: string
    nameBn: string
    region: string
    badge: string
    description: string
    stat: string
    image: string
}

interface CraftCategoriesProps {
    categories?: CraftCategory[]
}

const CATEGORIES: CraftCategory[] = [
    {
        id: "jamdani",
        name: "Jamdani Handloom",
        nameBn: "জামদানি",
        region: "Sonargaon & Rupganj (Narayanganj)",
        badge: "GI Tag Heritage",
        description: "Discontinuous supplementary weft technique creating feather-light, breathable ceremonial attire.",
        stat: "280+ Active Looms",
        image: "https://placehold.co/640x400/2b231c/dec0b7?text=Jamdani"
    },
    {
        id: "nakshi-kantha",
        name: "Nakshi Kantha",
        nameBn: "নকশী কাঁথা",
        region: "Jamalpur & Jashore",
        badge: "Folk Embroidery",
        description:
            "Layered upcycled vintage cotton stitched with narrative folkloric motifs that chronicle women's family lives.",
        stat: "190+ Artisan Mothers",
        image: "https://placehold.co/640x400/2b231c/dec0b7?text=Nakshi+Kantha"
    },
    {
        id: "pottery",
        name: "Terracotta & Clay",
        nameBn: "পোড়ামাটি ও মৃৎশিল্প",
        region: "Rayerbazar & Bijoypur (Cumilla)",
        badge: "Earthen Kiln",
        description:
            "All-natural alluvial clay fired in wood-chip kilns, providing natural evaporative water cooling and rustic charm.",
        stat: "110+ Potter Families",
        image: "https://placehold.co/640x400/2b231c/dec0b7?text=Pottery"
    },
    {
        id: "shital-pati",
        name: "Shital Pati Mats",
        nameBn: "শীতল পাটি",
        region: "Sylhet & Tangail",
        badge: "UNESCO Inscribed",
        description:
            "Woven from hand-sliced Murta wetland reed bark, naturally cooling to the touch in humid tropical climates.",
        stat: "85+ Reed Craftsmen",
        image: "https://placehold.co/640x400/2b231c/dec0b7?text=Shital+Pati"
    },
    {
        id: "bamboo",
        name: "Cane, Bamboo & Jute",
        nameBn: "বাঁশ, বেত ও পাট",
        region: "Bogra & Rangpur",
        badge: "Sustainable Fibers",
        description:
            "Eco-conscious daily essentials and homewares woven from golden jute fiber and mature Muli bamboo.",
        stat: "340+ Fiber Weavers",
        image: "https://placehold.co/640x400/2b231c/dec0b7?text=Bamboo"
    },
    {
        id: "brass",
        name: "Brass & Bell Metal",
        nameBn: "কাঁসা ও পিতল",
        region: "Dhamrai & Old Dhaka",
        badge: "Lost-Wax Casting",
        description:
            "Centuries-old lost-wax casting and hand-beaten bell metal cookware celebrated for therapeutic and acoustic purity.",
        stat: "45+ Master Smiths",
        image: "https://placehold.co/640x400/2b231c/dec0b7?text=Brass"
    }
]

export default function CraftCategories({ categories = CATEGORIES }: CraftCategoriesProps) {
    return (
        <section className="py-12 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[#ff9d7a] text-sm mb-1">
                        <Compass size={16} />
                        <span>Craft Taxonomy &amp; Geography</span>
                    </div>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-[#fbf7ee]"
                        style={{ fontFamily: "Merriweather, serif" }}
                    >
                        Explore Bengal's Generational Crafts
                    </h2>
                </div>
                <p className="text-sm text-[#b8aca0] max-w-md">
                    Curated across traditional craft guilds where techniques remain uncompromised by modern mechanized
                    reproduction.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <a
                        key={cat.id}
                        href={`#${cat.id}`}
                        className="group bg-[#241d16] border border-[rgba(212,163,56,0.18)] hover:border-[#ff9d7a]/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 right-3 bg-[#120e0a]/90 px-2.5 py-1 rounded-full text-xs text-[#e6b445] backdrop-blur-sm border border-[rgba(212,163,56,0.18)]">
                                {cat.badge}
                            </span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="text-xs text-[#ff9d7a] font-semibold mb-1">{cat.region}</div>
                                <h3 className="text-xl font-bold text-[#fbf7ee] group-hover:text-[#ff9d7a] transition-colors flex items-center justify-between">
                                    <span style={{ fontFamily: "Merriweather, serif" }}>{cat.name}</span>
                                    <span className="text-sm font-normal text-[#b8aca0]">{cat.nameBn}</span>
                                </h3>
                                <p className="text-sm text-[#dec0b7] mt-2">{cat.description}</p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-[#362c24] flex items-center justify-between text-xs">
                                <span className="text-[#b8aca0]">{cat.stat}</span>
                                <span className="text-[#ff9d7a] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Browse Collection <ArrowRight size={12} />
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}
