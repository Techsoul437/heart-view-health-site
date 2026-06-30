"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  FileHeart,
  BadgeCheck,
  Sparkles,
  Mail,
} from "lucide-react";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import { MdEmail } from "react-icons/md";

type Mode = "login" | "signup";
type LoginStep = "mobile" | "otp" | "email";

interface SavedUser {
  email: string;
  password: string;
}

interface SignupValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginValues {
  email: string;
  password: string;
}

interface MobileValues {
  mobile: string;
}

interface LabValues {
  labName: string;
  labType: string;
  city: string;
}

interface BackButtonProps { onClick: () => void; }
interface StepIndicatorProps { current: number; total?: number; }
interface LoginMobileTabProps {
  onSendOtp: (values: MobileValues, helpers: FormikHelpers<MobileValues>) => void;
  onSwitchEmail: () => void;
  onSignup: () => void;
}
interface LoginEmailTabProps {
  savedUser: SavedUser;
  onSignup: () => void;
  onSuccess: () => void;
}
interface LoginOtpVerifyProps { onBack: () => void; onSuccess: () => void; }
interface LoginPanelProps {
  savedUser: SavedUser;
  onSignup: () => void;
  onLoginSuccess: () => void;
}
interface SignupStep1Props {
  onNext: (values: MobileValues | null, meta?: { skipToStep3?: boolean }) => void;
  onLoginClick: () => void;
}
interface SignupStep2Props {
  mobile: string;
  onNext: () => void;
  onChangeNumber: () => void;
}
interface SignupStep3Props {
  onNext: (values: LabValues, helpers: FormikHelpers<LabValues>) => void;
}
interface SignupStep4Props {
  onSubmit: (values: SignupValues, helpers: FormikHelpers<SignupValues>) => void;
  onLoginClick: () => void;
}
interface SignupPanelProps {
  onLoginClick: () => void;
  onSignupSuccess: (values: SignupValues) => void;
}

// ═══════════════════════════════════════
//  SCHEMAS
// ═══════════════════════════════════════

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const mobileSchema = Yup.object({
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile number")
    .required("Mobile number is required"),
});

const labSchema = Yup.object({
  labName: Yup.string().required("Lab name required"),
  labType: Yup.string().required("Lab type required"),
  city: Yup.string().required("City required"),
});

const accountSchema = Yup.object({
  fullName: Yup.string().required("Full name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "One uppercase letter required")
    .matches(/[0-9]/, "One number required")
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password required"),
});

// ═══════════════════════════════════════
//  SHARED CLASSES
// ═══════════════════════════════════════

// h-11 (44px) instead of h-13 — saves ~16px per field = ~80px across 5 fields
const inputClass =
  "h-11 w-full rounded-2xl border border-[#2f5ba5]/60 bg-white/90 px-4 text-black  outline-none transition-all duration-300 focus:border-[#2f5ba5] focus:ring-4 focus:ring-[#2f5ba5]/10 text-sm";

const buttonClass =
  "flex h-11 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#2f5ba5]/70 to-[#4a7bc9]/60 text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] text-sm font-medium";

const outlineButtonClass =
  "flex h-11 w-full items-center justify-center gap-3 rounded-2xl border border-[#2f5ba5]/40 bg-white/70 text-black transition-all duration-300 hover:bg-[#2f5ba5]/70 hover:text-white text-sm";

// ═══════════════════════════════════════
//  REUSABLE ATOMS
// ═══════════════════════════════════════

const BackButton = ({ onClick }: BackButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="mb-2 flex items-center gap-2 text-[#64748B] transition-all hover:text-black text-sm"
  >
    <ArrowLeft className="h-4 w-4" />
    Back
  </button>
);

const MobileField = () => (
  <div className="flex gap-2">
    <div className="flex h-11 items-center gap-2 whitespace-nowrap rounded-2xl border border-[#45657D]/60 bg-white px-3 text-black text-sm">
      +91
    </div>
    <div className="flex-1">
      <Field
        name="mobile"
        type="text"
        placeholder="Enter mobile number"
        className={inputClass}
      />
      <ErrorMessage name="mobile" component="div" className="mt-1 text-red-400 text-xs" />
    </div>
  </div>
);

const OtpInputs = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0)
      inputsRef.current[index - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!pasted) return;
    e.preventDefault();
    pasted.slice(0, 6).split("").forEach((char, i) => {
      if (inputsRef.current[i]) inputsRef.current[i]!.value = char;
    });
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="mt-4 flex w-full items-center justify-between gap-2">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          ref={(el) => { inputsRef.current[index] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="h-11 w-10 min-w-0 flex-1 rounded-2xl border border-[#45657D]/50 bg-white text-center text-sm text-black shadow-inner outline-none transition-all duration-300 focus:border-[#2f5ba5] focus:ring-4 focus:ring-[#2f5ba5]/10"
        />
      ))}
    </div>
  );
};

