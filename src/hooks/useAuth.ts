import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

const useAuth = () => {

  const [loggedInUser, setLoggedInUser] =
    useState<firebase.default.User | null>(null);
  // loggedInUser is set to null when no user is signed in.

  useEffect(() => {
    // when mounting the component we set the user:
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setLoggedInUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  // authentication functions

  const signUp = (
    email: string,
    password: string
  ): Promise<firebase.default.auth.UserCredential> =>
    auth.createUserWithEmailAndPassword(email, password);

  const login = (
    email: string,
    password: string
  ): Promise<firebase.default.auth.UserCredential> =>
    auth.signInWithEmailAndPassword(email, password);

  const logOut = (): Promise<void> => auth.signOut();

  const resetPassword = (email: string): Promise<void> =>
    auth.sendPasswordResetEmail(email);

  const updatePassword = (password: string): Promise<void> | undefined =>
    loggedInUser?.updatePassword(password);

  const signOut = (): Promise<void> => auth.signOut();

  const deleteUser = (): Promise<void> | undefined =>
    auth.currentUser?.delete();

  return {
    loggedInUser,
    signUp,
    login,
    logOut,
    resetPassword,
    updatePassword,
    signOut,
    deleteUser,
  };
};
export default useAuth;
