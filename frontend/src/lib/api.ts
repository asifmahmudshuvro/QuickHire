import type {
  Application,
  ApplicationPayload,
  AuthUser,
  Job,
  JobCreatePayload,
  LoginPayload,
  LoginResponse,
  UserRegisterPayload,
} from "@/types";

/*
 Production-safe API URL
 Works both locally and on Railway
*/

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://quickhire-production-86ea.up.railway.app/api";

type ApiResponse<T> = {
  data: T;
  message?: string;
};

type ApiErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

function getAuthHeaders(token?: string): HeadersInit {
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({} as ApiErrorResponse));

    throw new ApiError(
      body?.message ?? "Request failed",
      response.status,
      body?.errors
    );
  }

  return response.json() as Promise<T>;
}

/* =========================
   Jobs
========================= */

export async function getJobs(filters?: {
  search?: string;
  category?: string;
  location?: string;
}): Promise<Job[]> {
  const params = new URLSearchParams();

  if (filters?.search) params.set("search", filters.search);
  if (filters?.category) params.set("category", filters.category);
  if (filters?.location) params.set("location", filters.location);

  const query = params.toString() ? `?${params.toString()}` : "";

  const json = await request<ApiResponse<Job[]>>(`/jobs${query}`);

  return json.data;
}

export async function getJobById(id: string): Promise<Job> {
  const json = await request<ApiResponse<Job>>(`/jobs/${id}`);

  return json.data;
}

export async function createJob(
  payload: JobCreatePayload,
  token?: string
): Promise<Job> {
  const json = await request<ApiResponse<Job>>(`/jobs`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });

  return json.data;
}

export async function deleteJob(id: number, token?: string): Promise<void> {
  await request(`/jobs/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
}

/* =========================
   Applications
========================= */

export async function submitApplication(
  payload: ApplicationPayload
): Promise<void> {
  await request(`/applications`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getAdminApplications(
  token: string
): Promise<Application[]> {
  const json = await request<ApiResponse<Application[]>>(`/applications`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return json.data;
}

/* =========================
   Admin Auth
========================= */

export async function loginAdmin(
  payload: LoginPayload
): Promise<LoginResponse> {
  const json = await request<ApiResponse<LoginResponse>>(`/auth/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return json.data;
}

export async function getCurrentAdmin(token: string): Promise<AuthUser> {
  const json = await request<ApiResponse<AuthUser>>(`/auth/me`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return json.data;
}

export async function logoutAdmin(token: string): Promise<void> {
  await request(`/auth/logout`, {
    method: "POST",
    headers: getAuthHeaders(token),
  });
}

/* =========================
   User Auth
========================= */

export async function registerUser(
  payload: UserRegisterPayload
): Promise<LoginResponse> {
  const json = await request<ApiResponse<LoginResponse>>(
    `/auth/user/register`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

  return json.data;
}

export async function loginUser(
  payload: LoginPayload
): Promise<LoginResponse> {
  const json = await request<ApiResponse<LoginResponse>>(
    `/auth/user/login`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

  return json.data;
}

export async function getCurrentUser(token: string): Promise<AuthUser> {
  const json = await request<ApiResponse<AuthUser>>(`/auth/user/me`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return json.data;
}

export async function logoutUser(token: string): Promise<void> {
  await request(`/auth/user/logout`, {
    method: "POST",
    headers: getAuthHeaders(token),
  });
}