// Step indicator — compact dots, less margin
const StepIndicator = ({ current, total = 4 }: StepIndicatorProps) => (
  <div className="mb-3 flex items-center justify-center">
    {Array.from({ length: total }, (_, i) => i + 1).map((item, index) => (
      <div key={item} className="flex items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-300 ${
            current >= item
              ? "bg-[#2f5ba5] text-white"
              : "border border-[#2f5ba5] text-[#8391A7]"
          }`}
        >
          {item}
        </div>
        {index !== total - 1 && (
          <div
            className={`h-px w-8 transition-all duration-300 ${
              current > item ? "bg-[#2f5ba5]" : "bg-[#2A3548]"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

// ═══════════════════════════════════════
//  LEFT SIDE
// ═══════════════════════════════════════

const features = [
  { icon: FileHeart, title: "Laboratory Management" },
  { icon: ShieldCheck, title: "Staff & Patient Management" },
  { icon: BadgeCheck, title: "Report Tracking & Delivery" },
  { icon: Sparkles, title: "Lab Performance Analytics" },
];

const LeftSide = () => (
  <div className="relative flex flex-col bg-black lg:border-r lg:border-[#45657D]/20">
    <div className="relative z-10 flex h-full flex-col p-6 xl:p-8 gap-5">
      {/* LOGO */}
      <div className="relative h-10 w-32 shrink-0">
        <Image
          src="/APP ICONSM.png"
          alt="HeartView Health logo"
          fill
          priority
          className="object-contain object-left"
        />
      </div>

      {/* TITLE + DESC */}
      <div className="shrink-0">
        <h2 className="text-lg lg:text-xl xl:text-2xl font-medium leading-tight text-white">
          Create your Lab Portal account
        </h2>
                <p className="mt-3 hidden lg:block leading-6 text-[#64748B] text-sm">

        Manage your laboratory, oversee staff, upload patient reports, monitor report delivery, and track lab performance from one secure dashboard.
        </p>
      </div>

      {/* FEATURES — only on lg+ */}
       <div className="hidden lg:flex flex-col gap-3 shrink-0">
        {features.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
          >
            <h3 className="font-medium text-white text-sm">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════
//  LOGIN
// ═══════════════════════════════════════

const LoginMobileTab = ({ onSendOtp, onSwitchEmail, onSignup }: LoginMobileTabProps) => (
  <>
    <p className="mt-3 text-[#64748B] text-sm leading-relaxed">
      Enter your registered mobile number
    </p>

    <Formik initialValues={{ mobile: "" }} validationSchema={mobileSchema} onSubmit={onSendOtp}>
      <Form className="mt-3 space-y-3">
        <MobileField />
        <button type="submit" className={buttonClass}>Send OTP</button>
      </Form>
    </Formik>

    <div className="mt-4">
      <div className="my-3 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#243246]" />
        <span className="whitespace-nowrap text-sm text-[#718096]">or continue with</span>
        <div className="h-px flex-1 bg-[#243246]" />
      </div>

      <button type="button" onClick={onSwitchEmail} className={outlineButtonClass}>
        <MdEmail className="h-4 w-4" />
        Sign in with Email
      </button>

      <p className="mt-4 text-center text-sm text-[#64748B]">
        Don&apos;t have an account?{" "}
        <button type="button" onClick={onSignup} className="font-medium text-[#2f5ba5] transition-colors hover:text-[#66B3AC]">
          Sign up
        </button>
      </p>
    </div>
  </>
);

const LoginEmailTab = ({ savedUser, onSignup, onSuccess }: LoginEmailTabProps) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <Formik
      enableReinitialize
      initialValues={{ email: savedUser.email || "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values: LoginValues) => {
        if (
          savedUser.email &&
          values.email === savedUser.email &&
          values.password === savedUser.password
        ) {
          onSuccess();
        } else {
          alert("Invalid credentials. Please check your email and password.");
        }
      }}
    >
      <Form className="mt-4 space-y-3">
        <div>
          <Field name="email" type="email" placeholder="Enter email address" className={inputClass} />
          <ErrorMessage name="email" component="div" className="mt-1 text-red-400 text-xs" />
        </div>

        <div className="relative">
          <Field
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Enter password"
            className={`${inputClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPass((p) => !p)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8FA6C1]"
          >
            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <ErrorMessage name="password" component="div" className="mt-1 text-red-400 text-xs" />
        </div>

        <button type="submit" className={buttonClass}>Sign In</button>

        <p className="text-center text-sm text-[#64748B]">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={onSignup} className="font-medium text-[#2f5ba5]">
            Sign up
          </button>
        </p>
      </Form>
    </Formik>
  );
};

const LoginOtpVerify = ({ onBack, onSuccess }: LoginOtpVerifyProps) => {
  const [timer, setTimer] = useState(45);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => { if (prev <= 1) { clearInterval(countdown); return 0; } return prev - 1; });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleResendOtp = () => {
    if (timer > 0) return;
    setIsResending(true);
    setTimeout(() => {
      setTimer(45);
      const countdown = setInterval(() => {
        setTimer((prev) => { if (prev <= 1) { clearInterval(countdown); return 0; } return prev - 1; });
      }, 1000);
      setIsResending(false);
    }, 1500);
  };

  return (
    <>
      <BackButton onClick={onBack} />
      <h2 className="text-xl font-normal text-black lg:text-2xl">Verify OTP</h2>
      <p className="mt-1 text-sm text-[#64748B]">
        Enter the 6-digit code sent to your mobile number
      </p>
      <OtpInputs />
      <div className="mt-3 text-center">
        {timer > 0 ? (
          <p className="text-[#718096] text-sm">
            Resend OTP in 00:{timer.toString().padStart(2, "0")}
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
            className="font-medium text-[#2f5ba5] hover:text-[#2f5ba5]/70 text-sm"
          >
            {isResending ? "Sending..." : "Resend OTP"}
          </button>
        )}
      </div>
      <button type="button" onClick={onSuccess} className={`${buttonClass} mt-4`}>
        Verify &amp; Sign In
      </button>
    </>
  );
};

const LoginPanel = ({ savedUser, onSignup, onLoginSuccess }: LoginPanelProps) => {
  const [loginStep, setLoginStep] = useState<LoginStep>("mobile");

  if (loginStep === "otp") {
    return (
      <LoginOtpVerify onBack={() => setLoginStep("mobile")} onSuccess={onLoginSuccess} />
    );
  }

  return (
    <>
      <div className="mb-4">
        <h2 className=" font-normal text-black text-lg sm:text-xl lg:text-2xl xl:text-3xl">
          Welcome Back!
        </h2>
        <p className="mt-1 text-[#64748B] text-sm leading-relaxed">
          Sign in to access your HeartView Lab Portal
        </p>
      </div>

      <div className="rounded-2xl bg-[#212731] p-1">
        <div className="flex">
          <button
            type="button"
            onClick={() => setLoginStep("mobile")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-all duration-300 ${
              loginStep === "mobile" ? "bg-[#2f5ba5] text-white" : "text-white"
            }`}
          >
            Mobile OTP
          </button>
          <button
            type="button"
            onClick={() => setLoginStep("email")}
            className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-all duration-300 ${
              loginStep === "email" ? "bg-[#2f5ba5] text-white" : "text-white"
            }`}
          >
            Email 
          </button>
        </div>
      </div>

      {loginStep === "mobile" && (
        <LoginMobileTab
          onSendOtp={() => setLoginStep("otp")}
          onSwitchEmail={() => setLoginStep("email")}
          onSignup={onSignup}
        />
      )}
      {loginStep === "email" && (
        <LoginEmailTab savedUser={savedUser} onSignup={onSignup} onSuccess={onLoginSuccess} />
      )}
    </>
  );
};

// ═══════════════════════════════════════
//  SIGNUP
// ═══════════════════════════════════════

const SignupStep1 = ({ onNext, onLoginClick }: SignupStep1Props) => (
  <>
    <h2 className="text-xl font-normal text-black lg:text-2xl xl:text-3xl">
      Let&apos;s get started
    </h2>
    <p className="mt-1 text-[#64748B] text-sm leading-relaxed">
      Enter your mobile number to create account
    </p>

    <Formik initialValues={{ mobile: "" }} validationSchema={mobileSchema} onSubmit={onNext}>
      <Form className="mt-4 space-y-3">
        <MobileField />
        <button type="submit" className={buttonClass}>Send OTP</button>
      </Form>
    </Formik>

    <div className="my-3 flex items-center gap-3">
      <div className="h-px flex-1 bg-[#243246]" />
      <span className="text-[#718096] text-sm">or</span>
      <div className="h-px flex-1 bg-[#243246]" />
    </div>

    <button
      type="button"
      onClick={() => onNext(null, { skipToStep3: true })}
      className={outlineButtonClass}
    >
      <Mail className="h-4 w-4" />
      Sign up with Email
    </button>

    <p className="mt-4 text-sm text-center text-[#64748B]">
      Already have an account?{" "}
      <button type="button" onClick={onLoginClick} className="font-medium text-[#2f5ba5]">
        Sign in
      </button>
    </p>
  </>
);

const SignupStep2 = ({ mobile, onNext, onChangeNumber }: SignupStep2Props) => {
  const [timer, setTimer] = useState(45);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => { if (prev <= 1) { clearInterval(countdown); return 0; } return prev - 1; });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleResendOtp = async () => {
    if (timer > 0) return;
    setIsResending(true);
    setTimeout(() => {
      setTimer(45);
      const countdown = setInterval(() => {
        setTimer((prev) => { if (prev <= 1) { clearInterval(countdown); return 0; } return prev - 1; });
      }, 1000);
      setIsResending(false);
    }, 1500);
  };

  return (
    <>
      <h2 className="text-xl font-normal text-black lg:text-2xl xl:text-3xl">
        Verify your number
      </h2>
      <p className="mt-1 text-[#64748B] text-sm leading-relaxed">
        Enter the 6-digit code sent to{" "}
        <span className="font-medium text-black">+91 {mobile}</span>{" "}
        <button type="button" onClick={onChangeNumber} className="font-medium text-[#2f5ba5]">
          Change
        </button>
      </p>

      <OtpInputs />

      <div className="mt-3 text-center">
        {timer > 0 ? (
          <p className="text-[#718096] text-sm">
            Resend OTP in 00:{timer.toString().padStart(2, "0")}
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
            className="font-medium text-[#2f5ba5] text-sm"
          >
            {isResending ? "Sending..." : "Resend OTP"}
          </button>
        )}
      </div>

      <button type="button" onClick={onNext} className={`${buttonClass} mt-4`}>
        Verify &amp; Continue
      </button>
    </>
  );
};

const SignupStep3 = ({ onNext }: SignupStep3Props) => (
  <>
    <h2 className="text-xl font-normal text-black lg:text-2xl xl:text-3xl">
      Tell us about your lab
    </h2>
    <p className="mt-1 text-[#64748B] text-sm leading-relaxed">
      Help us set up your lab profile
    </p>

    <Formik
      initialValues={{ labName: "", labType: "", city: "" }}
      validationSchema={labSchema}
      onSubmit={onNext}
    >
      <Form className="mt-4 space-y-3">
        <div>
          <Field
            name="labName"
            type="text"
            placeholder="Lab name"
            className={inputClass}
            spellCheck={false}
          />
          <ErrorMessage name="labName" component="div" className="mt-1 text-red-400 text-xs" />
        </div>

        <div>
          <Field name="labType">
            {({
              field,
              form,
            }: {
              field: {
                name: string;
                value: string;
                onChange: React.ChangeEventHandler<HTMLSelectElement>;
                onBlur: React.FocusEventHandler<HTMLSelectElement>;
              };
              form: { values: { labType: string } };
            }) => (
              <select
                {...field}
                className={`${inputClass} ${form.values.labType ? "text-black" : "text-[#7F8CA3]"}`}
              >
                <option value="">Select lab type</option>
                <option value="Diagnostic Lab">Diagnostic Lab</option>
                <option value="Hospital Lab">Hospital Lab</option>
                <option value="Pathology Lab">Pathology Lab</option>
              </select>
            )}
          </Field>
          <ErrorMessage name="labType" component="div" className="mt-1 text-red-400 text-xs" />
        </div>

        <div>
          <Field
            name="city"
            type="text"
            placeholder="City"
            className={inputClass}
            spellCheck={false}
          />
          <ErrorMessage name="city" component="div" className="mt-1 text-red-400 text-xs" />
        </div>

        <button type="submit" className={buttonClass}>Continue</button>
      </Form>
    </Formik>
  </>
);

const SignupStep4 = ({ onSubmit, onLoginClick }: SignupStep4Props) => {
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);

  return (
    <>
      <h2 className="text-xl font-normal text-black lg:text-2xl xl:text-3xl">
        Create your account
      </h2>
      <p className="text-sm text-[#64748B]">Set up your login credentials</p>

      <Formik
        initialValues={{ fullName: "", email: "", password: "", confirmPassword: "" }}
        validationSchema={accountSchema}
        onSubmit={onSubmit}
      >
        {/* 
          space-y-2 keeps fields compact.
          Labels removed — placeholders carry all guidance.
          This saves ~80px total vs the original.
        */}
        <Form className="mt-3 space-y-2">
          <div>
            <Field
              name="fullName"
              type="text"
              placeholder="Full name"
              className={inputClass}
              spellCheck={false}
            />
            <ErrorMessage name="fullName" component="div" className="mt-0.5 text-red-400 text-xs" />
          </div>

          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email address (optional)"
              className={inputClass}
            />
            <ErrorMessage name="email" component="div" className="mt-0.5 text-red-400 text-xs" />
          </div>

          <div className="relative">
            <Field
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Create a strong password"
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8FA6C1]"
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <ErrorMessage name="password" component="div" className="mt-0.5 text-red-400 text-xs" />
          </div>

          <div className="relative">
            <Field
              name="confirmPassword"
              type={showCPass ? "text" : "password"}
              placeholder="Confirm your password"
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowCPass((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8FA6C1]"
            >
              {showCPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <ErrorMessage name="confirmPassword" component="div" className="mt-0.5 text-red-400 text-xs" />
          </div>

          <label className="flex items-center gap-2.5 text-[#64748B] pt-0.5">
            <input type="checkbox" className="mt-0.5 accent-[#2f5ba5] shrink-0" />
            <span className="text-xs leading-relaxed">
              I agree to the{" "}
              <span className="cursor-pointer text-[#2f5ba5] font-medium">Terms of Service</span>
              {" "}and{" "}
              <span className="cursor-pointer font-medium text-[#2f5ba5]">Privacy Policy</span>
            </span>
          </label>

          <button type="submit" className={`${buttonClass} !mt-3`}>
            Create Account
          </button>
        </Form>
      </Formik>

      <p className="mt-3 text-center text-sm text-[#64748B]">
        Already have an account?{" "}
        <button type="button" onClick={onLoginClick} className="font-medium text-[#2f5ba5]">
          Sign in
        </button>
      </p>
    </>
  );
};

const SignupPanel = ({ onLoginClick, onSignupSuccess }: SignupPanelProps) => {
  const [step, setStep] = useState<number>(1);
  const [labData, setLabData] = useState<LabValues>({ labName: "", labType: "", city: "" });
  const [mobileNumber, setMobileNumber] = useState<string>("");

  const handleBack = () => {
    if (step === 1) onLoginClick();
    else setStep((s) => s - 1);
  };

  const handleStep1Next = (
    values: MobileValues | null,
    meta?: { skipToStep3?: boolean }
  ) => {
    if (meta?.skipToStep3) {
      setStep(3);
    } else {
      if (values?.mobile) setMobileNumber(values.mobile);
      setStep(2);
    }
  };

  return (
    <>
      <BackButton onClick={handleBack} />
      <StepIndicator current={step} total={4} />

      {step === 1 && <SignupStep1 onNext={handleStep1Next} onLoginClick={onLoginClick} />}

      {step === 2 && (
        <SignupStep2
          mobile={mobileNumber}
          onNext={() => setStep(3)}
          onChangeNumber={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <SignupStep3
          onNext={(values) => {
            setLabData(values);
            localStorage.setItem(
              "labProfile",
              JSON.stringify({
                logo: "",
                labName: values.labName,
                labType: values.labType,
                branchName: "",
                phone: "",
                email: "",
                website: "",
                address: values.city,
              })
            );
            setStep(4);
          }}
        />
      )}

      {step === 4 && (
        <SignupStep4
          onSubmit={(values) => {
            localStorage.setItem(
              "labProfile",
              JSON.stringify({
                logo: "",
                labName: labData.labName,
                labType: labData.labType,
                branchName: "",
                phone: "",
                email: values.email,
                website: "",
                address: labData.city,
              })
            );
            onSignupSuccess(values);
          }}
          onLoginClick={onLoginClick}
        />
      )}
    </>
  );
};

// ═══════════════════════════════════════
//  PAGE ROOT
// ═══════════════════════════════════════

export default function Login(): JSX.Element {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [savedUser, setSavedUser] = useState<SavedUser>({ email: "", password: "" });

  const goToSignup = () => setMode("signup");
  const goToLogin = () => setMode("login");

  const handleSignupSuccess = (values: SignupValues) => {
    setSavedUser({ email: values.email, password: values.password });

    const existingProfile = localStorage.getItem("labProfile");
    const existing = existingProfile ? JSON.parse(existingProfile) : {};

    localStorage.setItem(
      "labProfile",
      JSON.stringify({
        ...existing,
        labName: existing.labName || "",
        labType: existing.labType || "",
        city: existing.city || "",
        fullName: values.fullName,
        email: values.email,
        logo: "",
        branchName: "",
        registrationNumber: "",
        phone: "",
        website: "",
        address: existing.city || "",
      })
    );

    router.push("/lab-admin/dashboard");
  };

  const handleLoginSuccess = () => {
    router.push("/lab-admin/dashboard");
  };

  return (
    /*
      OUTER WRAPPER
      h-dvh + overflow-hidden = no page scroll, ever.
      p-3 gives a thin margin around the card on all sizes.
    */
    <div className="flex h-dvh w-screen items-center justify-center overflow-hidden bg-white p-3">

      {/*
        CARD
        ────────────────────────────────────
        Mobile/Tablet  → stacked  (grid-rows-[auto_1fr])
        Desktop lg+    → side-by-side  (grid-cols-[0.75fr_1.25fr])

        max-h is tight: card never exceeds viewport.
        Right panel gets overflow-y-auto only as a safety net —
        on properly-sized viewports it should never trigger.
      */}
      <div
        className={`
          relative z-10
          w-full
          max-w-sm sm:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl
          overflow-hidden
          rounded-[24px]
          bg-white
          shadow-[0_25px_90px_rgba(0,0,0,0.45)]
          grid
          grid-rows-[auto_1fr]
          lg:grid-rows-none
          lg:grid-cols-[0.75fr_1.25fr]
          max-h-[calc(100dvh-1.5rem)]
        `}
      >
        {/* LEFT PANEL */}
        <LeftSide />

        {/* RIGHT PANEL */}
        <div className="flex h-full items-start justify-center overflow-y-auto bg-white px-5 py-5 sm:px-7 lg:px-10 lg:py-6">
          <div className="w-full max-w-xl">
            {mode === "login" ? (
              <LoginPanel
                savedUser={savedUser}
                onSignup={goToSignup}
                onLoginSuccess={handleLoginSuccess}
              />
            ) : (
              <SignupPanel
                onLoginClick={goToLogin}
                onSignupSuccess={handleSignupSuccess}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}