export interface Lab {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  alternateMobile?: string;
  labName: string;
  labCode?: string;
  branchName?: string;
  labType: string;
  city: string;
  // NOTE: not in the original data model but required by the View/Edit
  // modal specs. Remove if your backend doesn't return it.
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

export type LabStatus = "Pending" | "Active" | "Inactive" | "Rejected";

export interface RejectLabPayload {
  id: string;
  reason: string;
}

export interface UpdateLabPayload {
  id: string;
  data: FormData;
}

export interface UpdateLabStatusPayload {
  id: string;
  status: LabStatus;
}