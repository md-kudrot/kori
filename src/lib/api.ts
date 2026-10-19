import type { Product } from "../components/ProductsGrid";
import type { Artisan } from "../components/ArticansCart";

const API_BASE = ""; // Relative path works automatically with Vite dev proxy

export interface ProductsQueryParams {
  district?: string;
  category?: string;
  search?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  error?: string;
}

/**
 * Fetch products from Express backend
 */
export async function fetchProducts(params?: ProductsQueryParams): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params?.district && params.district !== "All Bangladesh") {
    query.set("district", params.district);
  }
  if (params?.category && params.category !== "All Pieces") {
    query.set("category", params.category);
  }
  if (params?.search) {
    query.set("search", params.search);
  }

  const url = `${API_BASE}/api/products${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }
  const json: ApiResponse<Product[]> = await res.json();
  return json.data;
}

/**
 * Fetch single product by id
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/api/products/${encodeURIComponent(id)}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch product: ${res.statusText}`);
  }
  const json: ApiResponse<Product> = await res.json();
  return json.data;
}

/**
 * Fetch artisans from Express backend
 */
export async function fetchArtisans(district?: string): Promise<Artisan[]> {
  const query = new URLSearchParams();
  if (district && district !== "All Bangladesh") {
    query.set("district", district);
  }

  const url = `${API_BASE}/api/artisans${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch artisans: ${res.statusText}`);
  }
  const json: ApiResponse<Artisan[]> = await res.json();
  return json.data;
}

/**
 * Check backend health status
 */
export async function checkBackendHealth(): Promise<{ ok: boolean; service?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) return { ok: false };
    return await res.json();
  } catch {
    return { ok: false };
  }
}
