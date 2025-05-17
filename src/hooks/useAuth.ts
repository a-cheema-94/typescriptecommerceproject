import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  User,
  UserCredential,
} from "firebase/auth";

const useAuth = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  // loggedInUser is set to null when no user is signed in.

  // Global Authentication manager
  useEffect(() => {
    // when mounting the component we set the user:
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // prevent unnecessary re-renders => check whether user has actually changed from previous user, otherwise no need for new state update.
      setLoggedInUser((prevUser) => {
        if (prevUser?.uid !== firebaseUser?.uid) return firebaseUser;
        return prevUser;
      });
    });
    
    return unsubscribe;
  }, []);

  // authentication functions

  const signUp = (email: string, password: string): Promise<UserCredential> =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email: string, password: string): Promise<UserCredential> =>
    signInWithEmailAndPassword(auth, email, password);

  const changePassword = (password: string): Promise<void> | null =>
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
