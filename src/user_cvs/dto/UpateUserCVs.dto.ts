import { UpadateCvDetailsDto } from "./UpateCVsDetails.dto";

export type UpateUserCVsDto = {
    name: string;
    addresse: string;
    tel: string;
    email: string;
    title: string;
    bio: string;
    skills: string;
    certif: string;
    language: string;
    education?: UpadateCvDetailsDto[]
    experience?: UpadateCvDetailsDto[]
    projects?: UpadateCvDetailsDto[]
    educationProjects?: UpadateCvDetailsDto[]
  };