import { useStoreVars } from "@/context/states";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next13-progressbar";
import React from "react";

const Logout = () => {
  const { isLoggedIn } = useStoreVars();
  const router = useRouter();

  const { logout } = useAuth();

  const handleAuthButton = () => {
    if (isLoggedIn) {
      logout();
    } else {
      router.push("/login");
    }
  };

  const authButtonDisplay = () => {
    if (isLoggedIn) {
      return `Logout`;
    } else {
      return `Log in`;
    }
  };

  return (
    <button
      className={`md:hidden grid place-items-center text-color-white text-sm font-bold bg-color-purple hover:bg-color-light-purple w-16 py-3 rounded-r-full fixed bottom-5 left-0  z-10`}
      onClick={handleAuthButton}
    >
      {authButtonDisplay()}
    </button>
  );
};

export default Logout;
