import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (

    <div className="w-full mt-20 flex justify-center items-center">
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4 bg-appFg rounded-xl">
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <Label htmlFor="password">New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <div className=" flex justify-center rounded-xl btn-hover bg-emerald-600">
      <SubmitButton formAction={resetPasswordAction} className="text-appFg">
        Reset password
      </SubmitButton>
      </div>
      <FormMessage message={searchParams} />
    </form>
    </div>
  );
}
