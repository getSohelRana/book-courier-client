import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "../authContext/AuthContext";
import { GoogleAuthProvider } from "firebase/auth";

// google provider
const googleProvider = new GoogleAuthProvider();
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
    return signOut(auth)
  }
  // sign in with google
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth , googleProvider)
  }
  // update user profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser , profile)
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
    setLoading,
    loginWithGoogle,
    updateUserProfile
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
