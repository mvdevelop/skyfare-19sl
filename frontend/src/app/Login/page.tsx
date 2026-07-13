"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";

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

  // Redirecionar se já estiver autenticado
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

    // Validações client-side
    if (mode === "register") {
      if (!name.trim()) {
        setError("Nome é obrigatório");
        return;
      }
      if (name.trim().length < 2) {
        setError("Nome deve ter pelo menos 2 caracteres");
        return;
      }
    }

    if (!email.trim()) {
      setError("Email é obrigatório");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email inválido");
      return;
    }

    if (!password) {
      setError("Senha é obrigatória");
      return;
    }

    if (password.length < 8) {
      setError("Senha deve ter pelo menos 8 caracteres");
      return;
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Senha deve conter letras maiúsculas, minúsculas e números");
      return;
    }

    if (mode === "register" && password !== confirmPassword) {
      setError("As senhas não coincidem");
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
    <>
      {/* Page Title Banner */}
      <div className="section-banner px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] min-h-[450px] lg:min-h-[500px] z-20 relative">
        <h2 className="text-4xl font-normal z-10 relative text-white text-center w-full unbounded-font">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>
        <ul className="text-white z-10 flex items-center gap-8 section-list">
          <li className="text-sm relative">
            <Link href="/">Home</Link>
          </li>
          <li className="text-sm relative">
            <FontAwesomeIcon icon={faAngleRight} className="absolute -left-6 top-0.5" />
            <Link href="/Login">{mode === "login" ? "Login" : "Sign Up"}</Link>
          </li>
        </ul>
      </div>

      {/* Login/Register Form */}
      <div className="px-[2%] sm:px-[8%] lg:px-[12%] py-[50px] lg:py-[90px] flex justify-center">
        <div className="w-full max-w-[520px] bg-[#0e0700] rounded-[20px] p-[40px] md:p-[50px]">
          {/* Toggle */}
          <div className="flex mb-8 border-b border-[#ffffff30]">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 pb-3 text-center font-semibold uppercase text-sm tracking-wider transition-colors cursor-pointer ${
                mode === "login"
                  ? "text-white border-b-2 border-white"
                  : "text-[#7a7a7a] hover:text-[#ffffffb3]"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`flex-1 pb-3 text-center font-semibold uppercase text-sm tracking-wider transition-colors cursor-pointer ${
                mode === "register"
                  ? "text-white border-b-2 border-white"
                  : "text-[#7a7a7a] hover:text-[#ffffffb3]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 rounded-[10px] bg-red-500/20 border border-red-500/50 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Name (register only) */}
            {mode === "register" && (
              <div className="mb-5">
                <label className="text-sm text-[#fff] mb-2 uppercase block">
                  Name
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7a7a]"
                  />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-[10px] border border-[#ffffff80] focus:outline-none text-[#7a7a7a] bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="mb-5">
              <label className="text-sm text-[#fff] mb-2 uppercase block">
                Email
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7a7a]"
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-[10px] border border-[#ffffff80] focus:outline-none text-[#7a7a7a] bg-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="text-sm text-[#fff] mb-2 uppercase block">
                Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7a7a]"
                />
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-[10px] border border-[#ffffff80] focus:outline-none text-[#7a7a7a] bg-transparent"
                />
              </div>
            </div>

            {/* Confirm Password (register only) */}
            {mode === "register" && (
              <div className="mb-5">
                <label className="text-sm text-[#fff] mb-2 uppercase block">
                  Confirm Password
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7a7a]"
                  />
                  <input
                    type="password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-[10px] border border-[#ffffff80] focus:outline-none text-[#7a7a7a] bg-transparent"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-3 uppercase w-full px-6 py-3 bg-[#fff] rounded-[50px] font-semibold cursor-pointer text-[#0e0700] hover:bg-[#193555] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Processing..."
                : mode === "login"
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          {/* Footer text */}
          {mode === "login" ? (
            <p className="text-center mt-6 text-sm text-[#7a7a7a]">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("register")}
                className="text-white hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-center mt-6 text-sm text-[#7a7a7a]">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="text-white hover:underline cursor-pointer"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
