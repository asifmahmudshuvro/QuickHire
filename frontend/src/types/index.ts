export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type JobCreatePayload = {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
};

export type ApplicationPayload = {
  job_id: number;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type UserRegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};
