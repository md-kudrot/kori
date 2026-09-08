import { Award, UserCheck, Phone, Zap, CheckCircle2 } from "lucide-react"

/**
 * JoinMakerBanner — artisan invitation CTA, Kori marketplace
 *
 * Icons: lucide-react
 * Colors: inline Tailwind arbitrary hex values — no config setup needed.
 */

const BENEFITS: string[] = [
    "Direct daily MFS payouts (bKash/Nagad/Rocket)",
    "Free doorstep parcel pickup from your village",
    "Official GI Tag & Heritage Verification Seal",
    "Preserving family lineage with digital documentation"
]

export default function JoinMakerBanner() {
    return (
        <section className="py-12 md:py-24 bg-[#14100c]" id="join-maker">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="bg-gradient-to-br from-[#241a13] via-[#2d1e15] to-[#1e1510] border border-[rgba(212,163,56,0.18)] rounded-2xl p-6 md:p-12 relative overflow-hidden shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Left: copy + CTAs */}
                        <div className="lg:col-span-8 space-y-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2e241b] text-[#ff9d7a] text-xs border border-[#ff9d7a]/20">
                                <Award size={14} className="text-[#e6b445]" />
                                <span>Artisan Empowerment Initiative</span>
                            </span>

                            <h2
                                className="text-2xl md:text-4xl font-bold text-[#fbf7ee]"
                                style={{ fontFamily: "Merriweather, serif" }}
                            >
                                Are you a traditional artisan, handloom weaver, or rural craft guild?
                            </h2>

                            <p className="text-sm md:text-base text-[#dec0b7] max-w-2xl">
                                Sell directly to appreciative cultural patrons across Bangladesh and the global
                                diaspora. We handle professional photography, storytelling, logistics, and instant bKash
                                or Nagad payouts directly to your phone. Zero listing fees.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <a
                                    href="#artisan-apply"
                                    className="h-11 px-6 bg-[#ff9d7a] hover:bg-[#e46f45] text-[#451200] font-semibold text-sm rounded-lg transition-all inline-flex items-center gap-2 shadow-lg"
                                >
                                    <UserCheck size={18} />
                                    <span>Apply as a Verified Maker (কারিগর আবেদন)</span>
                                </a>
                                <a
                                    href="#guild-inquiries"
                                    className="h-11 px-5 border border-[rgba(212,163,56,0.18)] text-[#fbf7ee] hover:bg-[#2e241b] hover:text-[#ff9d7a] font-semibold text-sm rounded-lg transition-colors inline-flex items-center gap-2"
                                >
                                    <Phone size={16} className="text-[#ff9d7a]" />
                                    <span>Call Guild Helpline (09612-KORI-00)</span>
                                </a>
                            </div>
                        </div>

                        {/* Right: benefits list */}
                        <div className="lg:col-span-4 bg-[#1d1712]/90 p-5 rounded-xl border border-[rgba(212,163,56,0.18)] space-y-3 shadow-inner">
                            <h4 className="text-sm font-semibold text-[#fbf7ee] flex items-center gap-1.5">
                                <Zap size={16} className="text-[#ff9d7a]" />
                                <span>Artisan Onboarding Benefits</span>
                            </h4>
                            <ul className="space-y-2 text-sm text-[#dec0b7]">
                                {BENEFITS.map((b) => (
                                    <li key={b} className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-[#e6b445] mt-0.5 shrink-0" />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
