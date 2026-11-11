import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin/members")({
  head: () => ({
    meta: [
      { title: "Membership requests — MILAANA owner" },
      { name: "description", content: "Owner page to approve MILAANA membership requests." },
      { property: "og:title", content: "Membership requests — MILAANA" },
      { property: "og:description", content: "Approve or reject membership requests." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type Req = { id: string; full_name: string; phone: string; address: string; email: string | null; status: string; created_at: string };

function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const [rows, setRows] = useState<Req[]>([]);

  const load = () => supabase.from("membership_requests").select("*").order("created_at", { ascending: false }).then(({ data }) => setRows((data as Req[]) ?? []));
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  async function setStatus(id: string, status: "approved" | "rejected") {
    const { error } = await supabase.from("membership_requests").update({ status, reviewed_at: new Date().toISOString() }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(`Request ${status}`);
    load();
  }

  if (loading) return null;
  if (!user || !isAdmin) {
    return <div className="mx-auto max-w-md px-4 py-24 text-center"><p>This page is for the MILAANA owner only.</p><Link to="/login" className="mt-4 inline-block text-primary">Sign in</Link></div>;
  }

  return (
    <>
      <PageHeader title="Membership requests" intro="Approve a request to give that customer free home delivery." />
      <div className="mx-auto max-w-5xl space-y-3 px-4 py-10">
        {rows.length === 0 && <p className="text-muted-foreground">No requests yet.</p>}
        {rows.map((r) => (
          <div key={r.id} className="flex flex-col gap-3 rounded-2xl border border-border p-5 md:flex-row md:items-center md:justify-between">
            <div className="text-sm">
              <p className="text-base font-semibold">{r.full_name} <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs text-primary">{r.status}</span></p>
              <p className="text-muted-foreground">{r.phone} · {r.email}</p>
              <p className="text-muted-foreground">{r.address}</p>
              <p className="text-xs text-muted-foreground">Requested {new Date(r.created_at).toLocaleString("en-IN")}</p>
            </div>
            {r.status === "pending" && (
              <div className="flex gap-2">
                <Button className="rounded-full" onClick={() => setStatus(r.id, "approved")}>Approve</Button>
                <Button variant="outline" className="rounded-full" onClick={() => setStatus(r.id, "rejected")}>Reject</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
