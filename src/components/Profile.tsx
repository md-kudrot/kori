/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Shield, Camera, Save, Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

type UserWithRole = {
    name?: string;
    email?: string;
    image?: string | null;
    role?: string;
    createdAt?: string | Date;
};

export default function Profile() {
    const navigate = useNavigate();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user as UserWithRole | undefined;

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    // Hydrate form when session loads — mirrors idea-vault profile page defaultValue pattern but controlled for preview
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setImage(user.image || "");
            setPreview(user.image || null);
        }
    }, [user?.name, user?.image]);

    // Redirect unauthenticated — same as idea-vault proxy protecting /ideas, but client-side for Vite SPA
    useEffect(() => {
        if (!isPending && !user) {
            toast.error("Please log in to view your profile");
            navigate("/login?callbackUrl=/profile");
        }
    }, [isPending, user, navigate]);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image must be < 2MB (use URL for larger)");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result as string;
            setPreview(dataUrl);
            setImage(dataUrl); // better-auth stores image as string — data URL works for small avatars; for prod use a CDN upload
        };
        reader.readAsDataURL(file);
    }

    function handleImageUrlChange(url: string) {
        setImage(url);
        setPreview(url || null);
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("Name cannot be empty");
            return;
        }
        setSaving(true);
        try {
            const { error } = await authClient.updateUser({
                name: name.trim(),
                image: image.trim() || undefined,
            });
            if (error) {
                toast.error(error.message || "Failed to update profile");
            } else {
                toast.success("Profile updated");
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Update failed");
        } finally {
            setSaving(false);
        }
    }

    if (isPending) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#14100c]">
                <Loader2 className="animate-spin text-[#ff9d7a]" size={28} />
            </div>
        );
    }

    if (!user) return null;

    const initials = (user.name || user.email || "U")[0]?.toUpperCase();
    const role = (user.role as string) || "buyer";
    const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : null;

    return (
        <div className="min-h-screen bg-[#14100c] px-4 py-10">
            <div className="w-full max-w-2xl mx-auto space-y-6">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-sm text-[#b8aca0] hover:text-[#ff9d7a] transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to marketplace
                </Link>

                {/* Header card — avatar & identity, kori palette */}
                <div className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl p-8 shadow-2xl relative overflow-hidden text-center">
                    <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#ff9d7a]/10 blur-3xl rounded-full pointer-events-none" />
                    <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#e6b445]/10 blur-2xl rounded-full pointer-events-none" />

                    <div className="relative flex flex-col items-center gap-4">
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="group relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#ff9d7a] shadow-xl bg-[#1d1712] flex items-center justify-center"
                            aria-label="Upload profile image"
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt={user.name || "avatar"}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover"
                                    onError={() => setPreview(null)}
                                />
                            ) : (
                                <span className="text-3xl font-bold text-[#ff9d7a]">{initials}</span>
                            )}
                            <span className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity text-white text-xs font-semibold">
                                <Camera size={20} />
                                Change
                            </span>
                        </button>

                        <div>
                            <h1
                                className="text-2xl font-bold text-[#fbf7ee] tracking-tight"
                                style={{ fontFamily: "Merriweather, serif" }}
                            >
                                {user.name || "Anonymous"}
                            </h1>
                            <p className="text-sm text-[#b8aca0] mt-1 flex items-center justify-center gap-1.5">
                                <Mail size={14} />
                                {user.email}
                            </p>
                            <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#2e241b] text-[#e6b445] border border-[#e6b445]/25 capitalize">
                                <Shield size={12} />
                                {role}
                            </span>
                            {memberSince && (
                                <p className="text-xs text-[#b8aca0]/70 mt-1">Member since {memberSince}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Edit form — mirrors idea-vault onSubmit with authClient.updateUser({name, image}) */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#241d16] border border-[rgba(212,163,56,0.18)] rounded-xl p-6 md:p-8 shadow-xl space-y-6"
                >
                    <h2
                        className="text-sm font-bold tracking-widest uppercase text-[#ff9d7a] border-b border-[#362c24] pb-3"
                        style={{ fontFamily: "Merriweather, serif" }}
                    >
                        Edit Profile
                    </h2>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-[#b8aca0] mb-1.5 uppercase tracking-widest">
                            Full Name
                        </label>
                        <div className="flex items-center bg-[#1d1712] border border-[#362c24] focus-within:border-[#ff9d7a] focus-within:ring-2 focus-within:ring-[#ff9d7a]/20 rounded-lg px-3 py-2.5 transition-all">
                            <User size={18} className="text-[#b8aca0] mr-2 shrink-0" />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-[#fbf7ee] placeholder:text-[#b8aca0]/50"
                            />
                        </div>
                    </div>

                    {/* Image — file upload + URL fallback */}
                    <div>
                        <label className="block text-xs font-semibold text-[#b8aca0] mb-1.5 uppercase tracking-widest">
                            Profile Image
                        </label>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#1d1712] border border-[#362c24] hover:border-[#ff9d7a]/50 text-sm text-[#fbf7ee] transition-colors"
                            >
                                <Camera size={16} />
                                Upload file
                            </button>
                            <div className="flex-1 flex items-center bg-[#1d1712] border border-[#362c24] focus-within:border-[#ff9d7a] focus-within:ring-2 focus-within:ring-[#ff9d7a]/20 rounded-lg px-3 py-2.5 transition-all">
                                <input
                                    name="image"
                                    type="url"
                                    value={image}
                                    onChange={(e) => handleImageUrlChange(e.target.value)}
                                    placeholder="https://example.com/avatar.jpg or upload"
                                    pattern="https://.*"
                                    title="Use https:// URL or upload a file"
                                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-[#fbf7ee] placeholder:text-[#b8aca0]/50"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-[#b8aca0]/60 mt-1.5">Upload &lt;2MB or paste an https:// image URL. Stored via Better Auth.</p>
                    </div>

                    {/* Read-only: email & role */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#b8aca0] mb-1.5 uppercase tracking-widest">Email</label>
                            <div className="flex items-center bg-[#1d1712]/60 border border-[#362c24] rounded-lg px-3 py-2.5 text-sm text-[#b8aca0]">
                                <Mail size={16} className="mr-2 shrink-0" />
                                <span className="truncate">{user.email}</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#b8aca0] mb-1.5 uppercase tracking-widest">Role</label>
                            <div className="flex items-center bg-[#1d1712]/60 border border-[#362c24] rounded-lg px-3 py-2.5 text-sm text-[#b8aca0] capitalize">
                                <Shield size={16} className="mr-2 shrink-0" />
                                {role}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full h-11 bg-[#ff9d7a] hover:bg-[#e46f45] disabled:opacity-60 text-[#451200] font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                    >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        <span>{saving ? "Saving..." : "Save Changes"}</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
