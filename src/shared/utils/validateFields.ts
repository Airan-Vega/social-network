export const checkIfFieldExist = <T>(fieldName: string, value: T) => {
  if (!value) {
    throw new Error(`The field ${fieldName} is required`);
  }
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
};
