import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
UserContext.displayName = "UserContext";

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
}
