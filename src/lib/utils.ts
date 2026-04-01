import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const brokenImageMap: Record<string, string> = {
  "https://images.unsplash.com/photo-1616628182509-6f0b7f89ef39?auto=format&fit=crop&w=1200&q=80": "https://picsum.photos/seed/turbo-stand-fan/1200/900",
  "https://images.unsplash.com/photo-1629042306547-b9df1c0d70d2?auto=format&fit=crop&w=1200&q=80": "https://picsum.photos/seed/desert-air-cooler/1200/900"
};

const fallbackProductImage = "https://picsum.photos/seed/electronics-store-fallback/1200/900";
const uploadedProductImagePattern = /^\/uploads\/products\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp)$/i;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0
  }).format(value);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isUploadedProductImagePath(value?: string | null) {
  return Boolean(value && uploadedProductImagePattern.test(value));
}

export function isValidProductImage(value?: string | null) {
  if (!value) {
    return false;
  }

  if (isUploadedProductImagePath(value)) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function resolveProductImage(url?: string | null) {
  if (!url) {
    return fallbackProductImage;
  }

  return brokenImageMap[url] || url;
}
