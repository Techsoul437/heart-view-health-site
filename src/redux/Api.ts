/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const API = axios.create({
  baseURL: "https://api.heartviewhealth.com/api",
  // baseURL: "http://localhost:3000/api",

});

// ==============================
// Types
// ==============================

export interface Patient {
  _id?: string;
  name: string;
  email?: string;
  phone?: string | null;
  sex?: string;
  DOB?: string;
  country?: string;
  state?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface Staff {
  _id?: string;
  empId?: string;
  fullName: string;
  phone: string;
  email: string;
  designation: string;
  department: string;
  branch: string;
  address?: string;
   labId: string;
  labName: string;
  status: "Active" | "Inactive";
  joiningDate?: string;
  createdAt?: string;
  updatedAt?: string;
  error: string | null;
}

export interface StaffState {
  loading: boolean;
  error: string | null;
  data: Staff[];
}


export interface StaffLoginPayload {
  email: string;
  password: string;
  fcmToken?: string;
}

export interface StaffUser {
  _id: string;
  empId: string;
  fullName: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  branch: string;
  status: string;
  fcmToken?: string;
}

export interface StaffLoginResponse {
  success: boolean;
  message: string;
  data: StaffUser;
  accessToken: string;
  refreshToken: string;
  fcmToken?: string;
}
// ==============================
// LAB AUTH TYPES
// ==============================

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterLabPayload {
  labName: string;
  ownerName: string;
  email: string;
  phone: string;
  password: string;
}

export interface SendOtpPayload {
  mobile: string;
}

export interface VerifyOtpPayload {
  idToken: string;
  fcmToken?: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface LabUser {
  _id: string;
  labName?: string;
  ownerName?: string;
  email: string;
  phone: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  data: LabUser;
}
export interface CountryState {
  code: string;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  states?: CountryState[];
}
interface ErrorResponse {
  success: boolean;
  message: string;
}
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  mobile: string;
  labName: string;
  labType: string;
  city: string;
  branchName?: string;
  address?: string;
  state?: string;
  pincode?: string;
  fcmToken?: string; // ✅ Add this
}
export interface RegisterResponse {
  success: boolean;
  message: string;
  data: LabUser;
  fcmtoken?: string;
  accessToken: string;
  refreshToken: string;
}
export interface RegisterWithEmailPayload {
  fullName: string;
  email: string;
  password: string;
  labName: string;
  labType: string;
  city: string;
  fcmToken?: string;
}

export interface RegisterWithEmailResponse {
  success: boolean;
  message: string;
  data: LabUser;
  accessToken: string;
  refreshToken: string;
  fcmtoken?: string;
}
export interface LoginMobilePayload {
  idToken: string;
  fcmToken?: string;
}

export interface LoginEmailPayload {
  email: string;
  password: string;
  fcmToken?: string;
}
// ==============================
// PROFILE TYPES
// ==============================

export interface LabProfile {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  labName: string;
  labType: string;
  city: string;
  role: string;
  logo?: string; // 👈 add this
  branchName?: string; // 👈 add this
}

export interface UpdateProfilePayload {
  fullName?: string;
  email?: string;
  mobile?: string;
  labName?: string;
  labType?: string;
  branchName?: string; // ✅ correct
  logo?: string;
  city?: string;
}

export interface UploadReportResponse {
  success: boolean;
  message: string;
  results: any[];
  reports: string[];
}

export interface UpdateReportMetricPayload {
  reportId: string;
  report_metric_id: string;
  metric_code: string;
  value: string | number;
  unit: string;
  ref_range?: string;
  taken_at: Date;
}
export interface UpdateReportMetricResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    matrics: unknown[];
  };
}
export interface HealthProfilePayload {
  user_id?: string;

  height_cm?: number;
  weight_kg?: number;

  blood_pressure?: string;
  blood_sugar?: string;
  heart_history?: string;
  smoking?: string;
}

export interface HealthProfileResponse {
  success: boolean;
  message: string;
  data: any;
}
export interface HealthProfile {
  _id?: string;
  user_id?: string;

  height_cm?: number;
  weight_kg?: number;

  blood_pressure?: string;
  blood_sugar?: string;
  heart_history?: string;
  smoking?: string;

  blood_pressure_issue?: boolean | string;
  sugar_issue?: boolean | string;

  heart_problem_history?: string;
  smoking_use?: string;
  alcohol_use?: string;

  createdAt?: string;
  updatedAt?: string;
}
// ==============================
// UPDATE USER TYPES
// ==============================

export interface UpdateUserPayload {
  name?: string;
  DOB?: string;
  sex?: string;
  email?: string;
  phone?: string;
  country?: string;
  state?: string;
  languages?: string[];
  risk_factors?: string[];
  emergency_settings?: {
    enabled?: boolean;
    contacts?: {
      name: string;
      phone: string;
      relation?: string;
    }[];
  };
  weight?: number;
  height?: number;
  iscomplited?: boolean;
  role: string;
  // ✅ NEW
  fcmToken?: string;
  refreshToken?: string;
  accessToken?: string;
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: Patient;
  userId: string;
}
export interface GetUserByIdResponse {
  success: boolean;
  data: Patient;
}
export interface GetHealthByIdResponse {
  success: boolean;
  data: any;
}

export interface Report {
  _id: string;
  user_id: string;
  report_name: string;
  report_url: string;
  createdAt: string;
  updatedAt: string;
}

// Ek metric ka real shape
export interface ReportMetric {
  metric_code: string;
  name: string;
  value: { value: number | string };
  unit: string;
  status: string;              // clinical status: normal/high/low
  category?: string;
  medical_source?: string | null;
  ref_range?: string;
  confidence?: number;
  user_facing_status?: string; // "auto_accept" | "review"
  locked: boolean;
  source?: string;
  taken_at?: string;
  report_metric_id: string;
}

// Poora report object (ye hi "data" hai response me)
export interface ReportData {
  fileSizeInBytes: any;
  size: any;
  fileSize: any;
  _id: string;
  userId?: string;
  filename?: string;
  fileUrl?: string;
  Role?: string;
  final_save?: boolean;
    fileName: string;
  fileType: string;
  matrics: ReportMetric[];
  lab_name?: string;
  report_date?: string;
  fileData: string;
  createdAt?: string;
  updatedAt?: string;
}

// getReportsByUser response ab ek object return karta hai, array nahi
export interface GetReportsByUserResponse {
  success: boolean;
  data: ReportData;
}
export interface FinalSaveReportPayload {
  reportId: string;
  final_save: boolean;
}

export interface FinalSaveReportResponse {
  success: boolean;
  message: string;
  data: ReportData;
}

export interface DeleteReportMetricPayload {
  reportId: string;
  report_metric_id: string;
}

export interface DeleteReportMetricResponse {
  success: boolean;
  message: string;
  data: ReportData;
}
export interface DeleteUserResponse {
  success: boolean;
  message: string;
}

export interface GetAllReportsResponse {
  success: boolean;
  count: number;
  data: ReportData[];
}
export interface GetReportByIdResponse {
  success: boolean;
  data: ReportData;
}
export interface StaffProfile {
  _id: string;
  empId: string;
  fullName: string;
  phone: string;
  email: string;
  designation: string;
  department: string;
  branch: string;
  address: string;
  role: string;
  status: string;
  joiningDate: string;
}
export interface UpdateStaffProfilePayload {
  fullName?: string;
  designation?: string;
  department?: string;
  branch?: string;
  address?: string;
}
export interface SendReportLinkPayload {
  reportId: string;
  patientId: string;
  mobile:string;
}

export interface ReportLink {
  _id: string;
  reportId: string;
  patientId: string;
  mobile: string;
  token: string;
  linkUrl: string;
  status: "Sent" | "Viewed" | "Downloaded" | "Expired" | "Failed";
  expiresAt: string;
  createdAt: string;
}

export interface SendReportLinkResponse {
  success: boolean;
  message: string;
  data: ReportLink;
}
export interface ReportDetails {
  report: ReportData;
  user: Patient;
}

export interface GetReportDetailsResponse {
  success: boolean;
  message: string;
  data: ReportDetails;
}

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInquiryPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface CreateInquiryResponse {
  success: boolean;
  message: string;
  data: Inquiry;
}

export interface GetAllInquiryResponse {
  success: boolean;
  count: number;
  data: Inquiry[];
}

export interface DeleteInquiryResponse {
  success: boolean;
  message: string;
}

export interface HeartViewAdminLoginPayload {
  email: string;
  password: string;
  fcmToken?: string;
}

export interface HeartViewAdminUser {
  _id: string;
  fullName: string;
  email: string;
  mobile?: string;
  profileImage?: string;
  role: string;
  status: string;
  fcmToken?: string;
}

export interface HeartViewAdminLoginResponse {
  success: boolean;
  message: string;
  data: HeartViewAdminUser;
  accessToken: string;
  refreshToken: string;
}
export interface HeartViewAdmin {
  _id: string;
  adminId: string;
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  profileImage: string;
  role: string;
  status: string;
}

