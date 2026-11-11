import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, ShieldCheck, Snowflake, Truck, ClipboardCheck, Leaf, Phone } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MILAANA — Fresh milk delivered to your door" },
      { name: "description", content: "Order fresh cow milk, buffalo milk, curd and paneer online for morning delivery." },
      { property: "og:title", content: "MILAANA — Fresh milk delivered" },
      { property: "og:description", content: "Fresh milk and dairy products, ordered online and delivered every morning." },
    ],
  }),
  component: Home,
});

const steps = [
  { icon: Leaf, t: "Sourcing", d: "Milk is collected from partner farms we work with directly." },
  { icon: ClipboardCheck, t: "Testing", d: "Each batch is checked before it is accepted. Results are published once verified." },
  { icon: Snowflake, t: "Chilling", d: "Milk is chilled quickly after collection and kept cold." },
  { icon: Truck, t: "Delivery", d: "Packed and delivered in the morning slot you choose." },
];
const why = [
  { icon: Droplets, t: "Fresh every morning", d: "Small daily batches, not long warehouse storage." },
  { icon: ShieldCheck, t: "Transparent quality", d: "We share fat, SNF and test information only when verified." },
  { icon: Truck, t: "Doorstep delivery", d: "Pick a date and time slot that suits you." },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Fresh milk poured into a bottle with cows grazing behind" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-36">
          <p className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">Farm fresh · Delivered daily</p>
          <h1 className="max-w-xl text-5xl font-semibold leading-tight md:text-6xl">Pure, fresh milk at your doorstep.</h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">Order cow milk, buffalo milk and dairy essentials online for morning delivery.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-8"><Link to="/products">Shop Fresh Milk</Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full bg-background/70"><Link to="/quality">Our quality process</Link></Button>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6">
          <p className="font-display text-2xl">⭐ Special offer: FREE home delivery for MILAANA members</p>
          <Button asChild variant="secondary" className="rounded-full"><Link to="/membership">Get free membership</Link></Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div><h2 className="text-3xl font-semibold md:text-4xl">Featured products</h2><p className="text-muted-foreground">Fresh cow milk available now. More products coming soon.</p></div>
          <Link to="/products" className="text-sm font-semibold text-primary">View all →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-semibold md:text-4xl">From farm to your door</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">How our milk is sourced and checked. Specific test results and certifications will be added once verified.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.t} className="rounded-2xl bg-card p-6">
                <s.icon className="h-8 w-8 text-primary" />
                <p className="mt-4 text-xs font-bold text-muted-foreground">STEP {i + 1}</p>
                <h3 className="text-lg font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <Link to="/quality" className="mt-6 inline-block text-sm font-semibold text-primary">Read about milk quality →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-semibold md:text-4xl">Why choose MILAANA</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {why.map((w) => (
            <div key={w.t} className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><w.icon className="h-6 w-6" /></span>
              <div><h3 className="font-semibold">{w.t}</h3><p className="text-sm text-muted-foreground">{w.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-3xl font-semibold">Ready for tomorrow's milk?</h2>
            <p className="mt-2 opacity-80"><Phone className="mr-1 inline h-4 w-4" /> Questions? Call / WhatsApp <a href="tel:+918867973331" className="underline">+91 88679 73331</a></p>
          </div>
          <Button asChild size="lg" variant="secondary" className="rounded-full px-8"><Link to="/products">Order now</Link></Button>
        </div>
      </section>
    </>
  );
}
