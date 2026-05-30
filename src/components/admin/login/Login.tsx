"use client";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ─── Lucide icons ────────────────────────────────────────────────────────────
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

// ─── Formik + Yup ────────────────────────────────────────────────────────────
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

interface BackButtonProps {
  onClick: () => void;
}

interface StepIndicatorProps {
  current: number;
  total?: number;
}

interface LoginMobileTabProps {
  onSendOtp: (
    values: MobileValues,
    helpers: FormikHelpers<MobileValues>
  ) => void;
  onSwitchEmail: () => void;
  onSignup: () => void;
}

interface LoginEmailTabProps {
  savedUser: SavedUser;
  onSignup: () => void;
  onSuccess: () => void;
}

interface LoginOtpVerifyProps {
  onBack: () => void;
  onSuccess: () => void;
}

interface LoginPanelProps {
  savedUser: SavedUser;
  onSignup: () => void;
  onLoginSuccess: () => void;
}

interface SignupStep1Props {
  onNext: (
    values: MobileValues | null,
    meta?: { skipToStep3?: boolean }
  ) => void;
  onLoginClick: () => void;
}

interface SignupStep2Props {
  onNext: () => void;
}

interface SignupStep3Props {
  onNext: (
    values: LabValues,
    helpers: FormikHelpers<LabValues>
  ) => void;
}

interface SignupStep4Props {
  onSubmit: (
    values: SignupValues,
    helpers: FormikHelpers<SignupValues>
  ) => void;
  onLoginClick: () => void;
}

interface SignupPanelProps {
  onLoginClick: () => void;
  onSignupSuccess: (values: SignupValues) => void;
}

// ════════════════════════════════════════════════════════════════════════════
//  SCHEMAS
// ════════════════════════════════════════════════════════════════════════════

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

// ════════════════════════════════════════════════════════════════════════════
//  SHARED CLASSES
// ════════════════════════════════════════════════════════════════════════════

const inputClass =
  "h-13 w-full rounded-2xl border border-[#45657D]/60 bg-[#131D2B]/90 px-5 text-black placeholder:text-[#7F8CA3] outline-none transition-all duration-300 focus:border-[#4E9B95]  focus:ring-4 focus:ring-[#3D7773]/10";

const buttonClass =
  "flex h-13 w-full items-center justify-center rounded-2xl bg-[#4A8B86] text-black shadow-[#2f5ba5]/70/20 transition-all duration-300 hover:scale-[1.01] hover:bg-[#56A29B] active:scale-[0.99]";

const outlineButtonClass =
  "flex h-13 w-full items-center justify-center gap-3 rounded-2xl border border-[#45657D]/40 bg-[#182235]/60 text-black transition-all duration-300 hover:bg-[#1D2A40]";

// ════════════════════════════════════════════════════════════════════════════
//  REUSABLE ATOMS
// ════════════════════════════════════════════════════════════════════════════

const BackButton = ({ onClick }: BackButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="mb-6 flex items-center gap-2 text-[#9BA8BC] transition-all hover:text-black"
  >
    <ArrowLeft className="h-4 w-4" />
    Back
  </button>
);

const MobileField = () => (
  <div className="flex gap-3">
    <div className="flex h-13 items-center gap-2 whitespace-nowrap rounded-2xl border border-[#45657D]/60 bg-[#131D2B]/90 px-4 text-black">
      +91
    </div>

    <div className="flex-1">
      <Field
        name="mobile"
        type="text"
        placeholder="Enter mobile number"
        className={inputClass}
      />

      <ErrorMessage
        name="mobile"
        component="div"
        className="mt-2 text-red-400"
      />
    </div>
  </div>
);

const OtpInputs = () => (
  <div className="mt-8 flex items-center justify-between gap-3">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <input
        key={item}
        type="text"
        maxLength={1}
        className="h-14 w-14 rounded-2xl border border-[#45657D]/50 bg-[#182235]/90 text-center text-lg text-black shadow-inner outline-none transition-all duration-300 focus:border-[#4E9B95] focus:ring-4 focus:ring-[#3D7773]/10"
      />
    ))}
  </div>
);

