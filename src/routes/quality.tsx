import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteLayout";
import { products } from "@/lib/products";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Milk Quality — MILAANA" },
      { name: "description", content: "How MILAANA sources, collects, tests and stores farm fresh milk. FSSAI Lic. No. 21226197000945." },
      { property: "og:title", content: "Milk Quality — MILAANA" },
      { property: "og:description", content: "Milk from local farms, tested for Fat 3.8–4.5% and SNF 8.5–9% before acceptance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Quality,
});

const sections = [
  { t: "1. Milk Sourcing", d: <>MILAANA sources fresh milk directly from local dairy farmers, with milk collected from approximately 50–60 cows. We work closely with farmers to maintain consistent milk quality and freshness.</> },
  { t: "2. Milk Collection Timings", d: <>Milk is collected twice daily:<br /><b>Morning:</b> 5:30 AM – 6:00 AM<br /><b>Evening:</b> 6:00 PM – 7:00 PM</> },
  { t: "3. Milk Quality Testing", d: <>We conduct individual milk quality checks for every farmer's milk supply before accepting it. Our quality parameters include:<br /><b>Fat:</b> 3.8% – 4.5%<br /><b>SNF (Solid-Not-Fat):</b> 8.5% – 9%<br />Milk that does not meet our specified fat and SNF standards is rejected and not accepted for supply.</> },
  { t: "4. Quality Commitment", d: <>At MILAANA, quality and transparency are our priorities. We focus on fresh milk sourced from local farms, with quality checks before acceptance.</> },
  { t: "5. Storage & Handling", d: <>Milk should be maintained under refrigerated conditions at 4°C or below. Customers are advised to boil the milk before consumption.</> },
  { t: "6. Food Safety Registration", d: <><b>FSSAI Licence Number:</b> 21226197000945</> },
];

function Quality() {
  return (
    <>
      <PageHeader title="MILAANA – Farm Fresh Milk" intro="Real milk. Real goodness. Sourced from local farms, with care for our cows, our land and your tomorrow." />
      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12">
        {sections.map((s) => (
          <section key={s.t}>
            <h2 className="text-2xl font-semibold">{s.t}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.d}</p>
          </section>
        ))}
        <section className="rounded-2xl bg-secondary p-6">
          <h2 className="text-2xl font-semibold">What are Fat and SNF?</h2>
          <p className="mt-3 text-sm leading-relaxed"><b>Fat</b> is the percentage of milk fat in the milk. It affects creaminess and taste.</p>
          <p className="mt-2 text-sm leading-relaxed"><b>SNF (Solids-Not-Fat)</b> is everything in milk other than water and fat — proteins, lactose and minerals. It is a common check that milk has not been diluted.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Product details</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left"><tr><th className="p-3">Product</th><th className="p-3">Fat</th><th className="p-3">SNF</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug} className="border-t border-border"><td className="p-3 font-medium">{p.name}</td><td className="p-3">{p.fat ?? "—"}</td><td className="p-3">{p.snf ?? "—"}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
