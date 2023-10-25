"use client";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();
  console.log({ session, status });
  return (
    <div className="flex items-center justify-center">
      <button
        className="text-white px-8 py-2 rounded-full bg-green-500 font-bold text-lg"
        onClick={() => signIn("spotify", { callbackUrl: "/" })}
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
