import { CreateCvDetailsDto } from "./CreateCvDetails.dto";

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
    education?: CreateCvDetailsDto[]
    experience?: CreateCvDetailsDto[]
    projects?: CreateCvDetailsDto[]
    educationProjects?: CreateCvDetailsDto[]
  };