import validator from "validator";

export const validateUserInput = ({ name, email, password }) => {
  const checkName = name && validator.isAlpha(name);
  const checkEmail = email && validator.isEmail(email);
  const checkPassword =
    password && validator.isStrongPassword(password, { minSymbols: 0 });

  return {
    checkName,
    checkEmail,
    checkPassword
  };
};