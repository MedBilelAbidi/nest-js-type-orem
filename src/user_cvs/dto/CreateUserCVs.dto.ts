type CreateCvDetailsDto = {
  name: string
  date: string;
  discription: string;
}

export type CreateUserCVsDto = {
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
    education?: CreateCvDetailsDto[]
    experience?: CreateCvDetailsDto[]
    projects?: CreateCvDetailsDto[]
    educationProjects?: CreateCvDetailsDto[]
  };