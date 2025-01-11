import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword, User, UserCredential } from "firebase/auth";

const useAuth = () => {

  const [loggedInUser, setLoggedInUser] =
    useState<User | null>(null);
  // loggedInUser is set to null when no user is signed in.

  useEffect(() => {
    // when mounting the component we set the user:
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoggedInUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  // authentication functions

  // todo => need to add password validation to signUp, login and changePassword functions i.e. test against a regex expression using regex.test(password);

  const signUp = (
    email: string,
    password: string
  ): Promise<UserCredential> =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (
    email: string,
    password: string
  ): Promise<UserCredential> =>
    signInWithEmailAndPassword(auth, email, password);
    
  const changePassword = (password: string): Promise<void> | null=>
    loggedInUser ? updatePassword(loggedInUser, password) : null;


  const resetPassword = (email: string): Promise<void> =>
    sendPasswordResetEmail(auth, email);

  const logOut = (): Promise<void> => signOut(auth);

  const deleteUser = (): Promise<void> | undefined =>
    auth.currentUser?.delete();

  return {
    loggedInUser,
    signUp,
    login,
    resetPassword,
    changePassword,
    logOut,
    deleteUser,
  };
};
export default useAuth;
