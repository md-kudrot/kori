import { Users, Map, CreditCard, Truck, ShieldCheck } from "lucide-react"

/**
 * TrustSection — impact & trust metrics band, Kori marketplace
 *
 * Icons: lucide-react
 * Colors: inline Tailwind arbitrary hex values — deep midnight-indigo panel,
 * distinct from the rest of the page's warm terracotta/jute tones.
 */

const METRICS = [
    { icon: Users, value: "1,450+", label: "Verified Rural Artisans" },
    { icon: Map, value: "48", label: "Craft Districts Supported" },
    { icon: CreditCard, value: "100%", label: "Direct Fair Compensation" },
    { icon: Truck, value: "64 Zilas", label: "Cash on Delivery (ক্যাশ অন ডেলিভারি)" },
    { icon: ShieldCheck, value: "GI Seal", label: "Authenticity Provenance Card" }
]

export default function TrustSection({ metrics = METRICS }) {
    return (
        <section className="text-[#fbf7ee] py-12 md:py-24 border-y border-[rgba(212,163,56,0.18)]">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-[#f3bf51] text-xs tracking-wider">A Transparent Value Chain</span>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-[#fbf7ee] mt-1"
                        style={{ fontFamily: "Merriweather, serif" }}
                    >
                        Rooted in Provenance, Fair to the Maker
                    </h2>
                    <p className="text-sm text-[#b8aca0] mt-2">
                        By eliminating predatory middlemen, Kori transfers up to 88% of every sale directly to rural
                        guild accounts.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                    {metrics.map((m, i) => {
                        const Icon = m.icon
                        const isLast = i === metrics.length - 1 && metrics.length % 5 !== 0
                        return (
                            <div
                                key={m.label}
                                className={`p-4 rounded-lg bg-[#141e33] border border-[#b0c7f1]/20 flex flex-col items-center shadow-lg ${
                                    isLast ? "col-span-2 md:col-span-1" : ""
                                }`}
                            >
                                <Icon size={28} className="text-[#f3bf51] mb-2" />
                                <span
                                    className="text-2xl font-bold text-[#f3bf51]"
                                    style={{ fontFamily: "Merriweather, serif" }}
                                >
                                    {m.value}
                                </span>
                                <span className="text-xs text-[#b8aca0] mt-1">{m.label}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