const StepIndicator = ({
  current,
  total = 4,
}: StepIndicatorProps) => (
  <div className="mb-7 flex items-center justify-center">
    {Array.from({ length: total }, (_, i) => i + 1).map(
      (item, index) => (
        <div key={item} className="flex items-center">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${current >= item
              ? "bg-[#4A8B86] text-black"
              : "bg-[#1E293B] text-[#8391A7]"
              }`}
          >
            {item}
          </div>

          {index !== total - 1 && (
            <div
              className={`h-px w-12 transition-all duration-300 ${current > item
                ? "bg-[#4A8B86]"
                : "bg-[#2A3548]"
                }`}
            />
          )}
        </div>
      )
    )}
  </div>
);

// ════════════════════════════════════════════════════════════════════════════
//  LEFT SIDE
// ════════════════════════════════════════════════════════════════════════════

const features = [
  { icon: FileHeart, title: "Easy report upload" },
  { icon: ShieldCheck, title: "Secure patient data" },
  { icon: BadgeCheck, title: "Instant report delivery" },
  { icon: Sparkles, title: "Smart health insights" },
];

const LeftSide = () => (
  <div className="relative hidden overflow-hidden border-r border-[#45657D]/20 bg-linear-to-b from-[#181E2B] via-[#243B4A] to-[#3D7773] lg:flex lg:flex-col">
    <div className="relative z-10 flex h-full flex-col justify-between p-8 xl:p-10">
      <div className="flex justify-start">
        <div className="relative h-16 w-44">
          <Image
            src="/APP ICONSM.png"
            alt="HeartView Health logo"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="max-w-md">
          <h2 className="text-xl font-medium leading-tight text-black sm:text-2xl lg:text-3xl xl:text-5xl xl:leading-13">
            Create your Lab Portal account
          </h2>

          <p className="mt-5 leading-7 text-[#64748B]">
            Securely manage reports, patients, and lab operations
            with a modern healthcare dashboard experience.
          </p>
        </div>

        <div className="mt-9 grid gap-4">
          {features.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/3 px-4 py-3 transition-all duration-300 hover:bg-white/6"
            >


              <h3 className="font-medium text-black">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════
//  LOGIN
// ════════════════════════════════════════════════════════════════════════════

const LoginMobileTab = ({
  onSendOtp,
  onSwitchEmail,
  onSignup,
}: LoginMobileTabProps) => (
  <>
    <p className="mt-5 text-[#94A3B8]">
      Enter your registered mobile number
    </p>

    <Formik
      initialValues={{ mobile: "" }}
      validationSchema={mobileSchema}
      onSubmit={onSendOtp}
    >
      <Form className="mt-4 space-y-5">
        <MobileField />

        <button type="submit" className={buttonClass}>
          Send OTP
        </button>
      </Form>
    </Formik>

    <div className="mt-auto 2xl:pt-50">
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#243246]" />

        <span className="whitespace-nowrap text-[#718096]">
          or continue with
        </span>

        <div className="h-px flex-1 bg-[#243246]" />
      </div>

      <button
        type="button"
        onClick={onSwitchEmail}
        className={outlineButtonClass}
      >
        <MdEmail className="h-5 w-5" />
        Sign in with Email
      </button>

      <p className="mt-6 text-center text-[#94A3B8]">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSignup}
          className="font-medium text-[#4A8B86] transition-colors hover:text-[#66B3AC]"
        >
          Sign up
        </button>
      </p>
    </div>
  </>
);

const LoginEmailTab = ({
  savedUser,
  onSignup,
  onSuccess,
}: LoginEmailTabProps) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: savedUser.email || "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values: LoginValues) => {
        if (
          savedUser.email &&
          values.email === savedUser.email &&
          values.password === savedUser.password
        ) {
          onSuccess();
        } else {
          alert(
            "Invalid credentials. Please check your email and password."
          );
        }
      }}
    >
      <Form className="mt-7 space-y-5">
        <div>
          <Field
            name="email"
            type="email"
            placeholder="Enter email address"
            className={inputClass}
          />

          <ErrorMessage
            name="email"
            component="div"
            className="mt-2 text-red-400"
          />
        </div>

        <div className="relative">
          <Field
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Enter password"
            className={`${inputClass} pr-14`}
          />

          <button
            type="button"
            onClick={() => setShowPass((p) => !p)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8FA6C1]"
          >
            {showPass ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>

          <ErrorMessage
            name="password"
            component="div"
            className="mt-2 text-red-400"
          />
        </div>

        <button type="submit" className={buttonClass}>
          Sign In
        </button>

        <p className="text-center text-[#94A3B8]">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSignup}
            className="font-medium text-[#4A8B86]"
          >
            Sign up
          </button>
        </p>
      </Form>
    </Formik>
  );
};

const LoginOtpVerify = ({
  onBack,
  onSuccess,
}: LoginOtpVerifyProps) => {
  const [timer, setTimer] = useState(45);
  const [isResending, setIsResending] = useState(false);

  // TIMER START
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // RESEND OTP
  const handleResendOtp = () => {
    if (timer > 0) return;

    setIsResending(true);

    setTimeout(() => {
      console.log("OTP resent");

      setTimer(45);

      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      setIsResending(false);
    }, 1500);
  };

  return (
    <>
      <BackButton onClick={onBack} />

      <h2 className="text-3xl text-black">
        Verify OTP
      </h2>

      <p className="mt-3 text-[#94A3B8]">
        Enter the 6-digit code sent to your mobile number
      </p>

      <OtpInputs />

      <div className="mt-5 text-center">
        {timer > 0 ? (
          <p className="text-[#718096]">
            Resend OTP in 00:
            {timer.toString().padStart(2, "0")}
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
            className="font-medium text-[#4A8B86] hover:text-[#66B3AC]"
          >
            {isResending ? "Sending..." : "Resend OTP"}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onSuccess}
        className={`${buttonClass} mt-7`}
      >
        Verify & Sign In
      </button>
    </>
  );
};

const LoginPanel = ({
  savedUser,
  onSignup,
  onLoginSuccess,
}: LoginPanelProps) => {
  const [loginStep, setLoginStep] =
    useState<LoginStep>("mobile");

  if (loginStep === "otp") {
    return (
      <LoginOtpVerify
        onBack={() => setLoginStep("mobile")}
        onSuccess={onLoginSuccess}
      />
    );
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-lg font-normal text-black sm:text-xl lg:text-2xl xl:text-3xl">
          Welcome Back!
        </h2>

        <p className="mt-2 text-[#94A3B8]">
          Sign in to access your HeartView Lab Portal
        </p>
      </div>

      <div className="rounded-2xl bg-[#182235] p-1">
        <div className="flex">
          <button
            type="button"
            onClick={() => setLoginStep("mobile")}
            className={`flex-1 rounded-xl py-3 font-medium transition-all duration-300 ${loginStep === "mobile"
              ? "bg-[#4A8B86] text-black"
              : "text-[#94A3B8]"
              }`}
          >
            Mobile OTP
          </button>

          <button
            type="button"
            onClick={() => setLoginStep("email")}
            className={`flex-1 rounded-xl py-3 font-medium transition-all duration-300 ${loginStep === "email"
              ? "bg-[#4A8B86] text-black"
              : "text-[#94A3B8]"
              }`}
          >
            Email &amp; Password
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
        <LoginEmailTab
          savedUser={savedUser}
          onSignup={onSignup}
          onSuccess={onLoginSuccess}
        />
      )}
    </>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  SIGNUP
// ════════════════════════════════════════════════════════════════════════════

const SignupStep1 = ({
  onNext,
  onLoginClick,
}: SignupStep1Props) => (
  <>
    <h2 className="text-lg font-normal text-black sm:text-xl lg:text-2xl xl:text-3xl">
      Let&apos;s get started
    </h2>

    <p className="mt-2 text-[#94A3B8]">
      Enter your mobile number to create account
    </p>

    <Formik
      initialValues={{ mobile: "" }}
      validationSchema={mobileSchema}
      onSubmit={onNext}
    >
      <Form className="mt-7 space-y-5">
        <MobileField />

        <button type="submit" className={buttonClass}>
          Send OTP
        </button>
      </Form>
    </Formik>

    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-[#243246]" />

      <span className="text-[#718096]">or</span>

      <div className="h-px flex-1 bg-[#243246]" />
    </div>

    <button
      type="button"
      onClick={() => onNext(null, { skipToStep3: true })}
      className={outlineButtonClass}
    >
      <Mail className="h-5 w-5" />
      Sign up with Email
    </button>

    <p className="mt-6 text-center text-[#94A3B8]">
      Already have an account?{" "}
      <button
        type="button"
        onClick={onLoginClick}
        className="font-medium text-[#4A8B86]"
      >
        Sign in
      </button>
    </p>
  </>
);

interface SignupStep2Props {
  mobile: string;
  onNext: () => void;
  onChangeNumber: () => void;
}

const SignupStep2 = ({
  mobile,
  onNext,
  onChangeNumber,
}: SignupStep2Props) => {
  const [timer, setTimer] = useState(45);
  const [isResending, setIsResending] = useState(false);

  // TIMER START
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // RESEND OTP
  const handleResendOtp = async () => {
    if (timer > 0) return;

    setIsResending(true);

    // fake loading
    setTimeout(() => {
      console.log("OTP resent to:", mobile);

      // restart timer
      setTimer(45);

      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);

      setIsResending(false);
    }, 1500);
  };

  return (
    <>
      <h2 className="text-lg font-normal text-black sm:text-xl lg:text-2xl xl:text-3xl">
        Verify your number
      </h2>

      <p className="mt-2 text-[#94A3B8]">
        Enter the 6-digit code sent to{" "}
        <span className="font-medium text-black">
          +91 {mobile}
        </span>{" "}
        <button
          type="button"
          onClick={onChangeNumber}
          className="font-medium text-[#4A8B86]"
        >
          Change
        </button>
      </p>

      <OtpInputs />

      <div className="mt-5 text-center">
        {timer > 0 ? (
          <p className="text-[#718096]">
            Resend OTP in 00:
            {timer.toString().padStart(2, "0")}
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
            className="font-medium text-[#4A8B86] hover:text-[#66B3AC]"
          >
            {isResending ? "Sending..." : "Resend OTP"}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onNext}
        className={`${buttonClass} mt-7`}
      >
        Verify & Continue
      </button>
    </>
  );
};

const SignupStep3 = ({ onNext }: SignupStep3Props) => (
  <>
    <h2 className="text-lg font-normal text-black sm:text-xl lg:text-2xl xl:text-3xl">
      Tell us about your lab
    </h2>

    <p className="mt-2 text-[#94A3B8]">
      Help us set up your lab profile
    </p>

    <Formik
      initialValues={{
        labName: "",
        labType: "",
        city: "",
      }}
      validationSchema={labSchema}
      onSubmit={onNext}
    >
      <Form className="mt-7 space-y-5">
        <div>
          <label className="mb-1.5 block text-[#94A3B8]">
            Lab Name
          </label>

          <Field
            name="labName"
            type="text"
            placeholder="Enter lab name"
            className={inputClass}
            spellCheck={false}
          />

          <ErrorMessage
            name="labName"
            component="div"
            className="mt-1 text-red-400"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[#94A3B8]">
            Lab Type
          </label>

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
              form: {
                values: {
                  labType: string;
                };
              };
            }) => (
              <select
                {...field}
                className={`${inputClass} ${form.values.labType
                  ? "text-black!"
                  : "text-[#7F8CA3]!"
                  }`}
              >
                <option value="">Select lab type</option>

                <option value="Diagnostic Lab">
                  Diagnostic Lab
                </option>

                <option value="Hospital Lab">
                  Hospital Lab
                </option>

                <option value="Pathology Lab">
                  Pathology Lab
                </option>
              </select>
            )}
          </Field>

          <ErrorMessage
            name="labType"
            component="div"
            className="mt-1 text-red-400"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[#94A3B8]">
            City
          </label>

          <Field
            name="city"
            type="text"
            placeholder="Enter city"
            className={inputClass}
            spellCheck={false}
          />

          <ErrorMessage
            name="city"
            component="div"
            className="mt-1 text-red-400"
          />
        </div>

        <button type="submit" className={buttonClass}>
          Continue
        </button>
      </Form>
    </Formik>
  </>
);

const SignupStep4 = ({
  onSubmit,
  onLoginClick,
}: SignupStep4Props) => {
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);

  return (
    <>
      <h2 className="text-lg font-normal text-black sm:text-xl lg:text-2xl xl:text-3xl">
        Create your account
      </h2>

      <p className="text-[#94A3B8]">
        Set up your login credentials
      </p>

      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={accountSchema}
        onSubmit={onSubmit}
      >
        <Form className="mt-7 space-y-4">
          <div>
            <label className="mb-1.5 block text-[#94A3B8]">
              Full Name
            </label>

            <Field
              name="fullName"
              type="text"
              placeholder="Enter full name"
              className={inputClass}
              spellCheck={false}
            />

            <ErrorMessage
              name="fullName"
              component="div"
              className="mt-1 text-red-400"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[#94A3B8]">
              Email (Optional)
            </label>

            <Field
              name="email"
              type="email"
              placeholder="Enter email address"
              className={inputClass}
            />

            <ErrorMessage
              name="email"
              component="div"
              className="mt-1 text-red-400"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[#94A3B8]">
              Password
            </label>

            <div className="relative">
              <Field
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Create a strong password"
                className={`${inputClass} pr-14`}
              />

              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8FA6C1]"
              >
                {showPass ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <ErrorMessage
              name="password"
              component="div"
              className="mt-1 text-red-400"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[#94A3B8]">
              Confirm Password
            </label>

            <div className="relative">
              <Field
                name="confirmPassword"
                type={showCPass ? "text" : "password"}
                placeholder="Confirm your password"
                className={`${inputClass} pr-14`}
              />

              <button
                type="button"
                onClick={() => setShowCPass((p) => !p)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8FA6C1]"
              >
                {showCPass ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="mt-1 text-red-400"
            />
          </div>

       <label className="flex items-start gap-3 text-[#94A3B8]">
  <input
    type="checkbox"
    className="mt-1 accent-[#4A8B86]"
  />

  <span className="flex flex-wrap items-center">
    <span className="mr-2">I agree to the</span>

    <span className="cursor-pointer text-[#4A8B86] mr-2">
      Terms of Service
    </span>

    <span className="mr-2">and</span>

    <span className="cursor-pointer text-[#4A8B86]">
      Privacy Policy
    </span>
  </span>
</label>

          <button type="submit" className={buttonClass}>
            Create Account
          </button>
          
        </Form>
      </Formik>

      <p className="mt-6 text-center text-[#94A3B8]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLoginClick}
          className="font-medium text-[#4A8B86]"
        >
          Sign in
        </button>
      </p>
    </>
  );
};

const SignupPanel = ({
  onLoginClick,
  onSignupSuccess,
}: SignupPanelProps) => {
  const [step, setStep] = useState<number>(1);
  const [mobileNumber, setMobileNumber] =
    useState<string>("");

  const handleBack = () => {
    if (step === 1) {
      onLoginClick();
    } else {
      setStep((s) => s - 1);
    }
  };
  const handleStep1Next = (
    values: MobileValues | null,
    meta?: { skipToStep3?: boolean }
  ) => {
    if (meta?.skipToStep3) {
      setStep(3);
    } else {
      if (values?.mobile) {
        setMobileNumber(values.mobile);

        // SEND OTP API
        console.log("Send OTP to:", values.mobile);
      }

      setStep(2);
    }
  };

  return (
    <>
      <BackButton onClick={handleBack} />

      <StepIndicator current={step} total={4} />

      {step === 1 && (
        <SignupStep1
          onNext={handleStep1Next}
          onLoginClick={onLoginClick}
        />
      )}

      {step === 2 && (
        <SignupStep2
          mobile={mobileNumber}
          onNext={() => setStep(3)}
          onChangeNumber={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <SignupStep3 onNext={() => setStep(4)} />
      )}

      {step === 4 && (
        <SignupStep4
          onSubmit={(values) => onSignupSuccess(values)}
          onLoginClick={onLoginClick}
        />
      )}
    </>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  PAGE ROOT
// ════════════════════════════════════════════════════════════════════════════

export default function Login(): JSX.Element {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");

  const [savedUser, setSavedUser] = useState<SavedUser>({
    email: "",
    password: "",
  });

  const goToSignup = () => setMode("signup");

  const goToLogin = () => setMode("login");

  const handleSignupSuccess = (values: SignupValues) => {
    setSavedUser({
      email: values.email,
      password: values.password,
    });

    setMode("login");
  };

  const handleLoginSuccess = () => {
    router.push("/lab-admin/dashboard");
  };

  return (
    <div className="page-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-4">
      <div className="relative grid h-200 w-full max-w-6xl overflow-hidden rounded-[30px] border border-[#45657D]/40 bg-[#0D1525]/95 shadow-[0_25px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl lg:grid-cols-[0.65fr_1.15fr]">
        <LeftSide />

        <div className="flex h-full items-start justify-center overflow-y-auto bg-[#0e151d] px-5 py-8 sm:px-8 lg:px-12">
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