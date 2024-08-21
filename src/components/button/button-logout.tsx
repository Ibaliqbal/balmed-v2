"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

const ButtonLogout = ({ isAuth }: { isAuth: Session | null }) => {
  return (
    <div className="w-full">
      {isAuth ? (
        <button
          className="bg-red-600 font-bold py-4 w-full rounded-md"
          onClick={() => signOut()}
        >
          Logout
        </button>
      ) : (
        <button
          className="bg-blue-600 font-bold py-4 px-4 w-full rounded-md"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default ButtonLogout;
