import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/SiteLayout";
import img from "@/assets/buffalo-milk.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — MILAANA" },
      { name: "description", content: "Real Food. Real Farmers. Real Goodness. The MILAANA story." },
      { property: "og:title", content: "About Us — MILAANA" },
      { property: "og:description", content: "Meet the team bringing fresh milk to your door." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader title="About Us" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2">
        <div className="space-y-4 text-muted-foreground">
          <h2 className="text-3xl font-semibold text-foreground">Real Food. Real Farmers. Real Goodness.</h2>
          <p>At MILAANA, we believe that good health begins with pure, fresh and wholesome milk. Our journey is driven by a simple promise — to bring the goodness of farm-fresh milk straight to your home, just the way nature intended.</p>
          <p>We source our milk from healthy, well-cared-for cows raised in clean and natural environments. With a commitment to quality, freshness and minimal processing, we strive to preserve the natural goodness of milk in every bottle.</p>
          <p>Your trust is our responsibility. That is why we believe in transparency, quality testing and maintaining high standards of milk purity and safety. From our farms to your doorstep, every step reflects our dedication to delivering milk you can feel good about.</p>
          <p>More than just milk, MILAANA is about nurturing healthier families, supporting local farmers and building a connection between the farm and your home.</p>
          <p className="font-display text-xl text-primary">MILAANA — Pure Goodness, Delivered with Care.</p>
        </div>
        <img src={img} alt="Fresh buffalo milk in a clay cup" loading="lazy" width={1024} height={1024} className="rounded-3xl" />
      </div>
    </>
  );
}
