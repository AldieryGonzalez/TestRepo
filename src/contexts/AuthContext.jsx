import React, { useContext, useEffect, useState } from "react";
import { auth, database, useDbData, useDbUpdate } from "../utilities/firebase";
import { onValue, ref as dbRef, update } from "@firebase/database";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isNorthwesternStudent, setIsNorthwesternStudent] = useState(false);
  const [updateData, result] = useDbUpdate(`users/${user?.uid}`);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsNorthwesternStudent(false);
      setUser(user);
      if (user === null) return;
      if (user.email.endsWith("northwestern.edu")) {
        setIsNorthwesternStudent(true);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    user,
    isNorthwesternStudent,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
