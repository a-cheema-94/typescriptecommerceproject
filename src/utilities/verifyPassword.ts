import { PasswordValidationStatus, validatePassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";

const verifyPassword = (password: string) => {
  const [passwordStatus, setPasswordStatus] = useState<PasswordValidationStatus | null>(null);

  const updatePasswordStatus = async () => {
    let passwordStatusRes: PasswordValidationStatus = await validatePassword(auth, password);
    setPasswordStatus(passwordStatusRes)
  }

  useEffect(() => {
    (async () => updatePasswordStatus())()
  }, [])

  return passwordStatus;
};

export default verifyPassword;