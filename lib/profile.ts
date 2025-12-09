import profileData from '@/content/profile.json';

export interface Profile {
  nickname: string;
  title: string;
  shortBio: string;
  bio: string[];
  blogDescription: string;
  techStack: string[];
  social: {
    email: string;
    github: string;
    linkedin: string;
    x: string;
  };
}

export function getProfile(): Profile {
  return profileData;
}
