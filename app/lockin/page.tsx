import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Dashboard from "./_components/Dashboard";
export default async function LockInPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
    return(
        <>
          <Dashboard/>
        </>
    )
}