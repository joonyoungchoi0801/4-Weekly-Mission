const isemail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
const ispassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;

export const checkEmailValid = (email: string) => {
  if (!isemail.test(email)) {
    return false;
  } else {
    return true;
  }
};

export const checkPasswordValid = (password: string) => {
  if (!ispassword.test(password)) {
    return false;
  } else {
    return true;
  }
};
