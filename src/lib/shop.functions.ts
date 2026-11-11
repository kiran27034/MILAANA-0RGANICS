import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { calcTotals, findPack } from "./products";
import { appendRow, normPhone, readRows } from "./sheets.server";

const phone = z.string().trim().regex(/^(\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number");
const now = () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

async function isApprovedMember(p: string) {
  const rows = await readRows("membership!A2:E");
  return rows.some((r) => normPhone(r[2] ?? "") === normPhone(p) && (r[4] ?? "").trim().toLowerCase() === "approved");
}

export const requestMembership = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({
    full_name: z.string().trim().min(2).max(100),
    phone,
    address: z.string().trim().min(5).max(300),
  }).parse(d))
  .handler(async ({ data }) => {
    const existing = await readRows("membership!C2:C");
    if (existing.some((r) => normPhone(r[0] ?? "") === normPhone(data.phone))) {
      return { ok: true, already: true };
    }
    await appendRow("membership", [now(), data.full_name, normPhone(data.phone), data.address, "pending", ""]);
    return { ok: true, already: false };
  });

export const checkMember = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ phone }).parse(d))
  .handler(async ({ data }) => ({ member: await isApprovedMember(data.phone) }));

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({
    full_name: z.string().trim().min(2).max(100),
    phone,
    address: z.string().trim().min(5).max(300),
    payment: z.enum(["Cash on delivery", "UPI on delivery"]),
    lines: z.array(z.object({ packId: z.string(), qty: z.number().int().min(1).max(50) })).min(1).max(20),
  }).parse(d))
  .handler(async ({ data }) => {
    // Prices are always taken from the server, never from the browser.
    const items = data.lines.map((l) => {
      const f = findPack(l.packId);
      if (!f || f.product.priceHidden || f.pack.stock <= 0 || f.pack.price <= 0) throw new Error("An item in your cart is no longer available.");
      if (l.qty > f.pack.stock) throw new Error(`Only ${f.pack.stock} of ${f.product.name} ${f.pack.label} available.`);
      return { text: `${f.product.name} ${f.pack.label} x ${l.qty}`, amount: f.pack.price * l.qty };
    });
    const member = await isApprovedMember(data.phone);
    const t = calcTotals(items.reduce((a, i) => a + i.amount, 0), member);
    const orderId = `MIL-${Date.now().toString(36).toUpperCase()}`;
    await appendRow("orders", [now(), orderId, data.full_name, normPhone(data.phone), data.address,
      items.map((i) => i.text).join(", "), t.subtotal, t.delivery, t.total, data.payment, member ? "Yes" : "No"]);
    return { orderId, total: t.total, delivery: t.delivery };
  });
