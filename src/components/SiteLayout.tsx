import { Link, useRouterState } from "@tanstack/react-router";
import { Milk, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Our Products" },
  { to: "/quality", label: "Milk Quality" },
  { to: "/membership", label: "Membership" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const isLoginPage = useRouterState({
    select: (state) => state.location.pathname === "/login",
  });
  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur ${isLoginPage
        ? "border-white/10 bg-[#0b1711]/95 text-white"
        : "border-border bg-background/90"
      }`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-primary">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><Milk className="h-5 w-5" /></span>
          MILAANA
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-muted-foreground hover:text-primary" activeProps={{ className: "text-primary" }} activeOptions={{ exact: n.to === "/" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/admin/members" className="hidden">Owner</Link>
          <Link to="/login" className="hidden items-center gap-1 rounded-full px-3 py-2 text-sm font-medium hover:bg-secondary sm:flex"><User className="h-4 w-4" /> Login</Link>
          <Link to="/cart" aria-label="Shopping cart" className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-secondary-foreground">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">{count}</span>}
          </Link>
          <button className="grid h-10 w-10 place-items-center md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border px-4 py-3 md:hidden">
          {[...nav, { to: "/login", label: "Login" } as const].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-medium hover:bg-secondary">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">MILAANA</p>
          <p className="mt-2 text-sm opacity-80">Pure Goodness, Delivered with Care.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Contact</p>
          <p className="mt-2 opacity-80">Phone: +91 88679 73331</p>
          <p className="opacity-80">Email: milaanaorganic@gmail.com</p>
        </div>
        <div className="text-sm opacity-80">Delivery: 6:30–9:00 AM and 7:00–9:00 PM daily.</div>
      </div>
    </footer>
  );
}

export function PageHeader({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h1 className="text-4xl font-semibold text-secondary-foreground md:text-5xl">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}

export function DemoNote({ children }: { children: ReactNode }) {
  return <p className="rounded-lg border border-warning/50 bg-warning/10 px-3 py-2 text-xs text-foreground">{children}</p>;
}
