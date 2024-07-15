import { useContext } from "react";

import AuthContext, { AuthContextState } from "@contexts/AuthContext";

const useAuth = () => {
  return useContext<AuthContextState>(AuthContext);
};

export default useAuth;
