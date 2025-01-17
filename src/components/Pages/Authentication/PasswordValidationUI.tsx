import verifyPassword from "../../../utilities/verifyPassword";

type Props = {
  password: string;
};

// todo => sync passwordStatus data to display in UI.

const PasswordValidationUI = ({ password }: Props) => {

  
  const passwordStatus = verifyPassword(password);

  const samplePasswordValidationObject = {
    isValid: true,
    meetsMinPasswordLength: true,
    meetsMaxPasswordLength: true,
    containsLowercaseLetter: true,
    containsUppercaseLetter: true,
    containsNumericCharacter: true,
    containsNonAlphanumericCharacter: true,
    test: { test: 'test' }
  };

  return (
    <div>
      <h3>Password Validation</h3>
      <p
        className={
          passwordStatus?.containsUppercaseLetter === true
            ? "text-green-600"
            : "text-red-600"
        }
      >
        contains uppercase letters
        {passwordStatus?.containsUppercaseLetter === true ? (
          <span>✔</span>
        ) : (
          <span>❌</span>
        )}
      </p>
    </div>
  );
};

export default PasswordValidationUI;
