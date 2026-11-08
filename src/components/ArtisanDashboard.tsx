import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  PlusCircle,
  TrendingUp,
  MapPin,
  Sparkles,
  Trash2,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  Layers,
  Award,
  DollarSign
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import { fetchProducts, createProduct, deleteProduct } from "../lib/api";
import type { Product } from "./ProductsGrid";

const CRAFT_CATEGORIES = [
  "Jamdani",
  "Nakshi Kantha",
  "Pottery",
  "Shital Pati",
  "Bamboo & Cane",
  "Brass & Metalcraft",
  "Jute Crafts",
  "Wood Carving"
];

const DISTRICTS = [
  "Tangail",
  "Narayanganj",
  "Jamalpur",
  "Cumilla",
  "Sylhet",
  "Dhamrai",
  "Rangpur",
  "Rajshahi",
  "Sonargaon",
  "Khulna",
  "Barishal",
  "Chattogram"
];

const BADGE_OPTIONS = [
  "GI Certified",
  "UNESCO Heritage",
  "Women's Guild",
  "Lead Free Clay",
  "Natural Cool",
  "Artisan Handcrafted",
  "Pure Silk",
  "Hand Beaten"
];

export default function ArtisanDashboard() {
  const navigate = useNavigate();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user as { id?: string; name?: string; email?: string; role?: string } | undefined;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New Craft Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CRAFT_CATEGORIES[0]);
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [detail, setDetail] = useState("");
  const [badge, setBadge] = useState(BADGE_OPTIONS[0]);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // Guard access
  useEffect(() => {
    if (!sessionLoading) {
      if (!user) {
        toast.error("Please sign in as an artisan to access dashboard");
        navigate("/login?callbackUrl=/artisan");
      }
    }
  }, [sessionLoading, user, navigate]);

  const loadArtisanProducts = async () => {
    try {
      setLoading(true);
      // Fetch all products or artisan specific products
      const data = await fetchProducts(user?.id ? { artisanId: user.id } : undefined);
      // If none filtered by artisanId, filter in memory or display list
      const artisanItems = user?.id 
        ? data.filter((p: any) => p.artisanId === user.id || p.artisan === user.name)
        : data;
      setProducts(artisanItems.length > 0 ? artisanItems : data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch your crafts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadArtisanProducts();
    }
  }, [user?.id]);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      toast.error("Title and price are required");
      return;
    }

    try {
      setSubmitting(true);
      const newCraft = await createProduct({
        name: name.trim(),
        category,
        district,
        detail: detail.trim() || "Handmade Artisan Quality",
        badge,
        price: Number(price),
        image: image.trim() || "https://placehold.co/480x360/2b231c/dec0b7?text=" + encodeURIComponent(category),
      });

      toast.success("Craft listed successfully on Kori!");
      setProducts((prev) => [newCraft, ...prev]);
      setIsModalOpen(false);

      // Reset form
      setName("");
      setDetail("");
      setPrice("");
      setImage("");
    } catch (err: any) {
      toast.error(err.message || "Failed to list craft");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, craftName: string) => {
    if (!window.confirm(`Are you sure you want to unlist "${craftName}"?`)) return;

    try {
      await deleteProduct(id);
      toast.success("Piece unlisted from marketplace");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      toast.error(err.message || "Failed to delete piece");
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-[#14100c] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#ff9d7a]" size={32} />
      </div>
    );
  }

  // Calculate quick metrics
  const totalCrafts = products.length;
  const totalValue = products.reduce((acc, curr) => acc + (curr.price || 0), 0);
  const avgRating = products.length 
    ? (products.reduce((acc, curr) => acc + (curr.rating || 5.0), 0) / products.length).toFixed(1)
    : "5.0";

  return (
    <div className="min-h-screen bg-[#14100c] text-[#fbf7ee] pb-24">
      {/* Top Header Banner */}
      <div className="border-b border-[#362c24] bg-[#1a140f] py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#e6b445] tracking-wider uppercase mb-1">
              <Sparkles size={14} />
              <span>Artisan Guild Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#fbf7ee]">
              Welcome, {user?.name || "Master Artisan"}
            </h1>
            <p className="text-sm text-[#b8aca0] mt-1">
              Manage your handcrafted inventory, track guild orders, and share your tradition with the world.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="h-10 px-5 rounded-lg bg-[#ff9d7a] hover:bg-[#e46f45] text-[#451200] font-semibold text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <PlusCircle size={18} />
              <span>List New Craft</span>
            </button>
            <Link
              to="/profile"
              className="h-10 px-4 rounded-lg border border-[#362c24] hover:border-[#ff9d7a] text-xs font-semibold flex items-center gap-2 text-[#dec0b7] transition-colors"
            >
              Artisan Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-8">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl p-5 shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs text-[#b8aca0] uppercase tracking-wider font-semibold">Active Crafts Listed</p>
              <h3 className="text-3xl font-bold text-[#fbf7ee] mt-1">{totalCrafts}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#ff9d7a]/10 flex items-center justify-center text-[#ff9d7a]">
              <Package size={24} />
            </div>
          </div>

          <div className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl p-5 shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs text-[#b8aca0] uppercase tracking-wider font-semibold">Total Inventory Value</p>
              <h3 className="text-3xl font-bold text-[#e6b445] mt-1">৳{totalValue.toLocaleString("en-IN")}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#e6b445]/10 flex items-center justify-center text-[#e6b445]">
              <DollarSign size={24} />
            </div>
          </div>

          <div className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl p-5 shadow-md flex items-center justify-between">
            <div>
              <p className="text-xs text-[#b8aca0] uppercase tracking-wider font-semibold">Guild Craft Rating</p>
              <h3 className="text-3xl font-bold text-[#48db85] mt-1">{avgRating} ★</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#48db85]/10 flex items-center justify-center text-[#48db85]">
              <Award size={24} />
            </div>
          </div>
        </div>

        {/* Craft Management Table */}
        <div className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-[#362c24] flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#fbf7ee]">Your Handcrafted Inventory</h2>
              <p className="text-xs text-[#b8aca0]">All verified listings currently showcased in Kori Marketplace</p>
            </div>
            <span className="text-xs text-[#e6b445] font-semibold bg-[#2e241b] px-3 py-1 rounded-full border border-[#e6b445]/20">
              Direct Fair Trade
            </span>
          </div>

          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center text-[#b8aca0] gap-3">
              <Loader2 size={32} className="animate-spin text-[#ff9d7a]" />
              <span className="text-sm">Fetching your catalog pieces...</span>
            </div>
          ) : products.length === 0 ? (
            <div className="p-16 text-center text-[#b8aca0] space-y-4">
              <Layers size={40} className="mx-auto text-[#e6b445]/60" />
              <div>
                <h3 className="text-base font-bold text-[#fbf7ee]">No crafts listed yet</h3>
                <p className="text-xs mt-1">Publish your first artisan piece to connect with collectors across Bangladesh and abroad.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ff9d7a] text-[#451200] text-sm font-semibold"
              >
                <PlusCircle size={16} />
                <span>Publish First Piece</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#1d1712] text-[#b8aca0] text-xs uppercase tracking-wider border-b border-[#362c24]">
                  <tr>
                    <th className="py-3 px-4">Craft Piece</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">District</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Badge</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#362c24]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#2b221a]/50 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover bg-[#2e241b] border border-[#362c24] shrink-0"
                        />
                        <div className="min-w-0">
                          <Link
                            to={`/products/${p.id}`}
                            className="font-semibold text-[#fbf7ee] hover:text-[#ff9d7a] transition-colors truncate block max-w-xs"
                          >
                            {p.name}
                          </Link>
                          <span className="text-xs text-[#b8aca0] block truncate">{p.detail}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#dec0b7] whitespace-nowrap">{p.category || "General"}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs text-[#b8aca0]">
                          <MapPin size={12} className="text-[#ff9d7a]" />
                          {p.district}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#ff9d7a] whitespace-nowrap">
                        ৳{p.price?.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#2e241b] text-[#e6b445] border border-[#e6b445]/30">
                          {p.badge || "Verified"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            to={`/products/${p.id}`}
                            className="p-1.5 rounded-lg text-[#b8aca0] hover:text-[#ff9d7a] hover:bg-[#1d1712] transition-colors"
                            title="Preview on Store"
                          >
                            <ExternalLink size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 rounded-lg text-[#b8aca0] hover:text-red-400 hover:bg-red-950/30 transition-colors"
                            title="Unlist Craft"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#241d16] border border-[#d4a338]/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#b8aca0] hover:text-[#fbf7ee] p-1 rounded-lg"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold font-serif text-[#fbf7ee]">List a Handcrafted Creation</h3>
              <p className="text-xs text-[#b8aca0] mt-1">Provide accurate details for guild provenance verification.</p>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#b8aca0] mb-1">Craft Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dhakai Muslin Thread Handloom Sari"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1d1712] border border-[#362c24] rounded-lg px-3 py-2 text-sm text-[#fbf7ee] placeholder:text-[#b8aca0]/40 focus:border-[#ff9d7a] focus:ring-1 focus:ring-[#ff9d7a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#b8aca0] mb-1">Craft Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#1d1712] border border-[#362c24] rounded-lg px-3 py-2 text-sm text-[#fbf7ee] focus:border-[#ff9d7a]"
                  >
                    {CRAFT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8aca0] mb-1">Origin District</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-[#1d1712] border border-[#362c24] rounded-lg px-3 py-2 text-sm text-[#fbf7ee] focus:border-[#ff9d7a]"
                  >
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#b8aca0] mb-1">Fair Price (৳ BDT)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    placeholder="e.g. 4500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#1d1712] border border-[#362c24] rounded-lg px-3 py-2 text-sm text-[#fbf7ee] focus:border-[#ff9d7a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8aca0] mb-1">Heritage Badge</label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full bg-[#1d1712] border border-[#362c24] rounded-lg px-3 py-2 text-sm text-[#fbf7ee] focus:border-[#ff9d7a]"
                  >
                    {BADGE_OPTIONS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#b8aca0] mb-1">Craftsmanship Detail / Materials</label>
                <input
                  type="text"
                  placeholder="e.g. Hand-spun Resham Silk, 45 Days of Loom Weave"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  className="w-full bg-[#1d1712] border border-[#362c24] rounded-lg px-3 py-2 text-sm text-[#fbf7ee] focus:border-[#ff9d7a]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#b8aca0] mb-1">Product Image URL (optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-[#1d1712] border border-[#362c24] rounded-lg px-3 py-2 text-sm text-[#fbf7ee] focus:border-[#ff9d7a]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#362c24]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#362c24] text-xs font-semibold text-[#b8aca0] hover:text-[#fbf7ee]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-[#ff9d7a] hover:bg-[#e46f45] text-[#451200] text-xs font-bold flex items-center gap-1.5 shadow-md disabled:opacity-50"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                  <span>Publish to Marketplace</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}