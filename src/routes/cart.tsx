import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { calcTotals, findPack, inr } from "@/lib/products";
import { checkMember, placeOrder } from "@/lib/shop.functions";
import { QtyPicker } from "@/components/ProductCard";
import { PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart & Checkout — MILAANA" },
      { name: "description", content: "Review your MILAANA milk order and check out with cash or UPI on delivery." },
      { property: "og:title", content: "Your Cart — MILAANA" },
      { property: "og:description", content: "Review and place your MILAANA order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Cart,
});

const PAYMENTS = ["Cash on delivery", "UPI on delivery"] as const;

function Cart() {
  const { lines, setQty, remove, clear } = useCart();
  const rows = lines.map((l) => ({ ...l, ...findPack(l.packId)! })).filter((r) => r.product);
  const [member, setMember] = useState(false);
  const [f, setF] = useState({ full_name: "", phone: "", address: "" });
  const [payment, setPayment] = useState<(typeof PAYMENTS)[number]>("Cash on delivery");
  const [busy, setBusy] = useState(false);
  const [placed, setPlaced] = useState<null | { orderId: string; total: number }>(null);
  const check = useServerFn(checkMember);
  const order = useServerFn(placeOrder);
  const t = calcTotals(rows.reduce((a, r) => a + r.pack.price * r.qty, 0), member);

  async function onPhoneBlur() {
    if (!/\d{10}/.test(f.phone.replace(/\D/g, ""))) return;
    try { setMember((await check({ data: { phone: f.phone } })).member); } catch { /* ignore */ }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await order({ data: { ...f, payment, lines: rows.map((r) => ({ packId: r.packId, qty: r.qty })) } });
      setPlaced(r); clear();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not place order");
    } finally { setBusy(false); }
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h1 className="mt-4 text-3xl font-semibold">Order placed!</h1>
        <p className="mt-2 text-muted-foreground">Order ID <b>{placed.orderId}</b> · Total {inr(placed.total)}. We'll call you to confirm delivery. Questions? +91 88679 73331</p>
        <Button asChild className="mt-6 rounded-full"><Link to="/products">Continue shopping</Link></Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Your Cart" />
      <div className="mx-auto max-w-6xl px-4 py-10">
        {rows.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button asChild className="mt-4 rounded-full"><Link to="/products">Shop Fresh Milk</Link></Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <ul className="space-y-4">
              {rows.map((r) => (
                <li key={r.packId} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border p-4">
                  <img src={r.product.image} alt="" width={80} height={80} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="min-w-40 flex-1">
                    <p className="font-semibold">{r.product.name}</p>
                    <p className="text-sm text-muted-foreground">{r.pack.label} · {inr(r.pack.price)} each</p>
                  </div>
                  <QtyPicker value={r.qty} max={r.pack.stock} onChange={(n) => setQty(r.packId, n)} />
                  <p className="w-20 text-right font-semibold">{inr(r.pack.price * r.qty)}</p>
                  <button aria-label="Remove" onClick={() => remove(r.packId)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-5 w-5" /></button>
                </li>
              ))}
            </ul>
            <form onSubmit={submit} className="h-fit space-y-4 rounded-2xl bg-secondary p-6">
              <h2 className="text-xl font-semibold">Checkout</h2>
              <Input required maxLength={100} placeholder="Full name" value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} />
              <Input required type="tel" inputMode="numeric" maxLength={14} placeholder="Mobile number" value={f.phone} onBlur={onPhoneBlur} onChange={(e) => { setF({ ...f, phone: e.target.value }); setMember(false); }} />
              <Textarea required maxLength={300} placeholder="Delivery address" value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} />
              <fieldset className="space-y-2">
                <legend className="text-sm font-semibold">Payment method</legend>
                {PAYMENTS.map((p) => (
                  <label key={p} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    <input type="radio" name="payment" checked={payment === p} onChange={() => setPayment(p)} /> {p}
                  </label>
                ))}
              </fieldset>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(t.subtotal)}</dd></div>
                <div className="flex justify-between"><dt>Delivery</dt><dd>{t.delivery === 0 ? "Free (member)" : inr(t.delivery)}</dd></div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-bold"><dt>Total</dt><dd>{inr(t.total)}</dd></div>
              </dl>
              {!member && <p className="rounded-lg bg-accent px-3 py-2 text-xs font-medium text-accent-foreground">⭐ Members get FREE delivery. <Link to="/membership" className="underline">Get free membership</Link></p>}
              <Button type="submit" className="w-full rounded-full" size="lg" disabled={busy}>{busy ? "Placing order…" : "Place order"}</Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
