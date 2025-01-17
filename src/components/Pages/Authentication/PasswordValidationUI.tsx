import verifyPassword from "../../../utilities/verifyPassword";
import { PasswordValidationStatus } from "firebase/auth";

type Props = {
  password: string;
};

// todo => refactor password validation functions and component.

const PasswordValidationUI = ({ password }: Props) => {
  const passwordStatus: PasswordValidationStatus | null =
    verifyPassword(password);

  const getPasswordValidationCategories = (
    statusObject: PasswordValidationStatus | null
  ) => {
    const validationKeys = Object.keys(statusObject ?? {});
    const validationValues = Object.values(statusObject ?? {});
    const mappedKeys = validationKeys.map((passwordCategory, index) => {
      let editedCategory = passwordCategory
        .replace(/([a-z])([A-Z])/g, "$1" + " " + "$2")
        // replace all instances of a lower case character directly followed by an upper case character with the lower case followed by a space and then the upper case. $i references the ith character.
        .toLowerCase();
      const validationValue = validationValues[index];
      return { editedCategory, validationValue };
    });

    return mappedKeys.filter(
      (data) => data.editedCategory !== "password policy"
    );
  };

  let passwordCategories: {
    editedCategory: string;
    validationValue: boolean;
  }[] = [];
  if (passwordStatus)
    passwordCategories = getPasswordValidationCategories(passwordStatus);

  return (
    <div>
      <h3>Password Validation</h3>
      {passwordCategories.map((category, index) => (
        <PasswordValidationCategory category={category} key={index}/>
      ))}
    </div>
  );
};

const PasswordValidationCategory = ({
  category,
}: {
  category: {
    editedCategory: string;
    validationValue: boolean;
  };
}) => {
  return (
    <p
    className={
      category.validationValue === true
        ? "text-green-600"
        : "text-red-600"
    }
  >
    {category.editedCategory}
    {category.validationValue === true ? (
      <span>✔</span>
    ) : (
      <span>❌</span>
    )}
  </p>
  )
  
};

export default PasswordValidationUI;
