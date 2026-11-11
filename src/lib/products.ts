import cowMilk from "@/assets/cow-milk-labelled.jpg";
import curdImg from "@/assets/curd.jpg";
import buffaloMilk from "@/assets/buffalo-milk.jpg";
import curdPaneer from "@/assets/curd-paneer.jpg";

// DEMO DATA: prices, quality values and stock are placeholders until the owner
// enters verified information (will move to the database in the next step).
export type PackSize = { id: string; label: string; price: number; stock: number };
// priceHidden: price is not shown to customers (owner has not set it yet).
export type Product = {
  slug: string;
  name: string;
  category: "Milk" | "Dairy";
  variety?: string;
  image: string;
  description: string;
  packs: PackSize[];
  fat?: string; // shown only when verified
  snf?: string;
  qualityVerified: boolean;
  processing: string;
  storage: string;
  active: boolean;
  priceHidden?: boolean;
};

export const products: Product[] = [
  {
    slug: "cow-milk",
    name: "Fresh Cow Milk",
    category: "Milk",
    variety: "Cow milk",
    image: cowMilk,
    description: "Everyday cow milk, collected each morning and delivered chilled.",
    packs: [
      { id: "cow-500", label: "500 ml", price: 38, stock: 40 },
      { id: "cow-1000", label: "1 litre", price: 70, stock: 25 },
    ],
    fat: "3.8 – 4.5%",
    snf: "8.5 – 9%",
    qualityVerified: true,
    processing: "Fresh farm milk, quality-checked before acceptance",
    storage: "Keep refrigerated at 4°C or below. Boil before use.",
    active: true,
  },
  {
    slug: "buffalo-milk",
    name: "Buffalo Milk",
    category: "Milk",
    variety: "Buffalo milk",
    image: buffaloMilk,
    description: "Richer, creamier milk — popular for tea, curd and sweets.",
    packs: [
      { id: "buf-500", label: "500 ml", price: 0, stock: 0 },
      { id: "buf-1000", label: "1 litre", price: 0, stock: 0 },
    ],
    qualityVerified: false,
    processing: "Pasteurised (sample — confirm process)",
    storage: "Keep refrigerated below 4°C. Use within 2 days of delivery.",
    active: true,
    priceHidden: true,
  },
  {
    slug: "curd",
    name: "Fresh Curd",
    category: "Dairy",
    image: curdImg,
    description: "Thick set curd made from our fresh milk.",
    packs: [{ id: "curd-400", label: "400 g", price: 0, stock: 0 }],
    qualityVerified: false,
    processing: "Made from pasteurised milk",
    storage: "Refrigerate. Consume by the date on the pack.",
    active: true,
    priceHidden: true,
  },
  {
    slug: "paneer",
    name: "Fresh Paneer",
    category: "Dairy",
    image: curdPaneer,
    description: "Soft, fresh paneer made from our milk.",
    packs: [{ id: "paneer-200", label: "200 g", price: 0, stock: 0 }],
    qualityVerified: false,
    processing: "Made from pasteurised milk (sample — confirm)",
    storage: "Refrigerate. Consume by the date on the pack.",
    active: true,
    priceHidden: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug && p.active);
export const findPack = (packId: string) => {
  for (const p of products) {
    const pack = p.packs.find((k) => k.id === packId);
    if (pack) return { product: p, pack };
  }
  return undefined;
};

export const stockLabel = (stock: number) =>
  stock <= 0 ? { text: "Out of stock", tone: "out" as const }
  : stock <= 5 ? { text: `Only ${stock} left`, tone: "low" as const }
  : { text: "In stock", tone: "in" as const };

// Delivery is free only for approved MILAANA members. Fee amount is a sample — owner to confirm.
export const DELIVERY_FEE = 20;
export const TAX_RATE = 0; // Fresh milk is generally GST-exempt in India; confirm with your accountant for other items.

export function calcTotals(subtotal: number, isMember = false) {
  const delivery = subtotal === 0 || isMember ? 0 : DELIVERY_FEE;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  return { subtotal, delivery, tax, total: subtotal + delivery + tax };
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
