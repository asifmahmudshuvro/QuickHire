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
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};