export interface HeartViewAdminResponse {
  success: boolean;
  message: string;
  data: HeartViewAdmin;
}
export interface Lab {
  _id: string;
  fullName: string;
  email: string;
  mobile?: string;
  alternateMobile?: string;
  labName: string;
  labCode?: string;
  branchName?: string;
  labType: string;
  city: string;
  address?: string;
  state?: string;
  pincode?: string;
  gstNumber?: string;
  panNumber?: string;
  status: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllLabsResponse {
  success: boolean;
  count: number;
  data: Lab[];
}
export interface AuditLog {
  _id: string;
  adminId: string;
  adminName: string;
  action: string;
  module: string;
  description: string;
  status: string;
  ipAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllAuditLogsResponse {
  success: boolean;
  count: number;
  data: AuditLog[];
}
export interface GetLabByIdResponse {
  success: boolean;
  data: Lab;
}

export interface LabUserItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

export interface GetLabUsersResponse {
  success: boolean;
  count: number;
  data: LabUserItem[];
}
// ==============================
// ADMIN LOGIN TYPES
// ==============================

export interface AdminLoginPayload {
  email: string;
  password: string;
  fcmToken?: string;
}

export interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  mobile?: string;
  profileImage?: string;
  role: string;
  status: string;
  isEmailVerified?: boolean;
  fcmToken?: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  data: AdminUser;
  accessToken: string;
  refreshToken: string;
}
export interface AdminData {
  _id: string;
  fullName: string;
  email: string;
  mobile?: string | null;
  profileImage?: string | null;
  role: "admin";
  status: "active" | "inactive";
  isEmailVerified?: boolean;
  fcmToken?: string | null;
  lastLogin?: string | null;
}

export interface AdminProfileResponse {
  success: boolean;
  data: AdminData;
}
// ==============================
// BLOG TYPES
// ==============================

export interface BlogContent {
  heading: string;
  paragraphs: string[];
  images: string[];
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogData {
   _id: string;
  title: string;
  slug: string;
  author: string;
  publishDate: string;
  category: string;
  mainImage: string;
  description: string;
  content: BlogContent[];
  tags: string[];
  status: "draft" | "published";
  peopleAlsoAsk: BlogFAQ[];
  faq: BlogFAQ[];
  seoTitle: string;
  seoDescription: string;
  schemaMarkup?: unknown;
}
export interface BlogResponse {
  success: boolean;
  message: string;
  data: BlogData;
}
export interface AddBlogPayload {
  title: string;
  slug: string;
  author: string;
  publishDate: string;
  category: string;
  mainImage: File;
  description: string;
  content: BlogContent[];
  tags: string[];
  status: "draft" | "published";
  peopleAlsoAsk: BlogFAQ[];
  faq: BlogFAQ[];
  seoTitle?: string;
  seoDescription?: string;
  schemaMarkup?: unknown;
}

export interface UpdateBlogPayload {
  id: string;
  title: string;
  slug: string;
  author: string;
  publishDate: string;
  category: string;
  mainImage?: File;
  description: string;
  content: BlogContent[];
  tags: string[];
  status: "draft" | "published";
  peopleAlsoAsk: BlogFAQ[];
  faq: BlogFAQ[];
  seoTitle?: string;
  seoDescription?: string;
  schemaMarkup?: unknown;
}
// =========================
// Team Interface
// =========================

export interface TeamMember {
  _id: string;
  fullName: string;
  designation: string;
  description?: string;
  status: "Active" | "Inactive";
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

// =========================
// Response Interfaces
// =========================

interface TeamResponse {
  success: boolean;
  message: string;
  data: TeamMember;
}

export interface GetTeamsResponse {
  success: boolean;
  count: number;
  data: TeamMember[];
  message: string;
}
export interface DeleteBlogResponse {
  success: boolean;
  message: string;
  data: BlogData;
}
export interface UpdateAdminProfilePayload {
  id: string;
  fullName?: string;
  mobile?: string;
  fcmToken?: string;
  profileImage?: File | null;
}

// ==============================
// BLOG TYPES
// ==============================

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  author: string;
  publishDate: string;
  category: string;
  mainImage: string;
  description: string;
  content: any[];
  tags: string[];
  status: string;
  peopleAlsoAsk: any[];
  faq: any[];
  seoTitle: string;
  seoDescription: string;
  schemaMarkup: any;
  createdAt?: string;
  updatedAt?: string;
}


// export interface UpdateBlogPayload {
//   title?: string;
//   slug?: string;
//   author?: string;
//   publishDate?: string;
//   category?: string;
//   mainImage?: string;
//   description?: string;
//   content?: any[];
//   tags?: string[];
//   status?: string;
//   peopleAlsoAsk?: any[];
//   faq?: any[];
//   seoTitle?: string;
//   seoDescription?: string;
//   schemaMarkup?: any;
// }

export interface AddBlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}

export interface UpdateBlogResponse {
  success: boolean;
  message: string;
  data: Blog;
}

export interface GetBlogsResponse {
  success: boolean;
  message: string;
  count: number;
  data: Blog[];
}

export interface GetBlogByIdResponse {
  success: boolean;
  message: string;
  data: Blog;
}

// ==============================
// TEAM TYPES
// ==============================

export interface AddTeamPayload {
  fullName: string;
  designation: string;
  description?: string;
  status?: "Active" | "Inactive";
  image?: string;
}

export interface UpdateTeamPayload {
  fullName?: string;
  designation?: string;
  description?: string;
  status?: "Active" | "Inactive";
  image?: string;
}

export interface AddTeamResponse {
  success: boolean;
  message: string;
  data: TeamMember;
}

export interface GetTeamsResponse {
  success: boolean;
  message: string;
  count: number;
  data: TeamMember[];
}

export interface GetTeamByIdResponse {
  success: boolean;
  message: string;
  data: TeamMember;
}

export interface UpdateTeamResponse {
  success: boolean;
  message: string;
  data: TeamMember;
}

export interface DeleteTeamResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
  };
}

