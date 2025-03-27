"use client";
import { confirmOTP, tryAgainOTP } from "@/app/actions";
import { Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const handleGetEmail = async () => {
    const searchParams = await props.searchParams;
    if (searchParams) {
      if ("success" in searchParams) {
        setEmail(searchParams.success);
      }
      if ("error" in searchParams) {
        setMessage("Account doesn't exist!");
      }
    }
  }
  useEffect(() => { handleGetEmail() }, [])

  return (
    <div className="w-full mt-20 flex justify-center items-center">
      <form className="flex flex-col mx-auto bg-app-fg p-5 rounded-2xl lg:w-2/5 w-full">
        <h1 className="text-2xl font-medium">Confirm Login</h1>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="code">Please check your email for the verification code!</Label>
          <Input
            type="text"
            name="code"
            placeholder="123456"
            minLength={6}
            maxLength={6}
            required
          />
          <SubmitButton className="bg-app-highlight rounded-lg text-app-fg btn-hover" formAction={(formData) => confirmOTP(formData, email)} pendingText="Signing up...">
            Verify
          </SubmitButton>
          <p onClick={() => tryAgainOTP(email)} className="text-xs border-2 p-2 rounded-xl text-center btn-hover">No code in your inbox, junk, or spam? Click here to try again.</p>
          <p className="text-xs pl-2 text-red-500">{message}</p>
        </div>
      </form>
    </div>
  );
}
