"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faPlane } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-image.jpg";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login, register, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirecionar se ja estiver autenticado
  if (isAuthenticated) {
    router.push("/");
    return null;
  }

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const switchMode = (newMode: "login" | "register") => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (!name.trim()) {
        setError("Nome e obrigatorio");
        return;
      }
      if (name.trim().length < 2) {
        setError("Nome deve ter pelo menos 2 caracteres");
        return;
      }
    }

    if (!email.trim()) {
      setError("Email e obrigatorio");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email invalido");
      return;
    }

    if (!password) {
      setError("Senha e obrigatoria");
      return;
    }

    if (password.length < 8) {
      setError("Senha deve ter pelo menos 8 caracteres");
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Senha deve conter letras maiusculas, minusculas e numeros");
      return;
    }

    if (mode === "register" && password !== confirmPassword) {
      setError("As senhas nao coincidem");
      return;
    }

    setSubmitting(true);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel — Hero Image */}
      <div className="relative lg:w-1/2 min-h-[300px] lg:min-h-screen overflow-hidden">
        {/* Background Image */}
        <Image
          src={heroImage}
          alt="Discover your next adventure"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10">
            <FontAwesomeIcon icon={faPlane} className="text-white text-2xl" />
            <span className="text-2xl font-bold text-white unbounded-font tracking-wide">
              Sky<span className="font-normal">Fare</span>
            </span>
          </Link>

          {/* Tagline */}
          <div className="z-10 mb-12 lg:mb-0">
            <h1 className="text-3xl lg:text-5xl font-bold text-white unbounded-font leading-tight mb-4 animate-fade-in">
              Discover your next adventure
            </h1>
            <p className="text-white/70 text-lg max-w-md animate-fade-in-delay">
              Explore the world&apos;s most breathtaking destinations with curated tours and unforgettable experiences.
            </p>
          </div>

          {/* Decorative dots */}
          <div className="hidden lg:flex gap-2 z-10">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-white/40" />
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="lg:w-1/2 bg-[#0e0700] flex flex-col justify-center items-center px-6 py-12 lg:py-0 lg:min-h-screen">
        <div className="w-full max-w-[420px] animate-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
            <FontAwesomeIcon icon={faPlane} className="text-[#193555] text-xl" />
            <span className="text-xl font-bold text-white unbounded-font">
              Sky<span className="font-normal">Fare</span>
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-white unbounded-font mb-2">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-[#7a7a7a] mb-8">
            {mode === "login"
              ? "Sign in to continue your journey"
              : "Join us and start exploring"}
          </p>

          {/* Toggle Tabs */}
          <div className="flex mb-8 border-b border-white/10">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 pb-3 text-center font-semibold uppercase text-sm tracking-wider transition-all duration-300 cursor-pointer ${
                mode === "login"
                  ? "text-white border-b-2 border-[#193555]"
                  : "text-[#7a7a7a] hover:text-white/60"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`flex-1 pb-3 text-center font-semibold uppercase text-sm tracking-wider transition-all duration-300 cursor-pointer ${
                mode === "register"
                  ? "text-white border-b-2 border-[#193555]"
                  : "text-[#7a7a7a] hover:text-white/60"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-fade-in">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name (register only) */}
            {mode === "register" && (
              <div className="mb-4">
                <label className="text-xs text-[#7a7a7a] mb-2 uppercase tracking-wider block">
                  Full Name
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a7a7a] text-sm"
                  />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-[#193555] focus:ring-2 focus:ring-[#193555]/30 transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="text-xs text-[#7a7a7a] mb-2 uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a7a7a] text-sm"
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-[#193555] focus:ring-2 focus:ring-[#193555]/30 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-xs text-[#7a7a7a] mb-2 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a7a7a] text-sm"
                />
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-[#193555] focus:ring-2 focus:ring-[#193555]/30 transition-all duration-300"
                />
              </div>
            </div>

            {/* Confirm Password (register only) */}
            {mode === "register" && (
              <div className="mb-4">
                <label className="text-xs text-[#7a7a7a] mb-2 uppercase tracking-wider block">
                  Confirm Password
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a7a7a] text-sm"
                  />
                  <input
                    type="password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-[#193555] focus:ring-2 focus:ring-[#193555]/30 transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {/* Forgot password (login only) */}
            {mode === "login" && (
              <div className="flex justify-end mb-6">
                <button type="button" className="text-xs text-[#193555] hover:text-[#2a5080] transition-colors cursor-pointer">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#193555] hover:bg-[#1a4170] text-white rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-[#193555]/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting
                ? "Processing..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          {/* Footer text */}
          <p className="text-center mt-8 text-sm text-[#7a7a7a]">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="text-[#193555] hover:text-[#2a5080] font-medium transition-colors cursor-pointer"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="text-[#193555] hover:text-[#2a5080] font-medium transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </>
            )}
          </p>

          {/* Back to home */}
          <div className="text-center mt-4">
            <Link
              href="/"
              className="text-xs text-[#7a7a7a]/60 hover:text-[#7a7a7a] transition-colors"
            >
              &larr; Back to SkyFare
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
