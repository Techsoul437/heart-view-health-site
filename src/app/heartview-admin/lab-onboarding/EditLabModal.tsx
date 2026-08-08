"use client";

import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import FillButton from "@/Ui/buttons/FillButton";
import { updateLab, getAllLabs } from "@/redux/Api";
import type { Lab } from "@/redux/Api";

interface EditLabModalProps {
  lab: Lab;
  onClose: () => void;
}

interface FormState {
  labName: string;
  branchName: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  labType: string;
}

interface FormErrors {
  labName?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  city?: string;
  labType?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^[0-9]{10}$/;

const EditLabModal = ({ lab, onClose }: EditLabModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<FormState>({
    labName: lab.labName || "",
    branchName: lab.branchName || "",
    fullName: lab.fullName || "",
    email: lab.email || "",
    mobile: lab.mobile || "",
    city: lab.city || "",
    labType: lab.labType || "",
   
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | undefined>(lab.logo);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!form.labName.trim()) nextErrors.labName = "Lab name is required";
    if (!form.fullName.trim()) nextErrors.fullName = "Owner name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!EMAIL_REGEX.test(form.email.trim()))
      nextErrors.email = "Enter a valid email address";
    if (!form.mobile.trim()) nextErrors.mobile = "Phone number is required";
    else if (!MOBILE_REGEX.test(form.mobile.trim()))
      nextErrors.mobile = "Enter a valid 10-digit phone number";
    if (!form.city.trim()) nextErrors.city = "City is required";
    if (!form.labType.trim()) nextErrors.labType = "Lab type is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Using FormData so the logo file can be uploaded alongside the
      // rest of the fields. If your updateLab thunk expects plain JSON
      // instead, swap this for a plain object.
      const formData = new FormData();
      formData.append("labName", form.labName.trim());
      formData.append("branchName", form.branchName.trim());
      formData.append("fullName", form.fullName.trim());
      formData.append("email", form.email.trim());
      formData.append("mobile", form.mobile.trim());
      formData.append("city", form.city.trim());
      formData.append("labType", form.labType.trim());
      if (logoFile) formData.append("logo", logoFile);

      await dispatch(updateLab({ id: lab._id, data: formData })).unwrap();
      toast.success("Laboratory updated successfully");
      dispatch(getAllLabs());
      onClose();
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to update laboratory"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError?: string) =>
    `w-full rounded-lg border bg-white px-3 py-2 text-sm text-black focus:outline-none ${
      hasError
        ? "border-red-300 focus:border-red-400"
        : "border-slate-200 focus:border-[#2f5ba5]"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal tracking-tight text-black">
            Edit Laboratory
          </h1>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[#64748B] hover:bg-slate-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Logo Upload Preview */}
        <div className="mt-5 flex items-center gap-4">
          {logoPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoPreview}
              alt="Logo preview"
              className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[#64748B] font-medium">
              {form.labName?.charAt(0)?.toUpperCase() || "L"}
            </div>
          )}
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-[#64748B] hover:bg-slate-50">
            <Upload size={14} />
            Upload Logo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </label>
        </div>

        {/* Form Fields */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="font-medium text-black">Lab Name</label>
            <input
              value={form.labName}
              onChange={(e) => handleChange("labName", e.target.value)}
              className={`mt-1 ${inputClass(errors.labName)}`}
            />
            {errors.labName && (
              <p className="mt-1 text-sm text-red-600">{errors.labName}</p>
            )}
          </div>

          <div>
            <label className="font-medium text-black">Branch</label>
            <input
              value={form.branchName}
              onChange={(e) => handleChange("branchName", e.target.value)}
              className={`mt-1 ${inputClass()}`}
            />
          </div>

          <div>
            <label className="font-medium text-black">Owner</label>
            <input
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className={`mt-1 ${inputClass(errors.fullName)}`}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="font-medium text-black">Email</label>
            <input
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`mt-1 ${inputClass(errors.email)}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="font-medium text-black">Phone</label>
            <input
              value={form.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              className={`mt-1 ${inputClass(errors.mobile)}`}
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
            )}
          </div>

          <div>
            <label className="font-medium text-black">City</label>
            <input
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className={`mt-1 ${inputClass(errors.city)}`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="font-medium text-black">Lab Type</label>
            <input
              value={form.labType}
              onChange={(e) => handleChange("labType", e.target.value)}
              className={`mt-1 ${inputClass(errors.labType)}`}
            />
            {errors.labType && (
              <p className="mt-1 text-sm text-red-600">{errors.labType}</p>
            )}
          </div>

       
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg border border-slate-200 px-4 py-2 font-medium text-[#64748B] hover:bg-slate-50 disabled:opacity-40"
          >
            Cancel
          </button>
          <FillButton
            text={submitting ? "Saving..." : "Save Changes"}
            href=""
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditLabModal;