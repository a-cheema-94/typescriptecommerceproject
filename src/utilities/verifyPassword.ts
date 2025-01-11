import { PasswordValidationStatus, validatePassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const verifyPassword = async (password: string) => {
  const passwordStatus: PasswordValidationStatus = await validatePassword(
    auth,
    password
  );
  const passwordErrorMessage: string[] = [];

  // declare variables for different cases:
  const needsMoreCharacters = passwordStatus.meetsMinPasswordLength !== true;
  const needsLowerCase = passwordStatus.containsLowercaseLetter !== true;
  const needsUpperCase = passwordStatus.containsUppercaseLetter !== true;
  const needsNumericCharacters = passwordStatus.containsNumericCharacter !== true;
  const needsNonAlphanumericCharacters = passwordStatus.containsNonAlphanumericCharacter !== true;

  if(!passwordStatus.isValid) {
    if(needsMoreCharacters) passwordErrorMessage.push('Needs more Characters');
    if(needsLowerCase) passwordErrorMessage.push('Needs lower case Characters');
    if(needsUpperCase) passwordErrorMessage.push('Needs upper case Characters');
    if(needsNumericCharacters) passwordErrorMessage.push('Needs numeric Characters');
    if(needsNonAlphanumericCharacters) passwordErrorMessage.push('Needs non alpha numeric Characters');
  }
  

  return { passwordStatus, passwordErrorMessage };
};

export default verifyPassword;
