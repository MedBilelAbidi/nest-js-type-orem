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
  pictures?: any;
  education?: CvPropsDetails[]
  experience?: CvPropsDetails[]
  projects?: CvPropsDetails[]
  educationProjects?: CvPropsDetails[]
};

export type UpdateUserCvsParams  = {
  name: string;
  addresse: string;
  tel: string;
  email: string;
  title: string;
  bio: string;
  skills: string;
  certif: string;
  language: string;
  education?: CvPropsDetails[]
  experience?: CvPropsDetails[]
  projects?: CvPropsDetails[]
  educationProjects?: CvPropsDetails[]
};

export type CvPropsDetails = {
name: string
date: string;
discription: string
}