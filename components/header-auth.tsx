import { goToHomeAction, signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiSignOut } from "react-icons/pi";
import { FaLeaf } from "react-icons/fa";
import { MdOutlineAutoGraph } from "react-icons/md";
export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? (
    // Nav container
    <div className="p-2 rounded-2xl h-10 w-full flex items-center gap-4 justify-between">
      <div className="flex space-x-6 btn-hover" onClick={goToHomeAction}>
        <FaLeaf className="text-emerald-600 h-full text-4xl"/>
        <h1 className="text-4xl font-extrabold text-emerald-800">lockin</h1>
      </div>
      <div className="flex space-x-12 text-3xl">
        <MdOutlineAutoGraph className="btn-hover"/>
        <LiaUserFriendsSolid className="btn-hover"/>
        <PiSignOut className="btn-hover" onClick={signOutAction}/>
      </div>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
