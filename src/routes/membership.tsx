import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Truck, BadgeCheck, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { requestMembership } from "@/lib/shop.functions";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Free Membership — MILAANA" },
      { name: "description", content: "Join MILAANA free with your mobile number and get free home delivery on your milk orders." },
      { property: "og:title", content: "Free Membership — MILAANA" },
      { property: "og:description", content: "Join with your mobile number and get free home delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Membership,
});

const steps = [
  { icon: Smartphone, t: "Enter your mobile", d: "Share your name, mobile number and delivery address." },
  { icon: BadgeCheck, t: "We approve", d: "We review your request and approve it." },
  { icon: Truck, t: "Free delivery", d: "Order with the same mobile number and delivery is free." },
];

function Membership() {
  return (
    <>
      <PageHeader title="Get a free MILAANA membership" intro="Join with your mobile number and enjoy free home delivery on every order." />
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.t} className="rounded-2xl border border-border bg-card p-6">
              <s.icon className="h-8 w-8 text-primary" />
              <p className="mt-4 text-xs font-bold text-muted-foreground">STEP {i + 1}</p>
              <h2 className="text-lg font-semibold">{s.t}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-md"><MemberBox /></div>
      </div>
    </>
  );
}

function MemberBox() {
  const send = useServerFn(requestMembership);
  const [f, setF] = useState({ full_name: "", phone: "", address: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | boolean>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await send({ data: f });
      setDone(r.already);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally { setBusy(false); }
  }

  if (done !== null) return <p className="rounded-2xl bg-secondary p-6 text-center">{done ? "This mobile number has already requested membership. We'll approve it soon." : "Request sent! Once approved, delivery is free when you order with this mobile number."}</p>;

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-border p-6">
      <h2 className="text-xl font-semibold">Become a member</h2>
      <Input required maxLength={100} placeholder="Full name" value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} />
      <Input required type="tel" inputMode="numeric" maxLength={14} placeholder="Mobile number (10 digits)" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
      <Textarea required maxLength={300} placeholder="Delivery address" value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} />
      <Button type="submit" disabled={busy} className="h-11 w-full rounded-full">{busy ? "Sending…" : "Get free membership"}</Button>
    </form>
  );
}
