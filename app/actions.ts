"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const supabase = await createClient();

  if (!email || !name?.trim()) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and Username required",
    );
  }

  const{error} = await supabase.auth.signInWithOtp({email, options: {
    data: {name},
    shouldCreateUser:true
  }})

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/verify-otp",
      email
    )
  }
};

export const confirmOTP = async(formData: FormData, email:string) => {
  const supabase = await createClient();
  const token = formData.get("code")?.toString();
  if(!token) return;
  const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email'})

  if(error) return encodedRedirect(
    "error",
    "/verify-otp",
    error.message
  )
  return redirect("/lockin") 
}

export const tryAgainOTP = async(email:string) => {
  const supabase = await createClient();

  const{error} = await supabase.auth.signInWithOtp({email, options: {
    shouldCreateUser: false
  }})
  if(error) return encodedRedirect(
    "error",
    "/verify-otp",
    error.message
  )
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const supabase = await createClient();

  const{error} = await supabase.auth.signInWithOtp({email, options: {
    shouldCreateUser:false
  }})
  if(error) {
    return encodedRedirect(
      "error",
      "/verify-otp",
      error.message
    )
  }
  return encodedRedirect(
    "success",
    "/verify-otp",
    email
  ) 
};

export const signInWithGoogle = async () => {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const{data, error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
          redirectTo: `${origin}/auth/callback`,
      }
    })
    if (error) {
      return encodedRedirect("error", "/sign-in", error.message);
    }
    if(data.url) {
      return redirect(data.url);
    }

}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
