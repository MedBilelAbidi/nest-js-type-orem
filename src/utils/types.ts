export type CreateUserParams = {
  username: string;
  password: string;
};
export type UpdateUserParams = {
  username: string;
  password: string;
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  createdAt: Date;
  age: number;
};

export type CreateUserCvsParams = {
  name: string;
  addresse: string;
  tel: string;
  email: string;
  title: string;
  bio: string;
  skills: string;
  certif: string;
  language: string;
};
