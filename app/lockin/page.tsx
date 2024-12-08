import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LockIn from "./_components/task_dashboard";
import Dashboard from "./_components/dashboard";
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