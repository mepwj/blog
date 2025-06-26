import profileData from '@/data/profile.json';

export interface Profile {
  name: string;
  nickname: string;
  title: string;
  profileImage: string;
  social: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
    workEmail?: string;
  };
  skills: string[];
  blog: {
    name: string;
    domain: string;
    tagline?: string;
  };
}

export function getProfile(): Profile {
  return profileData as Profile;
}