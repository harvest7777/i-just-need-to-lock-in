import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SignInWithGoogleButton from "../sign-up/with_google";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full mt-20 flex justify-center items-center">
      <form className="flex flex-col lg:w-2/5 w-full mx-auto bg-app-fg p-5 rounded-2xl">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <SubmitButton className="bg-app-highlight rounded-lg text-app-fg btn-hover" pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <SignInWithGoogleButton />
        <FormMessage message={searchParams} />
      </div>
    </form>
    </div>
  );
}
