import { describe, expect, it } from "vitest";
import { calcTotals, products } from "@/lib/products";

describe("cart totals", () => {
  it("non-members pay ₹20 delivery", () => {
    expect(calcTotals(500)).toMatchObject({ delivery: 20, total: 520 });
  });
  it("members get free delivery", () => {
    expect(calcTotals(100, true)).toMatchObject({ delivery: 0, total: 100 });
  });
});

describe("prices", () => {
  it("cow milk is ₹38 for 500 ml and ₹70 for 1 litre", () => {
    const cow = products.find((p) => p.slug === "cow-milk")!;
    expect(cow.packs.map((k) => k.price)).toEqual([38, 70]);
  });
  it("buffalo milk, curd and paneer are out of stock with price hidden", () => {
    for (const slug of ["buffalo-milk", "curd", "paneer"]) {
      const p = products.find((x) => x.slug === slug)!;
      expect(p.priceHidden).toBe(true);
      expect(p.packs.every((k) => k.stock === 0)).toBe(true);
    }
  });
});
