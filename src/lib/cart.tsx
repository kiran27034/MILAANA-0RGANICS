import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { findPack } from "./products";

export type CartLine = { packId: string; qty: number };
type Ctx = {
  lines: CartLine[];
  add: (packId: string, qty: number) => void;
  setQty: (packId: string, qty: number) => void;
  remove: (packId: string) => void;
  clear: () => void;
  count: number;
};
const CartContext = createContext<Ctx | null>(null);
const KEY = "fresh-dairy-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
  }, []);
  const save = (next: CartLine[]) => { setLines(next); localStorage.setItem(KEY, JSON.stringify(next)); };
  const cap = (packId: string, qty: number) => Math.max(0, Math.min(qty, findPack(packId)?.pack.stock ?? 0));

  const add = (packId: string, qty: number) => {
    const cur = lines.find((l) => l.packId === packId)?.qty ?? 0;
    const q = cap(packId, cur + qty);
    save(q ? [...lines.filter((l) => l.packId !== packId), { packId, qty: q }] : lines);
  };
  const setQty = (packId: string, qty: number) => {
    const q = cap(packId, qty);
    save(q ? lines.map((l) => (l.packId === packId ? { ...l, qty: q } : l)) : lines.filter((l) => l.packId !== packId));
  };
  const remove = (packId: string) => save(lines.filter((l) => l.packId !== packId));
  const clear = () => save([]);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  return <CartContext.Provider value={{ lines, add, setQty, remove, clear, count }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
