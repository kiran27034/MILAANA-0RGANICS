import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct } from "@/lib/products";
import { PurchaseBox } from "@/components/ProductCard";
import { DemoNote } from "@/components/SiteLayout";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — MILAANA` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — MILAANA` },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [{ title: "Product unavailable — MILAANA" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Product not found</h1>
      <Link to="/products" className="mt-4 inline-block text-primary">Back to products</Link>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const { product: p } = Route.useLoaderData();
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2">
      <img src={p.image} alt={p.name} width={1024} height={1024} className="aspect-square w-full rounded-3xl object-cover" />
      <div className="space-y-6">
        <div>
          <Link to="/products" className="text-sm text-muted-foreground">← All products</Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary-glow">{p.variety ?? p.category}</p>
          <h1 className="text-4xl font-semibold">{p.name}</h1>
          <p className="mt-2 text-muted-foreground">{p.description}</p>
        </div>
        <PurchaseBox product={p} />
        <div className="rounded-2xl border border-border p-5">
          <h2 className="text-lg font-semibold">Product details</h2>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            {p.fat && <><dt className="text-muted-foreground">Fat</dt><dd>{p.fat}</dd></>}
            {p.snf && <><dt className="text-muted-foreground">SNF</dt><dd>{p.snf}</dd></>}
            <dt className="text-muted-foreground">Processing</dt><dd>{p.processing}</dd>
            <dt className="text-muted-foreground">Storage</dt><dd>{p.storage}</dd>
            <dt className="text-muted-foreground">Nutrition</dt><dd>To be added from verified lab report</dd>
          </dl>
        </div>
        {!p.qualityVerified && <DemoNote>Quality values for this product are sample data and not yet verified.</DemoNote>}
      </div>
    </div>
  );
}
