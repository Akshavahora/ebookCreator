
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  WandSparkles,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({
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
      // Send login data to backend
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        formData
      );

      const { token } = response.data;

      // Fetch profile to get user details
      const profileResponse = await axiosInstance.get(
        API_PATHS.AUTH.GET_PROFILE,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      login(profileResponse.data, token);

      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      localStorage.clear();

      toast.error(
        error.response?.data?.message ||
        "Login failed. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08070d]">
      {/* ================================================== */}
      {/* BACKGROUND */}
      {/* ================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Violet Glow */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[130px]" />

        {/* Pink Glow */}
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[130px]" />

        {/* Center Glow */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[130px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* ================================================== */}
      {/* MAIN CONTAINER */}
      {/* ================================================== */}

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-2">

          {/* ================================================== */}
          {/* LEFT SIDE */}
          {/* ================================================== */}

          <div className="relative hidden overflow-hidden lg:flex">
            {/* Glow */}
            <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[100px]" />

            <div className="relative flex min-h-[650px] w-full flex-col justify-between p-12 xl:p-16">

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
                  Welcome back, creator
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white xl:text-5xl">
                  Continue creating
                  <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-300 bg-clip-text text-transparent">
                    something amazing.
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-md text-base leading-7 text-gray-400">
                  Your ideas are waiting. Sign in and continue turning your
                  imagination into beautiful, professional eBooks.
                </p>

                {/* Features */}
                <div className="mt-9 space-y-4">

                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                      <WandSparkles className="h-4 w-4 text-violet-400" />
                    </div>

                    Create with AI-powered tools
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-fuchsia-500/10">
                      <BookOpen className="h-4 w-4 text-fuchsia-400" />
                    </div>

                    Pick up where you left off
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                      <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                    </div>

                    Your projects are always within reach
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="relative">
                <div className="h-px w-full bg-gradient-to-r from-violet-500/30 via-white/10 to-transparent" />

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <ShieldCheck className="h-4 w-4 text-emerald-500/70" />
                  Secure and private workspace
                </div>
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* RIGHT SIDE */}
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

            {/* Login Content */}
            <div className="w-full max-w-md pt-16 lg:pt-0">

              {/* Heading */}
              <div className="mb-8">

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-violet-400/20">
                  <Sparkles className="h-5 w-5 text-violet-400" />
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Sign in to continue to your eBook dashboard.
                </p>
              </div>

              {/* Login Card */}
              <div className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-2xl shadow-black/20 sm:p-8">

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

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
                    placeholder="Enter your password"
                    icon={Lock}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  {/* Security Hint */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/70" />

                    <span>Your login information is securely protected.</span>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      className="group w-full"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Sign In

                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Button>
                  </div>
                </form>

                {/* Signup */}
                <div className="mt-7 border-t border-white/[0.08] pt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Don't have an account?{" "}

                    <Link
                      to="/signup"
                      className="font-semibold text-violet-400 transition-colors hover:text-violet-300"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </div>

              {/* Bottom Trust */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/70" />
                Secure login
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

export default LoginPage;

