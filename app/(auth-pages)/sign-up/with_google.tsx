"use client";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/app/actions";
const SignInWithGoogleButton = () => {
    return (
        <div className="bg-appFg border-blue-500 border-2 p-2 btn-hover rounded-lg flex justify-center items-center align-middle space-x-4" onClick={(signInWithGoogle)}>
            <FcGoogle className="text-2xl bg-appFg"/>
            <p className=" text-center">Continue with Google</p>
        </div>
    )
}
export default SignInWithGoogleButton;