import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type MemberStatus = "none" | "pending" | "approved" | "rejected";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [member, setMember] = useState<MemberStatus>("none");
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    supabase.auth.getSession().then(({ data }) => { setUser(data.session?.user ?? null); setLoading(false); });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) { setIsAdmin(false); setMember("none"); return; }
    supabase.from("user_roles").select("role").eq("user_id", user.id).then(({ data }) => setIsAdmin(!!data?.some((r) => r.role === "admin")));
    supabase.from("membership_requests").select("status").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => setMember((data?.status as MemberStatus) ?? "none"));
  }, [user, tick]);

  return { user, isAdmin, member, loading, refresh: () => setTick((t) => t + 1) };
}
