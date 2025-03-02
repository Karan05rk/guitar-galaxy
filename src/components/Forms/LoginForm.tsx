"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle, IconCheck, IconX, IconEye, IconEyeOff } from "@tabler/icons-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const isEmailValid = email.includes("@");
  const isPasswordValid = password.length >= 6;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", { email, password, rememberMe });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 border border-gray-500 shadow-2xl bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Login to GuitarGalaxy</h2>
        
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Username or Email</Label>
            <div className="relative">
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute right-3 top-3">
                {email && (isEmailValid ? <IconCheck className="text-green-500" /> : <IconX className="text-red-500" />)}
              </span>
            </div>
            {!isEmailValid && email && <p className="text-sm text-red-500">Enter a valid email address.</p>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
            {!isPasswordValid && password && <p className="text-sm text-red-500">Password must be at least 6 characters.</p>}
          </LabelInputContainer>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4"
              />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Remember Me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Forgot Password?</a>
          </div>

          <button
            className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-2xl"
            type="submit"
          >
            Login
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-[1px] bg-gray-300 dark:bg-gray-700"></div>
            <span className="mx-2 text-sm text-gray-500">or</span>
            <div className="flex-grow h-[1px] bg-gray-300 dark:bg-gray-700"></div>
          </div>

          <button
            className="flex items-center justify-center space-x-2 px-4 w-full text-black rounded-md h-10 font-medium shadow-2xl bg-gray-50 dark:bg-zinc-900 dark:shadow-md"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">Login with Google</span>
          </button>

          <p className="text-center text-sm text-neutral-700 dark:text-neutral-300 mt-4">
            Don't have an account? <a href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
