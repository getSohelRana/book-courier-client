import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "../authContext/AuthContext";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //signUp new users
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signIn users
  const signInUser = (email , password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // sign out users
  const signOutUser = () => {
    setLoading(true)
    return signOut()
  }
  //observer user data
  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
      setUser(currentUser);
      setLoading(false);
    }) 
    return () => {
      unsubscribe();
    }
  },[])
  const authInfo = {
    createUser,
    signInUser,
    signOutUser,
    user,
    loading,
    setLoading
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
