import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Clock } from "lucide-react";
import { PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MILAANA" },
      { name: "description", content: "Get in touch with MILAANA for orders, delivery areas and questions." },
      { property: "og:title", content: "Contact — MILAANA" },
      { property: "og:description", content: "Phone, email and delivery hours for MILAANA." },
    ],
  }),
  component: Contact,
});

const items = [
  { icon: Phone, t: "Phone / WhatsApp", d: "+91 88679 73331" },
  { icon: Mail, t: "Email", d: "milaanaorganic@gmail.com" },
  { icon: Clock, t: "Delivery hours", d: "6:30 AM – 9:00 AM and 7:00 PM – 9:00 PM daily" },
];

function Contact() {
  return (
    <>
      <PageHeader title="Contact Us" intro="Call, WhatsApp or email us for orders and questions." />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-2">
        {items.map((i) => (
          <div key={i.t} className="flex gap-4 rounded-2xl border border-border p-6">
            <i.icon className="h-6 w-6 text-primary" />
            <div><p className="font-semibold">{i.t}</p><p className="text-muted-foreground">{i.d}</p></div>
          </div>
        ))}
      </div>
    </>
  );
}
