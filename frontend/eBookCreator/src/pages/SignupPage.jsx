import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PenLine,
  WandSparkles,
} from "lucide-react";
import toast from "react-hot-toast";

import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        formData
      );

      const { token } = response.data;

      // Fetch profile API to get user details
      const profileResponse = await axiosInstance.get(
        API_PATHS.AUTH.GET_PROFILE,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );

      login(profileResponse.data, token);

      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08070d]">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0">
        {/* Violet Glow */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[130px]" />

        {/* Pink Glow */}
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[130px]" />

        {/* Center Glow */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[130px]" />

        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* ================= MAIN ================= */}

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid w-full grid-cols-1 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-2">

          {/* ================================================== */}
          {/* LEFT SECTION */}
          {/* ================================================== */}

          <div className="relative hidden overflow-hidden lg:flex">
            {/* Left Glow */}
            <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[100px]" />

            <div className="relative flex min-h-[700px] w-full flex-col justify-between p-12 xl:p-16">

              {/* Logo */}
              <Link
                to="/"
                className="group inline-flex w-fit items-center gap-3"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-violet-500/40 blur-lg transition-all duration-300 group-hover:bg-violet-500/60" />

                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-900/30 transition-transform duration-300 group-hover:scale-105">
                    <BookOpen className="h-5 w-5 text-white" />

                    <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-violet-200" />
                  </div>
                </div>

                <span className="text-xl font-bold tracking-tight text-white">
                  eBook Creator
                </span>
              </Link>

              {/* Main Content */}
              <div className="relative max-w-lg">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3.5 py-2 text-xs font-medium text-violet-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI-powered publishing
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white xl:text-5xl">
                  Turn your ideas into
                  <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-300 bg-clip-text text-transparent">
                    beautiful books.
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
                  Create stunning, professional eBooks with the power of AI.
                  Write less, create more, and bring your ideas to life.
                </p>

                {/* Features */}
                <div className="mt-9 space-y-4">

                  {/* Feature 1 */}
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                      <WandSparkles className="h-4 w-4 text-violet-400" />
                    </div>

                    AI-powered content generation
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-fuchsia-500/10">
                      <PenLine className="h-4 w-4 text-fuchsia-400" />
                    </div>

                    Beautiful and professional designs
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                      <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                    </div>

                    Ready to publish in minutes
                  </div>
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="relative">
                <div className="h-px w-full bg-gradient-to-r from-violet-500/30 via-white/10 to-transparent" />

                <p className="mt-6 text-sm italic leading-6 text-gray-500">
                  "Great books start with great ideas."
                </p>
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* RIGHT SECTION */}
          {/* ================================================== */}

          <div className="relative flex items-center justify-center bg-white/[0.025] p-6 sm:p-10 lg:p-12 xl:p-16">

            {/* Mobile Logo */}
            <div className="absolute left-6 top-6 lg:hidden">
              <Link
                to="/"
                className="group inline-flex items-center gap-2.5"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg bg-violet-500/40 blur-md" />

                  <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                </div>

                <span className="text-base font-bold text-white">
                  eBook Creator
                </span>
              </Link>
            </div>

            {/* Signup Content */}
            <div className="w-full max-w-md pt-16 lg:pt-0">

              {/* Heading */}
              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-violet-400/20">
                  <Sparkles className="h-5 w-5 text-violet-400" />
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Start creating amazing eBooks today. It only takes a
                  minute.
                </p>
              </div>

              {/* Form Card */}
              <div className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-2xl shadow-black/20 sm:p-8">

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name */}
                  <InputField
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    icon={User}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  {/* Email */}
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    icon={Mail}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  {/* Password */}
                  <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    icon={Lock}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  {/* Password Hint */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock className="h-3.5 w-3.5" />

                    <span>
                      Use at least 6 characters for your password.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      className="group w-full"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Create Account

                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </div>
                </form>

                {/* Login Link */}
                <div className="mt-7 border-t border-white/[0.08] pt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}

                    <Link
                      to="/login"
                      className="font-semibold text-violet-400 transition-colors hover:text-violet-300"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>

              {/* Security */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/70" />

                Your information is secure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
    </div>
  );
};

export default SignupPage;

