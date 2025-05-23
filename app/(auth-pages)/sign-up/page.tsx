import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SignInWithGoogleButton from "./with_google"; 

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className=" w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />      

      </div>
    );
  }

  return (
    <div className="w-full mt-20 flex justify-center items-center">
      <form className="flex flex-col mx-auto bg-app-fg p-5 rounded-2xl lg:w-2/5 w-full">
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="name">Name</Label>
          <Input name="name" placeholder="Silly Guy" required />
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton className="bg-app-highlight rounded-lg text-app-fg btn-hover" formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <SignInWithGoogleButton />
          <FormMessage message={searchParams} />
        </div>

      </form>
      


    </div>
  );
}
