import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  ShieldCheck,
  MapPin,
  Star,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  Plus,
  Minus,
  Award,
  Loader2,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchProductById, fetchProducts } from "../lib/api";
import type { Product } from "./ProductsGrid";

// Fallback catalog in case backend is offline
const FALLBACK_PRODUCTS: Record<string, Partial<Product> & { description?: string; materials?: string[]; specs?: Record<string, string> }> = {
  "nilambari-sari": {
    id: "nilambari-sari",
    name: "Nilambari Midnight Silk Jamdani Sari",
    artisan: "Jahanara Begum",
    district: "Narayanganj",
    detail: "Hand-spun Resham",
    badge: "GI Certified",
    price: 14500,
    rating: 4.9,
    reviews: 34,
    image: "https://placehold.co/800x600/2b231c/dec0b7?text=Jamdani+Sari+Close-up",
    description:
      "A masterpiece of intangible cultural heritage. Woven exclusively on traditional pit looms in Sonargaon along the Shitalakshya river. The delicate midnight indigo hue is paired with intricate supplementary-weft floral motifs, evoking the historic Dhakai Jamdani tradition that flourished in royal courts.",
    materials: ["Pure Mulberry Silk (Resham)", "Organic River Indigo Dye", "Gold Zari Accents"],
    specs: {
      Length: "5.5 meters with blouse piece",
      Weave: "Fine Count 100s Supplementary Weft",
      Origin: "Sonargaon, Narayanganj",
      "Crafting Time": "45 Days of Handloom Weaving",
    },
  },
  "mayur-pankhi-kantha": {
    id: "mayur-pankhi-kantha",
    name: "Mayur-Pankhi Embroidered Nakshi Kantha",
    artisan: "Rabeya Craft Collective",
    district: "Jamalpur",
    detail: "3 Months Stitchwork",
    badge: "Women's Guild",
    price: 4800,
    rating: 5.0,
    reviews: 52,
    image: "https://placehold.co/800x600/2b231c/dec0b7?text=Nakshi+Kantha+Close-up",
    description:
      "Intricately quilted by hand by artisan mothers in rural Jamalpur. Each peacock motif ('Mayur-Pankhi') tells a lyrical story of seasonal monsoon rains, river life, and pastoral harmony using traditional running stitch and backstitch embroidery.",
    materials: ["100% Upcycled Natural Cotton", "Vegetable-dyed Embroidery Floss"],
    specs: {
      Dimensions: "7.5 ft x 5 ft (Double Bed / Throw)",
      Technique: "Traditional Running Stitch (Nakshi)",
      Origin: "Jamalpur Women's Cooperative",
      "Crafting Time": "90 Days of Continuous Hand Stitchwork",
    },
  },
  "terracotta-carafe-set": {
    id: "terracotta-carafe-set",
    name: "Terracotta Clay Water Carafe & Tumbler Set",
    artisan: "Narayan Pal",
    district: "Bijoypur",
    detail: "Natural Cool Retention",
    badge: "Lead Free Clay",
    price: 1650,
    rating: 4.8,
    reviews: 29,
    image: "https://placehold.co/800x600/2b231c/dec0b7?text=Terracotta+Set+Close-up",
    description:
      "Hand-thrown from natural riverbed alluvial clay collected from Lalmai hills. Naturally porous, this carafe keeps water refreshing and cool through evaporative cooling without electricity, infusing a subtle pleasant earthen aroma.",
    materials: ["Natural Alluvial River Clay", "Lead-free & Unglazed", "Wood-fired Kiln Finish"],
    specs: {
      Capacity: "1.2 Liters Carafe + 2 x 250ml Tumblers",
      Finish: "Smooth Burnished Terracotta",
      Origin: "Bijoypur Clay Colony, Cumilla",
      Care: "Rinse with lukewarm water, no chemical detergents",
    },
  },
  "shital-pati-runner": {
    id: "shital-pati-runner",
    name: "Murta Reed Handwoven Shital Pati Floor Runner",
    artisan: "Subrata Das",
    district: "Sylhet",
    detail: "6 ft x 2.5 ft Size",
    badge: "UNESCO Legacy",
    price: 3200,
    rating: 4.9,
    reviews: 18,
    image: "https://placehold.co/800x600/2b231c/dec0b7?text=Shital+Pati+Close-up",
    description:
      "Recognized by UNESCO as Intangible Cultural Heritage of Humanity, Shital Pati literally means 'Cool Mat'. Crafted from the glossy outer skin of swamp Murta reeds, it is silky smooth, naturally water-resistant, and remains cool to the touch even during peak summer.",
    materials: ["Wild-harvested Murta Reed (Schumannianthus dichotomus)", "Natural Cane Splints"],
    specs: {
      Dimensions: "6 ft x 2.5 ft",
      Origin: "Sylhet Wetland Belt",
      Durability: "Decades with simple damp-cloth wiping",
      Recognition: "UNESCO Inscribed Heritage",
    },
  },
  "brass-teapot-set": {
    id: "brass-teapot-set",
    name: "Engraved Brass Teapot & Spice Container",
    artisan: "Dhamrai Metalcrafts",
    district: "Dhamrai",
    detail: "Pure Bell Brass",
    badge: "Hand Beaten",
    price: 2900,
    rating: 4.9,
    reviews: 41,
    image: "https://placehold.co/800x600/2b231c/dec0b7?text=Brass+Teapot+Close-up",
    description:
      "Forged with the centuries-old lost-wax and beaten brass methods by Dhamrai smiths. Decorated with etched floral jaali patterns and an ergonomic arched handle, perfect for brewing traditional spiced milk tea or heirloom home decor.",
    materials: ["High-grade Bell Brass (Kasha / Pitol)", "Hand-etched Motifs"],
    specs: {
      Capacity: "850ml Teapot + Matching Storage Cannister",
      Weight: "1.1 kg",
      Origin: "Dhamrai Metal Colony",
      Care: "Clean with lemon and salt or tamarind paste",
    },
  },
  "jute-basket-set": {
    id: "jute-basket-set",
    name: "Jute Braided Storage Basket Set (Set of 3)",
    artisan: "Rangpur Women's Guild",
    district: "Rangpur",
    detail: "100% Biodegradable",
    badge: "Eco Golden Fiber",
    price: 1250,
    rating: 4.7,
    reviews: 64,
    image: "https://placehold.co/800x600/2b231c/dec0b7?text=Jute+Baskets+Close-up",
    description:
      "Crafted from premium Bangladesh Golden Jute by rural women artisans in Rangpur. These nesting storage baskets combine sturdy coiled construction with natural rustic texture, providing an eco-friendly organizational touch to modern living spaces.",
    materials: ["100% Natural Golden Jute Fiber", "Organic Cotton Stitching"],
    specs: {
      Dimensions: "Small (7\"), Medium (9\"), Large (11\")",
      Weight: "700g total set",
      Origin: "Rangpur Craft Guild",
      Eco: "100% Plastic-Free & Biodegradable",
    },
  },
};

