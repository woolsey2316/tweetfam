export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
  occupation: string;
  picture: string | File;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
