import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader, DemoNote } from "@/components/SiteLayout";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Our Products — MILAANA" },
      { name: "description", content: "Browse cow milk, buffalo milk, curd and paneer with pack sizes, prices and stock." },
      { property: "og:title", content: "Our Products — MILAANA" },
      { property: "og:description", content: "Fresh milk varieties and dairy products available to order." },
    ],
  }),
  component: Products,
});

function Products() {
  const groups = ["Milk", "Dairy"] as const;
  return (
    <>
      <PageHeader title="Our Products" intro="Choose a pack size and quantity, then add to cart." />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <DemoNote>⭐ Special offer: FREE home delivery for MILAANA members.</DemoNote>
        {groups.map((g) => (
          <section key={g} className="mt-10">
            <h2 className="mb-5 text-2xl font-semibold">{g === "Milk" ? "Milk" : "Other dairy"}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.filter((p) => p.active && p.category === g).map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