function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString("en-IN")}`;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"story" | "specs" | "artisan">("story");
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!id) return;


    let isMounted = true;

    // Fetch from backend with graceful fallback
    fetchProductById(id)
      .then((data) => {
        if (!isMounted) return;
        if (data) {
          setProduct(data);
          setSelectedImage(data.image);
        } else if (FALLBACK_PRODUCTS[id]) {
          const fallback = FALLBACK_PRODUCTS[id] as Product;
          setProduct(fallback);
          setSelectedImage(fallback.image);
        } else {
          setProduct(null);
        }
      })
      .catch((err) => {
        console.warn("Failed to load from backend, checking fallback:", err);
        if (isMounted) {
          if (FALLBACK_PRODUCTS[id]) {
            const fallback = FALLBACK_PRODUCTS[id] as Product;
            setProduct(fallback);
            setSelectedImage(fallback.image);
          } else {
            setProduct(null);
          }
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // Load related items
    fetchProducts()
      .then((items) => {
        if (isMounted && items && items.length > 0) {
          setRelatedProducts(items.filter((item) => item.id !== id).slice(0, 3));
        }
      })
      .catch(() => {
        // Ignore related fetch failure
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    toast.success(
      `Added ${quantity} × "${product.name}" to your bag!`,
      {
        icon: "🛍️",
        style: {
          borderRadius: "10px",
          background: "#241d16",
          color: "#fbf7ee",
          border: "1px solid rgba(212,163,56,0.3)",
        },
      }
    );
  }

  function handleBuyNow() {
    if (!product) return;
    toast.success("Proceeding to secure checkout...", { icon: "💳" });
  }

  function handleToggleWishlist() {
    setIsWishlisted((prev) => {
      const next = !prev;
      if (next) {
        toast.success("Saved to your wishlist!", { icon: "❤️" });
      } else {
        toast("Removed from wishlist", { icon: "🤍" });
      }
      return next;
    });
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this authentic handcrafted ${product?.name} on Kori!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  }

  if (loading) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-4 text-[#dec0b7]">
        <Loader2 size={36} className="animate-spin text-[#ff9d7a]" />
        <p className="text-base font-medium">Retrieving artisanal craft details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#241d16] border border-[#362c24] flex items-center justify-center text-[#ff9d7a] mb-4">
          <Award size={32} />
        </div>
        <h1 className="text-2xl font-bold text-[#fbf7ee] mb-2" style={{ fontFamily: "Merriweather, serif" }}>
          Craft Piece Not Found
        </h1>
        <p className="text-sm text-[#b8aca0] mb-6">
          The requested craft piece may have been purchased by another patron or is currently being restocked by the artisan guild.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff9d7a] hover:bg-[#e46f45] text-[#451200] font-semibold text-sm transition-all"
        >
          <ArrowLeft size={16} />
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const fallbackData = FALLBACK_PRODUCTS[product.id] || {};
  const description =
    product.detail && product.detail.length > 50
      ? product.detail
      : fallbackData.description ||
        `Each piece of ${product.name} is meticulously handcrafted in ${product.district} using traditional Bengal cottage techniques passed down through generations. Certified for authenticity and direct artisan compensation.`;

  const materials =
    fallbackData.materials || [
      "100% Traditional Raw Materials",
      "Handcrafted with Natural Dyes/Clays",
      "Ethically Sourced & Fair-Wage Certified",
    ];

  const specs = fallbackData.specs || {
    Origin: `${product.district}, Bangladesh`,
    Maker: product.artisan,
    Quality: product.badge || "Verified Handcrafted",
    Shipping: "Insured transit across 64 districts",
  };

  const images = [
    product.image,
    `https://placehold.co/800x600/231b14/dec0b7?text=${encodeURIComponent(product.district + " Workshop")}`,
    `https://placehold.co/800x600/281f18/dec0b7?text=${encodeURIComponent("Craft Motif Close-Up")}`,
  ];

  return (
    <div className="min-h-screen bg-[#14100c] text-[#fbf7ee] py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#362c24] pb-4">
          <div className="flex items-center gap-2 text-sm text-[#b8aca0]">
            <Link to="/" className="hover:text-[#ff9d7a] transition-colors flex items-center gap-1.5">
              <ArrowLeft size={15} />
              <span>Catalog</span>
            </Link>
            <span>/</span>
            <span className="text-[#dec0b7]">{product.district}</span>
            <span>/</span>
            <span className="text-[#ff9d7a] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-[#241d16] border border-[#362c24] hover:border-[#ff9d7a]/50 text-[#b8aca0] hover:text-[#ff9d7a] transition-colors"
              title="Share this craft"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-lg bg-[#241d16] border transition-colors ${
                isWishlisted
                  ? "border-red-500/50 text-red-400 bg-red-950/20"
                  : "border-[#362c24] hover:border-[#ff9d7a]/50 text-[#b8aca0] hover:text-[#ff9d7a]"
              }`}
              title="Save to favorites"
            >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#241d16] border border-[rgba(212,163,56,0.18)] shadow-2xl group">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full bg-[#e6b445] text-[#1c1206] text-xs font-bold flex items-center gap-1.5 shadow-xl">
                  <Award size={13} />
                  <span>{product.badge || "Heritage Craft"}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-[#120e0a]/85 backdrop-blur-md border border-[#362c24] text-[#fbf7ee] text-xs font-medium flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#ff9d7a]" />
                  <span>{product.district}</span>
                </span>
              </div>

              {/* Verified seal */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-[#14100c]/90 backdrop-blur-md border border-[rgba(212,163,56,0.25)] flex items-center gap-2 text-xs text-[#dec0b7]">
                <ShieldCheck size={16} className="text-[#e6b445]" />
                <span>Direct Artisan Guild Provenance</span>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    (selectedImage || product.image) === img
                      ? "border-[#ff9d7a] ring-2 ring-[#ff9d7a]/20 scale-[0.98]"
                      : "border-[#362c24] hover:border-[#ff9d7a]/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#362c24]">
              <div className="bg-[#241d16] p-3 rounded-xl border border-[#362c24] flex items-center gap-2.5">
                <Truck size={18} className="text-[#ff9d7a] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#fbf7ee]">Safe Transit</div>
                  <div className="text-[#b8aca0]">Insured packing</div>
                </div>
              </div>
              <div className="bg-[#241d16] p-3 rounded-xl border border-[#362c24] flex items-center gap-2.5">
                <Sparkles size={18} className="text-[#e6b445] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#fbf7ee]">100% Genuine</div>
                  <div className="text-[#b8aca0]">GI sealed paper</div>
                </div>
              </div>
              <div className="bg-[#241d16] p-3 rounded-xl border border-[#362c24] flex items-center gap-2.5">
                <RotateCcw size={18} className="text-[#ff9d7a] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#fbf7ee]">7-Day Return</div>
                  <div className="text-[#b8aca0]">Craft exchange</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Specs & Purchase CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Maker attribution */}
              <div className="flex items-center gap-2 text-xs text-[#b8aca0]">
                <span>Crafted by master artisan</span>
                <span className="font-semibold text-[#ff9d7a] underline decoration-[#ff9d7a]/30">
                  {product.artisan}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-2xl md:text-3xl font-bold text-[#fbf7ee] leading-snug tracking-tight"
                style={{ fontFamily: "Merriweather, serif" }}
              >
                {product.name}
              </h1>

              {/* Ratings and review badge */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-[#f3bf51] font-bold">
                  <Star size={16} fill="currentColor" strokeWidth={0} />
                  <span>{product.rating}</span>
                </div>
                <span className="text-[#362c24]">|</span>
                <span className="text-[#b8aca0] text-xs">
                  <strong>{product.reviews}</strong> verified patron reviews
                </span>
                <span className="text-[#362c24]">|</span>
                <span className="text-xs text-[#e6b445] bg-[#2e241b] px-2 py-0.5 rounded border border-[#e6b445]/20">
                  {product.detail}
                </span>
              </div>

              {/* Pricing Box */}
              <div className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl p-5 shadow-xl space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-[#b8aca0] block uppercase tracking-wider">
                      Fair-Wage Direct Price
                    </span>
                    <span className="text-3xl font-bold text-[#ff9d7a]">
                      {formatBDT(product.price)}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#102b1c] text-[#48db85] border border-[#48db85]/30">
                    In Stock (Ready to Ship)
                  </span>
                </div>

                <div className="text-xs text-[#dec0b7] pt-3 border-t border-[#362c24] flex items-center gap-2">
                  <ShieldCheck size={15} className="text-[#e6b445] shrink-0" />
                  <span>
                    88% of your payment is disbursed directly to the artisan cooperative fund in {product.district}.
                  </span>
                </div>
              </div>

              {/* Quick specs overview */}
              <div className="space-y-2 text-xs text-[#b8aca0]">
                <div className="flex justify-between py-1.5 border-b border-[#362c24]/50">
                  <span>Geographic Provenance:</span>
                  <span className="text-[#fbf7ee] font-medium">{product.district}, Bangladesh</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#362c24]/50">
                  <span>Artisan Custodian:</span>
                  <span className="text-[#fbf7ee] font-medium">{product.artisan}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#362c24]/50">
                  <span>Authenticity Seal:</span>
                  <span className="text-[#e6b445] font-semibold">{product.badge || "Verified Handcrafted"}</span>
                </div>
              </div>

              {/* Quantity Picker & Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#b8aca0]">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#362c24] rounded-lg bg-[#1d1712] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 text-[#b8aca0] hover:text-[#ff9d7a] hover:bg-[#241d16] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-bold text-[#fbf7ee] select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 text-[#b8aca0] hover:text-[#ff9d7a] hover:bg-[#241d16] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-xs text-[#b8aca0]">
                    Total: <strong className="text-[#ff9d7a]">{formatBDT(product.price * quantity)}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="h-12 rounded-xl bg-[#2e241b] hover:bg-[#3d2e20] text-[#fbf7ee] hover:text-[#ff9d7a] border border-[#ff9d7a]/30 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="h-12 rounded-xl bg-[#ff9d7a] hover:bg-[#e46f45] text-[#451200] font-semibold text-sm flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98]"
                  >
                    <span>Instant Checkout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Artisan Profile Callout */}
            <div className="bg-[#1d1712] rounded-xl p-4 border border-[rgba(212,163,56,0.18)] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#2e241b] border-2 border-[#ff9d7a] shrink-0 flex items-center justify-center text-lg font-bold text-[#ff9d7a]">
                {product.artisan[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-[#e6b445] font-semibold">Master Artisan</div>
                <div className="text-sm font-bold text-[#fbf7ee] truncate">{product.artisan}</div>
                <div className="text-xs text-[#b8aca0] truncate">Guild of {product.district} Craftsmen</div>
              </div>
              <Link
                to="/#meet-artisans"
                className="text-xs text-[#ff9d7a] hover:underline font-semibold flex items-center gap-1 shrink-0"
              >
                <span>View Story</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Craft Story, Materials, Specs */}
        <div className="pt-8 border-t border-[#362c24] space-y-6">
          <div className="flex items-center gap-4 border-b border-[#362c24] overflow-x-auto">
            <button
              onClick={() => setActiveTab("story")}
              className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "story"
                  ? "border-[#ff9d7a] text-[#ff9d7a]"
                  : "border-transparent text-[#b8aca0] hover:text-[#fbf7ee]"
              }`}
            >
              The Craft Story & Heritage
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "specs"
                  ? "border-[#ff9d7a] text-[#ff9d7a]"
                  : "border-transparent text-[#b8aca0] hover:text-[#fbf7ee]"
              }`}
            >
              Materials & Specifications
            </button>
            <button
              onClick={() => setActiveTab("artisan")}
              className={`pb-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "artisan"
                  ? "border-[#ff9d7a] text-[#ff9d7a]"
                  : "border-transparent text-[#b8aca0] hover:text-[#fbf7ee]"
              }`}
            >
              Artisan Guild Verification
            </button>
          </div>

          <div className="bg-[#1d1712] border border-[rgba(212,163,56,0.18)] rounded-2xl p-6 md:p-8">
            {activeTab === "story" && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-xl font-bold text-[#fbf7ee]" style={{ fontFamily: "Merriweather, serif" }}>
                  Generational Craftsmanship from {product.district}
                </h3>
                <p className="text-sm md:text-base text-[#dec0b7] leading-relaxed">
                  {description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="bg-[#241d16] p-4 rounded-xl border border-[#362c24]">
                    <div className="text-xs font-bold uppercase text-[#ff9d7a] mb-1">
                      100% Handcrafted Technique
                    </div>
                    <p className="text-xs text-[#b8aca0]">
                      No automated assembly or synthetic fast-fashion imitations. Shaped by master hands honoring time-tested Bengal guilds.
                    </p>
                  </div>
                  <div className="bg-[#241d16] p-4 rounded-xl border border-[#362c24]">
                    <div className="text-xs font-bold uppercase text-[#e6b445] mb-1">
                      Authenticity Provenance Card
                    </div>
                    <p className="text-xs text-[#b8aca0]">
                      Includes an individually signed certificate from the artisan mentioning loom hours, date of finish, and district guild registry.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-[#ff9d7a] uppercase tracking-wider mb-4">
                    Product Specifications
                  </h4>
                  <dl className="divide-y divide-[#362c24] text-sm">
                    {Object.entries(specs).map(([key, val]) => (
                      <div key={key} className="py-2.5 flex justify-between">
                        <dt className="text-[#b8aca0]">{key}</dt>
                        <dd className="text-[#fbf7ee] font-medium text-right">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#ff9d7a] uppercase tracking-wider mb-4">
                    Materials & Care
                  </h4>
                  <ul className="space-y-2.5 text-sm text-[#dec0b7]">
                    {materials.map((mat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check size={16} className="text-[#e6b445] shrink-0" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "artisan" && (
              <div className="space-y-4 max-w-2xl">
                <h4 className="text-sm font-bold text-[#ff9d7a] uppercase tracking-wider">
                  Artisan Guild Verification
                </h4>
                <p className="text-sm text-[#dec0b7] leading-relaxed">
                  Every artisan selling through Kori is verified by regional weaver or craft societies. We enforce a zero-middleman policy ensuring fair compensation, healthcare security, and loom raw material subsidies for craft families.
                </p>
                <div className="p-4 rounded-xl bg-[#241d16] border border-[#362c24] flex items-center gap-3">
                  <ShieldCheck size={24} className="text-[#48db85]" />
                  <div className="text-xs text-[#b8aca0]">
                    <strong className="text-[#fbf7ee] block">Verified Craftsman of {product.district}</strong>
                    Guild ID: KORI-ART-{product.id.slice(0, 8).toUpperCase()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products from the Catalog */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-[#362c24] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-[#ff9d7a] uppercase tracking-widest font-semibold mb-1">
                  More from the Guild
                </div>
                <h3 className="text-2xl font-bold text-[#fbf7ee]" style={{ fontFamily: "Merriweather, serif" }}>
                  You May Also Admire
                </h3>
              </div>
              <Link
                to="/"
                className="text-xs text-[#ff9d7a] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Full Catalog</span>
                <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/products/${rel.id}`}
                  className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#ff9d7a]/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#2e241b]">
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#e6b445] text-[#1c1206] text-[10px] font-bold">
                        {rel.badge}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-[#b8aca0] mb-1">By {rel.artisan} ({rel.district})</div>
                      <h4 className="text-sm font-bold text-[#fbf7ee] group-hover:text-[#ff9d7a] transition-colors line-clamp-1">
                        {rel.name}
                      </h4>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-between border-t border-[#362c24] mt-2 pt-3">
                    <span className="text-sm font-bold text-[#ff9d7a]">{formatBDT(rel.price)}</span>
                    <span className="text-xs text-[#b8aca0] group-hover:text-[#ff9d7a] flex items-center gap-1">
                      <span>Inspect</span>
                      <ArrowLeft size={12} className="rotate-180" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
