import { useStoreVars } from "@/context/states";
import React from "react";

const Logout = () => {
  const { isLoggedIn } = useStoreVars();

  return (
    <button
      className={`md:hidden inline-block text-color-white text-sm font-bold bg-color-purple hover:bg-color-light-purple p-3 rounded-r-full fixed bottom-5 left-0  z-10`}
      // onClick={isLoggedIn ? handleLogout : goToLoginPage}
    >
      {isLoggedIn ? `Logout` : `Log in`}
    </button>
  );
};

export default Logout;