// ==============================
// ADMIN PROFILE TYPES
// ==============================

export interface AdminProfile {
  _id: string;
  fullName: string;
  email: string;
  mobile?: string;
  profileImage?: string;
  role: string;
  status: string;
  isEmailVerified?: boolean;
  fcmToken?: string;
  lastLogin?: string;
}

export interface GetAdminProfileResponse {
  success: boolean;
  data: AdminProfile;
}

export interface UpdateAdminProfileResponse {
  success: boolean;
  message: string;
  data: AdminProfile;
}
export interface AdminLoginPayload {
  email: string;
  password: string;
  fcmToken?: string;
}
export interface GetAllBlogsResponse {
  success: boolean;
  message: string;
  count: number;
  data: BlogData[];
}
// ==============================
// GET ALL USERS
// ==============================

export const getAllUsers = createAsyncThunk<
  ApiResponse<Patient[]>,
  void,
  { rejectValue: string }
>("users/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get<ApiResponse<Patient[]>>("/auth/all-user");
    return response.data;
  } catch (error) {
    const err = error as AxiosError<any>;

    console.log("Error:", err);
    console.log("Response:", err.response);
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ==============================
// GET COUNTRIES
// ==============================

export const getCountries = createAsyncThunk<
  ApiResponse<Country[]>,
  void,
  { rejectValue: string }
>("users/getCountries", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get<ApiResponse<Country[]>>("/auth/countries");
    return response.data;
  } catch (error) {
    const err = error as AxiosError<any>;

    console.log("Error:", err);
    console.log("Response:", err.response);
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ==============================
// GET COUNTRY BY CODE
// ==============================

export const getCountryByCode = createAsyncThunk<
  ApiResponse<Country>,
  string,
  { rejectValue: string }
>("users/getCountryByCode", async (code, { rejectWithValue }) => {
  try {
    const response = await API.get<ApiResponse<Country>>(
      `/auth/countries/${code}`,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<any>;

    console.log("Error:", err);
    console.log("Response:", err.response);
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ==============================
// GET ALL STAFF
// ==============================

export const getAllStaff = createAsyncThunk<
  ApiResponse<Staff[]>,
  void,
  { rejectValue: string }
>("staff/getAllStaff", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await API.get<ApiResponse<Staff[]>>("/staff", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});
// ==============================
// GET STAFF BY ID
// ==============================

export const getStaffById = createAsyncThunk<
  ApiResponse<Staff>,
  string,
  { rejectValue: string }
>("staff/getStaffById", async (id, { rejectWithValue }) => {
  try {
    const response = await API.get<ApiResponse<Staff>>(`/staff/${id}`);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ==============================
// ADD STAFF
// ==============================

export const addStaff = createAsyncThunk<
  ApiResponse<Staff>,
  Omit<
    Staff,
    "_id" | "empId" | "createdAt" | "updatedAt" | "joiningDate"
  > & {
    labId: string;
    labName: string;
  },
  { rejectValue: string }
>("staff/addStaff", async (staffData, { rejectWithValue }) => {
  try {
    const response = await API.post<ApiResponse<Staff>>(
      "/staff/add",
      staffData,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ==============================
// UPDATE STAFF
// ==============================

export const updateStaff = createAsyncThunk<
  ApiResponse<Staff>,
  {
    id: string;
    data: Partial<Staff>;
  },
  { rejectValue: string }
>("staff/updateStaff", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await API.put<ApiResponse<Staff>>(`/staff/${id}`, data);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ==============================
// DELETE STAFF
// ==============================

export const deleteStaff = createAsyncThunk<
  ApiResponse<null>,
  string,
  { rejectValue: string }
>("staff/deleteStaff", async (id, { rejectWithValue }) => {
  try {
    const response = await API.delete<ApiResponse<null>>(`/staff/${id}`);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const verifyMobileOtp = createAsyncThunk<
  ApiResponse<any>,
  VerifyOtpPayload,
  { rejectValue: string }
>("lab/verifyMobileOtp", async ({ idToken, fcmToken }, { rejectWithValue }) => {
  try {
    const response = await API.post<ApiResponse<any>>(
      "/lab-auth/verify-mobile-otp",
      {
        idToken,
        fcmToken,
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});
export const registerLabAdmin = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("lab/registerLabAdmin", async (data, { rejectWithValue }) => {
  try {
    const response = await API.post<RegisterResponse>(
      "/lab-auth/register",
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const registerWithEmail = createAsyncThunk<
  RegisterWithEmailResponse,
  RegisterWithEmailPayload,
  { rejectValue: string }
>("lab/registerWithEmail", async (data, { rejectWithValue }) => {
  try {
    const response = await API.post<RegisterWithEmailResponse>(
      "/lab-auth/register-email",
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ==============================
// LOGIN WITH MOBILE
// ==============================

export const loginWithMobile = createAsyncThunk<
  LoginResponse,
  LoginMobilePayload,
  { rejectValue: string }
>("lab/loginWithMobile", async (data, { rejectWithValue }) => {
  try {
    const response = await API.post<LoginResponse>(
      "/lab-auth/login-mobile",
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});
// ==============================
// GET PROFILE
// ==============================

export const getProfile = createAsyncThunk<
  ApiResponse<LabProfile>,
  void,
  { rejectValue: string }
>("lab/getProfile", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await API.get<ApiResponse<LabProfile>>(
      "/lab-auth/getprofile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});
// ==============================
// UPDATE PROFILE
// ==============================

export const updateProfile = createAsyncThunk<
  ApiResponse<LabProfile>,
  UpdateProfilePayload,
  { rejectValue: string }
>("lab/updateProfile", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await API.put<ApiResponse<LabProfile>>(
      "/lab-auth/profile",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});
// ==============================
// LOGIN WITH EMAIL
// ==============================

export const loginWithEmail = createAsyncThunk<
  LoginResponse,
  LoginEmailPayload,
  { rejectValue: string }
>("lab/loginWithEmail", async (data, { rejectWithValue }) => {
  try {
    const response = await API.post<LoginResponse>(
      "/lab-auth/login-email",
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const uploadReport = createAsyncThunk<
  UploadReportResponse,
  FormData,
  { rejectValue: string }
>("report/uploadReport", async (formData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await API.post<UploadReportResponse>(
      "/lab-admin/upload-report",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ==============================
// UPDATE USER
// ==============================

export const updateUser = createAsyncThunk<
  UpdateUserResponse,
  UpdateUserPayload,
  { rejectValue: string }
>("users/updateUser", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await API.put<UpdateUserResponse>(
      "/lab-auth/user-update",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addOrUpdateHealth = createAsyncThunk<
  HealthProfileResponse,
  HealthProfilePayload,
  { rejectValue: string }
>("health/addOrUpdateHealth", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await API.post<HealthProfileResponse>(
      "/lab-auth/helth-profile",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});
// ==============================
// GET USER BY ID
// ==============================

export const getUserById = createAsyncThunk<
  GetUserByIdResponse,
  string,
  { rejectValue: string }
>("users/getUserById", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await API.get<GetUserByIdResponse>(
      `/lab-auth/getuser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const getHealthById = createAsyncThunk<
  GetHealthByIdResponse,
  string,
  { rejectValue: string }
>("health/getHealthById", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await API.get<GetHealthByIdResponse>(
      `/lab-auth/get-health/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const getReportsByUser = createAsyncThunk<
  GetReportsByUserResponse,
  string,
  { rejectValue: string }
>("report/getReportsByUser", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await API.get<GetReportsByUserResponse>(
      `/lab-admin/user-reports/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateReportMetric = createAsyncThunk<
  UpdateReportMetricResponse,
  UpdateReportMetricPayload,
  { rejectValue: string }
>("report/updateReportMetric", async (data, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await API.put<UpdateReportMetricResponse>(
      "/lab-admin/update-report-metric",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(err.response?.data?.message || err.message);
  }
});
export const finalSaveReport = createAsyncThunk<
  FinalSaveReportResponse,
  FinalSaveReportPayload,
  { rejectValue: string }
>(
  "report/finalSaveReport",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.put<FinalSaveReportResponse>(
        "/lab-admin/final-save-report",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const deleteReportMetric = createAsyncThunk<
  DeleteReportMetricResponse,
  DeleteReportMetricPayload,
  { rejectValue: string }
>(
  "report/deleteReportMetric",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.delete<DeleteReportMetricResponse>(
        "/lab-admin/delete-metric",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data,
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const deleteUser = createAsyncThunk<
  DeleteUserResponse,
  string,
  { rejectValue: string }
>(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.delete<DeleteUserResponse>(
        `/lab-auth/delete-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getAllReports = createAsyncThunk<
  GetAllReportsResponse,
  void,
  { rejectValue: string }
>(
  "report/getAllReports",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.get<GetAllReportsResponse>(
        "/lab-admin/all-reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getReportById = createAsyncThunk<
  GetReportByIdResponse,
  string,
  { rejectValue: string }
>(
  "report/getReportById",
  async (reportId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.get<GetReportByIdResponse>(
        `/lab-admin/report/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const loginStaffWithEmail = createAsyncThunk<
  StaffLoginResponse,
  StaffLoginPayload,
  { rejectValue: string }
>(
  "staff/loginStaffWithEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post<StaffLoginResponse>(
        "/staff/login-email",
        data
      );

      // Save Tokens
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getStaffProfile = createAsyncThunk<
  ApiResponse<StaffProfile>,
  void,
  { rejectValue: string }
>(
  "staff/getStaffProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.get<ApiResponse<StaffProfile>>(
        "/staff/staff-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const updateStaffProfile = createAsyncThunk<
  ApiResponse<StaffProfile>,
  UpdateStaffProfilePayload,
  { rejectValue: string }
>(
  "staff/updateStaffProfile",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.put<ApiResponse<StaffProfile>>(
        "/staff/profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const deleteReport = createAsyncThunk<
  ApiResponse<null>,
  string,
  { rejectValue: string }
>(
  "report/deleteReport",
  async (reportId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.delete<ApiResponse<null>>(
        `/lab-admin/delete-report/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const sendReportLink = createAsyncThunk<
  SendReportLinkResponse,
  SendReportLinkPayload,
  { rejectValue: string }
>(
  "report/sendReportLink",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.post<SendReportLinkResponse>(
        "/report-links/send",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<any>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getReportDetails = createAsyncThunk<
  GetReportDetailsResponse,
  string,
  { rejectValue: string }
>(
  "report/getReportDetails",
  async (reportId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.get<GetReportDetailsResponse>(
        `/lab-admin/report-details/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const createInquiry = createAsyncThunk<
  CreateInquiryResponse,
  CreateInquiryPayload,
  { rejectValue: string }
>(
  "inquiry/createInquiry",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post<CreateInquiryResponse>(
        "/contact/create",
        data
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<any>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
export const getAllInquiry = createAsyncThunk<
  GetAllInquiryResponse,
  void,
  { rejectValue: string }
>(
  "inquiry/getAllInquiry",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.get<GetAllInquiryResponse>(
        "/contact/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<any>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
export const deleteInquiry = createAsyncThunk<
  DeleteInquiryResponse,
  string,
  { rejectValue: string }
>(
  "inquiry/deleteInquiry",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.delete<DeleteInquiryResponse>(
        `/contact/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<any>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const loginHeartViewAdminWithEmail = createAsyncThunk<
  HeartViewAdminLoginResponse,
  HeartViewAdminLoginPayload,
  { rejectValue: string }
>(
  "heartview-admin/loginHeartViewAdminWithEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post<HeartViewAdminLoginResponse>(
        "/heartview-admin/login-email",
        data
      );

      // Save Tokens
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getAllLabs = createAsyncThunk<
  GetAllLabsResponse,
  void,
  { rejectValue: string }
>(
  "lab/getAllLabs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get<GetAllLabsResponse>(
        "/lab-auth/all-labs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getAllAuditLogs = createAsyncThunk<
  GetAllAuditLogsResponse,
  void,
  { rejectValue: string }
>(
  "audit/getAllAuditLogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get<GetAllAuditLogsResponse>(
        "/audit",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getLabById = createAsyncThunk<
  GetLabByIdResponse,
  string,
  { rejectValue: string }
>(
  "lab/getLabById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get<GetLabByIdResponse>(
        `/lab-auth/labs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
interface UpdateLabPayload {
  id: string;
  data: FormData;
}

export interface UpdateLabResponse {
  success: boolean;
  message: string;
  data: Lab;
}

export const updateLab = createAsyncThunk<
  UpdateLabResponse,
  UpdateLabPayload,
  { rejectValue: string }
>(
  "lab/updateLab",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.put<UpdateLabResponse>(
        `/lab-auth/labs/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
export interface CommonResponse {
  success: boolean;
  message: string;
}

export const approveLab = createAsyncThunk<
  CommonResponse,
  string,
  { rejectValue: string }
>(
  "lab/approveLab",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.patch<CommonResponse>(
        `/lab-auth/labs/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
export interface RejectLabPayload {
  id: string;
  reason: string;
}

export const rejectLab = createAsyncThunk<
  CommonResponse,
  RejectLabPayload,
  { rejectValue: string }
>(
  "lab/rejectLab",
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      const response = await API.patch<CommonResponse>(
        `/lab-auth/labs/${id}/reject`,
        { reason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
export interface UpdateLabStatusPayload {
  id: string;
  status: string;
}

export const updateLabStatus = createAsyncThunk<
  UpdateLabResponse,
  UpdateLabStatusPayload,
  { rejectValue: string }
>(
  "lab/updateLabStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await API.patch<UpdateLabResponse>(
        `/lab-auth/labs/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
export const deleteLab = createAsyncThunk<
  CommonResponse,
  string,
  { rejectValue: string }
>(
  "lab/deleteLab",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete<CommonResponse>(
        `/lab-auth/labs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getHeartViewAdminProfile = createAsyncThunk<
  HeartViewAdminResponse,
  void,
  { rejectValue: string }
>(
  "heartview-admin/profile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

    const response = await API.get<HeartViewAdminResponse>(
  "/heartview-admin/profile",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

return response.data;
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateHeartViewAdminProfile = createAsyncThunk<
  HeartViewAdminResponse,
  FormData,
  { rejectValue: string }
>(
  "heartview-admin/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.put<HeartViewAdminResponse>(
        "/heartview-admin/profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getLabUsers = createAsyncThunk<
  GetLabUsersResponse,
  void,
  { rejectValue: string }
>(
  "lab/getLabUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await API.get<GetLabUsersResponse>(
        "/lab-auth/lab-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// ==============================
// ADMIN LOGIN
// ==============================

export const loginAdminWithEmail = createAsyncThunk<
  AdminLoginResponse,
  AdminLoginPayload,
  { rejectValue: string }
>(
  "admin/loginAdminWithEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.post<AdminLoginResponse>(
        "/admin/login-email",
        data
      );

      // Save Tokens
      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        response.data.refreshToken
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// ===============================
// GET ADMIN PROFILE
// ===============================

export const getAdminProfile = createAsyncThunk<
  AdminProfileResponse,
  void,
  { rejectValue: string }
>(
  "admin/profile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return rejectWithValue(
          "Access token not found"
        );
      }

      const response = await API.get(
        "/admin/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  } 
);

export const addBlog = createAsyncThunk<
  BlogResponse,
  AddBlogPayload,
  { rejectValue: string }
>(
  "blog/addBlog",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return rejectWithValue(
          "Please login again. Access token not found."
        );
      }

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("author", data.author);
      formData.append("publishDate", data.publishDate);
      formData.append("category", data.category);
      formData.append("description", data.description);

      formData.append(
        "content",
        JSON.stringify(data.content)
      );

      formData.append(
        "tags",
        JSON.stringify(data.tags)
      );

      formData.append("status", data.status);

      formData.append(
        "peopleAlsoAsk",
        JSON.stringify(data.peopleAlsoAsk)
      );

      formData.append(
        "faq",
        JSON.stringify(data.faq)
      );

      formData.append(
        "seoTitle",
        data.seoTitle || ""
      );

      formData.append(
        "seoDescription",
        data.seoDescription || ""
      );

      formData.append(
        "schemaMarkup",
        JSON.stringify(data.schemaMarkup || null)
      );

      // IMPORTANT
      formData.append(
        "mainImage",
        data.mainImage
      );

      const { data: responseData } =
        await API.post<BlogResponse>(
          "/blog/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      return responseData;

    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message ||
        err.message ||
        "Unable to save blog"
      );
    }
  }
);

export const updateBlog = createAsyncThunk<
  BlogResponse,
  UpdateBlogPayload,
  { rejectValue: string }
>(
  "blog/updateBlog",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return rejectWithValue(
          "Access token not found"
        );
      }

      const { id, ...blogData } = data;

      const formData = new FormData();

      formData.append("title", blogData.title);
      formData.append("slug", blogData.slug);
      formData.append("author", blogData.author);
      formData.append("publishDate", blogData.publishDate);
      formData.append("category", blogData.category);
      formData.append("description", blogData.description);

      formData.append(
        "content",
        JSON.stringify(blogData.content)
      );

      formData.append(
        "tags",
        JSON.stringify(blogData.tags)
      );

      formData.append(
        "status",
        blogData.status
      );

      formData.append(
        "peopleAlsoAsk",
        JSON.stringify(blogData.peopleAlsoAsk)
      );

      formData.append(
        "faq",
        JSON.stringify(blogData.faq)
      );

      formData.append(
        "seoTitle",
        blogData.seoTitle || ""
      );

      formData.append(
        "seoDescription",
        blogData.seoDescription || ""
      );

      formData.append(
        "schemaMarkup",
        JSON.stringify(
          blogData.schemaMarkup || null
        )
      );

      // Only append when new image selected
      if (blogData.mainImage) {
        formData.append(
          "mainImage",
          blogData.mainImage
        );
      }

      const response = await API.put<BlogResponse>(
        `/blog/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;

    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message ||
        err.message ||
        "Blog update failed"
      );
    }
  }
);

// ===============================
// GET ALL BLOGS
// ===============================

export const getBlogs = createAsyncThunk<
  GetAllBlogsResponse,
  void,
  { rejectValue: string }
>("blog/getBlogs", async (_, { rejectWithValue }) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await API.get<GetAllBlogsResponse>(
      "/blog/all",
      { headers }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(
      err.response?.data?.message ||
        err.message ||
        "Unable to fetch blogs"
    );
  }
});
// ===============================
// GET Latest BLOGS
// ===============================

export const getLatestBlogs = createAsyncThunk<
  GetAllBlogsResponse,
  void,
  { rejectValue: string }
>("blog/getLatestBlogs", async (_, { rejectWithValue }) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await API.get<GetAllBlogsResponse>(
      "/blog/latest",
      { headers }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(
      err.response?.data?.message ||
        err.message ||
        "Unable to fetch blogs"
    );
  }
});
// ===============================
// GET BLOG BY ID
// ===============================

export const getBlogById = createAsyncThunk<
  GetBlogByIdResponse,
  string,
  { rejectValue: string }
>("blog/getBlogById", async (id, { rejectWithValue }) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await API.get<GetBlogByIdResponse>(
      `/blog/${id}`,
      { headers }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(
      err.response?.data?.message ||
        err.message ||
        "Unable to fetch blog"
    );
  }
});
// =========================
// ADD TEAM
// =========================

export const addTeam = createAsyncThunk<
  TeamResponse,
  FormData,
  { rejectValue: string }
>("team/addTeam", async (formData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return rejectWithValue("Access token not found");
    }

    const response = await API.post<TeamResponse>(
      "/team/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    return rejectWithValue(
      err.response?.data?.message ||
        err.message ||
        "Failed to add team member"
    );
  }
});

// =========================
// GET ALL TEAMS
// =========================

export const getTeams = createAsyncThunk<
  GetTeamsResponse,
  void,
  { rejectValue: string }
>("team/getTeams", async (_, { rejectWithValue }) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await API.get<GetTeamsResponse>(
      "/team/all",
      { headers }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to get team members"
    );
  }
});

// =========================
// GET TEAM BY ID
// =========================
export const getImageUrl = (imagePath: string | undefined) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http") || imagePath.startsWith("data:image")) return imagePath;
  
  let normalizedPath = imagePath.replace(/\\/g, "/");
  if (normalizedPath.startsWith("public/")) {
    normalizedPath = normalizedPath.replace("public/", "");
  }
  
  const leadingSlash = normalizedPath.startsWith("/") ? "" : "/";
  const finalPath = `${leadingSlash}${normalizedPath}`;

  // Attach the base URL explicitly using the frontend's origin to avoid CORS 
  // (Next.js will proxy it to the backend via rewrites)
  if (typeof window !== "undefined") {
    return `${window.location.origin}${finalPath}`;
  }
  
  return finalPath;
};
export const getTeamById = createAsyncThunk<
  TeamResponse,
  string,
  { rejectValue: string }
>("team/getTeamById", async (id, { rejectWithValue }) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await API.get<TeamResponse>(
      `/team/${id}`,
      { headers }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to get team member"
    );
  }
});

// =========================
// UPDATE TEAM
// =========================

export const updateTeam = createAsyncThunk<
    TeamResponse,
    { id: string; formData: FormData },
    { rejectValue: string }
>(
    "team/updateTeam",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                return rejectWithValue(
                    "Access token not found"
                );
            }

            const response = await API.put<TeamResponse>(
                `/team/update/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message ||
                    "Failed to update team member"
            );
        }
    }
);

// =========================
// DELETE TEAM
// =========================

export const deleteTeam = createAsyncThunk<
  TeamResponse,
  string,
  { rejectValue: string }
>(
  "team/deleteTeam",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return rejectWithValue("Access token not found");
      }

      const response = await API.delete<TeamResponse>(
        `/team/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          "Failed to delete team member"
      );
    }
  }
);

export const deleteBlog = createAsyncThunk<
  DeleteBlogResponse,
  string,
  { rejectValue: string }
>(
  "blog/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return rejectWithValue("Access token not found");
      }

      const response = await API.delete<DeleteBlogResponse>(
        `/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Unable to delete blog"
      );
    }
  }
);
// ===============================
// UPDATE ADMIN PROFILE
// ===============================

export const updateAdminProfile = createAsyncThunk<
  AdminProfileResponse,
  UpdateAdminProfilePayload,
  { rejectValue: string }
>(
  "admin/updateAdminProfile",
  async ({ id, fullName, mobile, fcmToken, profileImage }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return rejectWithValue("Access token not found");
      }

      const formData = new FormData();

      if (fullName !== undefined) {
        formData.append("fullName", fullName);
      }

      if (mobile !== undefined) {
        formData.append("mobile", mobile);
      }

      if (fcmToken !== undefined) {
        formData.append("fcmToken", fcmToken);
      }

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await API.put<AdminProfileResponse>(
        `/admin/profile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);