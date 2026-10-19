import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBasket, Star, Heart, ShoppingCart, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { fetchProducts } from "../lib/api";

/**
 * ProductGrid — "Trending Handcrafted Pieces" section, Kori marketplace
 *
 * Icons: lucide-react
 * Colors: inline Tailwind arbitrary hex values — no config setup needed.
 * Prices are in BDT (৳).
 */

export interface Product {
  id: string;
  name: string;
  artisan: string;
  district: string;
  detail: string;
  badge: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

interface ProductGridProps {
  products?: Product[];
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

const FILTERS: string[] = ["All Pieces", "GI Certified", "Under ৳3,000", "Ready to Ship"];

const PRODUCTS: Product[] = [
  {
    id: "nilambari-sari",
    name: "Nilambari Midnight Silk Jamdani Sari",
    artisan: "Jahanara Begum",
    district: "Narayanganj",
    detail: "Hand-spun Resham",
    badge: "GI Certified",
    price: 14500,
    rating: 4.9,
    reviews: 34,
    image: "https://placehold.co/480x360/2b231c/dec0b7?text=Jamdani+Sari",
  },
  {
    id: "mayur-pankhi-kantha",
    name: "Mayur-Pankhi Embroidered Nakshi Kantha",
    artisan: "Rabeya Craft Collective",
    district: "Jamalpur",
    detail: "3 Months Stitchwork",
    badge: "Women's Guild",
    price: 4800,
    rating: 5.0,
    reviews: 52,
    image: "https://placehold.co/480x360/2b231c/dec0b7?text=Nakshi+Kantha",
  },
  {
    id: "terracotta-carafe-set",
    name: "Terracotta Clay Water Carafe & Tumbler Set",
    artisan: "Narayan Pal",
    district: "Bijoypur",
    detail: "Natural Cool Retention",
    badge: "Lead Free Clay",
    price: 1650,
    rating: 4.8,
    reviews: 29,
    image: "https://placehold.co/480x360/2b231c/dec0b7?text=Terracotta+Set",
  },
  {
    id: "shital-pati-runner",
    name: "Murta Reed Handwoven Shital Pati Floor Runner",
    artisan: "Subrata Das",
    district: "Sylhet",
    detail: "6 ft x 2.5 ft Size",
    badge: "UNESCO Legacy",
    price: 3200,
    rating: 4.9,
    reviews: 18,
    image: "https://placehold.co/480x360/2b231c/dec0b7?text=Shital+Pati",
  },
  {
    id: "brass-teapot-set",
    name: "Engraved Brass Teapot & Spice Container",
    artisan: "Dhamrai Metalcrafts",
    district: "Dhamrai",
    detail: "Pure Bell Brass",
    badge: "Hand Beaten",
    price: 2900,
    rating: 4.9,
    reviews: 41,
    image: "https://placehold.co/480x360/2b231c/dec0b7?text=Brass+Teapot",
  },
  {
    id: "jute-basket-set",
    name: "Jute Braided Storage Basket Set (Set of 3)",
    artisan: "Rangpur Women's Guild",
    district: "Rangpur",
    detail: "100% Biodegradable",
    badge: "Eco Golden Fiber",
    price: 1250,
    rating: 4.7,
    reviews: 64,
    image: "https://placehold.co/480x360/2b231c/dec0b7?text=Jute+Baskets",
  },
];

function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString("en-IN")}`;
}

export default function ProductGrid({
  products: initialProducts,
  onAddToCart,
  onToggleFavorite,
}: ProductGridProps) {
  const [backendProducts, setBackendProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(!initialProducts);
  const [activeFilter, setActiveFilter] = useState<string>(FILTERS[0]);

  const items = initialProducts ?? (backendProducts.length > 0 ? backendProducts : PRODUCTS);

  useEffect(() => {
    if (initialProducts) return;

    let isMounted = true;
    fetchProducts()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setBackendProducts(data);
        }
      })
      .catch((err) => {
        console.warn("Backend not reached, using default catalog:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [initialProducts]);

  const filteredItems = items.filter((p) => {
    if (activeFilter === "GI Certified") {
      return (
        p.badge?.toLowerCase().includes("gi") ||
        p.name?.toLowerCase().includes("jamdani")
      );
    }
    if (activeFilter === "Under ৳3,000") {
      return p.price < 3000;
    }
    if (activeFilter === "Ready to Ship") {
      return true;
    }
    return true;
  });

  return (
    <section className="py-12 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#ff9d7a] text-sm mb-1">
            <ShoppingBasket size={16} />
            <span>Curated Market</span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#fbf7ee]"
            style={{ fontFamily: "Merriweather, serif" }}
          >
            Trending Handcrafted Pieces
          </h2>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={
                f === activeFilter
                  ? "px-3.5 py-1.5 rounded-full bg-[#ff9d7a] text-[#451200] text-sm font-semibold whitespace-nowrap shadow-md"
                  : "px-3.5 py-1.5 rounded-full bg-[#241d16] border border-[#362c24] text-[#fbf7ee] hover:border-[#ff9d7a] text-sm font-semibold whitespace-nowrap transition-colors"
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-[#dec0b7]">
          <Loader2 size={32} className="animate-spin text-[#ff9d7a]" />
          <span className="text-sm">Loading artisan craft pieces from Kori backend...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((p) => (
          <div
            key={p.id}
            className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#2e241b]">
                <Link to={`/products/${p.id}`} className="block w-full h-full">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                  <span className="px-2 py-0.5 rounded-full bg-[#e6b445] text-[#1c1206] text-[11px] font-bold flex items-center gap-1 shadow-md">
                    <CheckCircle size={11} />
                    <span>{p.badge}</span>
                  </span>
                </div>
                <button
                  onClick={() => onToggleFavorite?.(p.id)}
                  title="Save to favorites"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#120e0a]/80 backdrop-blur-sm border border-[#362c24] flex items-center justify-center text-[#b8aca0] hover:text-[#ff9d7a] transition-colors z-10"
                >
                  <Heart size={16} />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-[#b8aca0] mb-1">
                  <span>By {p.artisan}</span>
                  <span className="flex items-center gap-0.5 text-[#f3bf51]">
                    <Star size={12} fill="currentColor" strokeWidth={0} />
                    <strong className="text-[#fbf7ee] font-bold">{p.rating}</strong>
                    <span>({p.reviews})</span>
                  </span>
                </div>
                <Link to={`/products/${p.id}`} className="block">
                  <h3 className="text-lg font-bold text-[#fbf7ee] group-hover:text-[#ff9d7a] transition-colors line-clamp-1">
                    {p.name}
                  </h3>
                </Link>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#2e241b] text-[#dec0b7]">
                    {p.district}
                  </span>
                  <span className="text-xs text-[#b8aca0]">{p.detail}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="pt-3 border-t border-[#362c24] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#b8aca0] block">Direct Artisan Price</span>
                  <span className="text-lg font-bold text-[#ff9d7a]">{formatBDT(p.price)}</span>
                </div>
                <button
                  onClick={() => onAddToCart?.(p.id)}
                  className="h-9 px-4 rounded-lg bg-[#ff9d7a] hover:bg-[#e46f45] text-[#451200] text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-md active:scale-95"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <a
          href="#full-catalog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#ff9d7a]/60 text-[#ff9d7a] hover:bg-[#ff9d7a] hover:text-[#451200] font-semibold transition-all shadow-md"
        >
          <span>Browse Complete 2,400+ Craft Catalog</span>
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}