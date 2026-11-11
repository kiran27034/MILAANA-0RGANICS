import { Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { type Product, inr, stockLabel } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export function StockBadge({ stock }: { stock: number }) {
  const s = stockLabel(stock);
  const cls = s.tone === "out" ? "bg-destructive/10 text-destructive" : s.tone === "low" ? "bg-warning/20 text-foreground" : "bg-secondary text-primary";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>{s.text}</span>;
}

export function QtyPicker({ value, onChange, max }: { value: number; onChange: (n: number) => void; max: number }) {
  return (
    <div className="flex items-center rounded-full border border-border">
      <button aria-label="Decrease" className="grid h-10 w-10 place-items-center disabled:opacity-40" disabled={value <= 1} onClick={() => onChange(value - 1)}><Minus className="h-4 w-4" /></button>
      <span className="w-8 text-center font-semibold">{value}</span>
      <button aria-label="Increase" className="grid h-10 w-10 place-items-center disabled:opacity-40" disabled={value >= max} onClick={() => onChange(value + 1)}><Plus className="h-4 w-4" /></button>
    </div>
  );
}

export function PurchaseBox({ product }: { product: Product }) {
  const { add, lines } = useCart();
  const [packId, setPackId] = useState(product.packs[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const pack = product.packs.find((p) => p.id === packId)!;
  const inCart = lines.find((l) => l.packId === packId)?.qty ?? 0;
  const left = pack.stock - inCart;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {product.packs.map((p) => (
          <button key={p.id} onClick={() => { setPackId(p.id); setQty(1); }}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium ${p.id === packId ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>
            {p.label}{product.priceHidden ? "" : ` · ${inr(p.price)}`}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">{product.priceHidden ? <span className="text-base text-muted-foreground">Price coming soon</span> : inr(pack.price)}</span>
        <StockBadge stock={pack.stock} />
      </div>
      <div className="flex items-center gap-3">
        <QtyPicker value={qty} onChange={setQty} max={Math.max(1, left)} />
        <Button className="h-10 flex-1 rounded-full" disabled={left <= 0}
          onClick={() => { add(packId, qty); toast.success(`${product.name} (${pack.label}) added to cart`); setQty(1); }}>
          {pack.stock <= 0 ? "Out of stock" : left <= 0 ? "Max in cart" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block aspect-[4/3] overflow-hidden">
        <img src={product.image} alt={product.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-glow">{product.variety ?? product.category}</p>
          <Link to="/products/$slug" params={{ slug: product.slug }}><h3 className="text-xl font-semibold hover:text-primary">{product.name}</h3></Link>
          <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
        </div>
        {(product.fat || product.snf) && (
          <dl className="grid grid-cols-2 gap-2 text-xs">
            {product.fat && <div className="rounded-lg bg-muted p-2"><dt className="text-muted-foreground">Fat</dt><dd className="font-semibold">{product.fat}</dd></div>}
            {product.snf && <div className="rounded-lg bg-muted p-2"><dt className="text-muted-foreground">SNF</dt><dd className="font-semibold">{product.snf}</dd></div>}
          </dl>
        )}
        <p className="text-xs text-muted-foreground"><b>Processing:</b> {product.processing}<br /><b>Storage:</b> {product.storage}</p>
        <div className="mt-auto"><PurchaseBox product={product} /></div>
      </div>
    </article>
  );
}
