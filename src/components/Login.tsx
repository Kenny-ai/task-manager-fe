"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import { useStoreVars } from "@/context/states";

const Login = () => {
  const { login, register } = useAuth();
  const [isMember, setIsMember] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userName, userId } = useStoreVars();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register.mutate({ name, email, password });
  };

  useEffect(() => {
    console.log({
      userName,
      userId,
    });
  }, [userName, userId]);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <header>
        <Icon src="/assets/logo-mobile.svg" alt="kanban-logo" />
      </header>

      <span className="">{login.isLoading && `loading...`}</span>

      <main className="w-full max-w-[400px] bg-color-white dark:bg-dark-secondary-bg shadow-md rounded-lg p-8">
        <form className="" onSubmit={isMember ? handleLogin : handleRegister}>
          <h3 className="text-2xl font-bold mb-6 text-color-purple dark:text-color-white">
            {isMember ? `Login` : `Sign Up`}
          </h3>
          <div className="flex flex-col gap-6">
            <div className={`${isMember ? `hidden` : `flex flex-col gap-2`}`}>
              <label
                htmlFor="name"
                className="text-sm text-color-medium-gray dark:text-color-white font-medium"
              >
                Name
              </label>
              <Input
                type="text"
                placeholder="Your name"
                required={!isMember}
                id="name"
                name="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm text-color-medium-gray dark:text-color-white font-medium"
              >
                Email
              </label>
              <Input
                type="email"
                placeholder="Your email"
                required
                id="email"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm text-color-medium-gray dark:text-color-white font-medium"
              >
                Password
              </label>
              <Input
                type="password"
                placeholder="Your password"
                required
                id="password"
                name="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="bg-color-purple hover:bg-color-light-purple duration-300 text-color-white rounded-lg py-2 mb-6 text-sm font-medium"
              type="submit"
            >
              {!isMember ? `Create an account` : `Login`}
            </button>
          </div>
          <p className="text-color-medium-gray font-bold text-sm mb-2">
            {!isMember
              ? `Already have an account? `
              : `Don't have an account? `}
            <span
              onClick={() => setIsMember(() => !isMember)}
              className="text-color-purple hover:text-purple-500 duration-150 hover:underline cursor-pointer"
            >
              {!isMember ? `Login` : `Sign Up`}
            </span>
          </p>{" "}
          <Link
            href="/"
            className="font-bold text-sm text-color-purple hover:text-purple-500 duration-150 hover:underline cursor-pointer"
          >
            Or access the app without login or sign up
          </Link>
        </form>
      </main>
    </div>
  );
};

export default Login;
