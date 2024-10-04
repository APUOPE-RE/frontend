"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { registerUser } from "../actions/registration";
import { RegistrationData } from "../types/types";

export default function Register() {
	const {
		handleSubmit,
		register,
		watch,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<RegistrationData>();

	const [watchEmail, watchPasswordFirst, watchPasswordSecond, watchUsername] =
		watch(["email", "passwordFirst", "passwordSecond", "username"]);

	useEffect(() => {
		if (watchPasswordFirst || watchPasswordSecond) {
			clearErrors("passwordFirst");
		}
	}, [watchPasswordFirst, watchPasswordSecond, clearErrors]);

	useEffect(() => {
		if (watchEmail || watchUsername) {
			clearErrors("errors");
		}
	}, [watchEmail, watchUsername, clearErrors]);

	const handleRegistration = async (
		data: RegistrationData
	): Promise<void> => {
		if (data.passwordFirst !== watchPasswordSecond) {
			setError("passwordFirst", {
				message: "Passwords don't match!",
			});
		} else {
			const response = await registerUser(data);

			if (!response.success) {
				setError("errors", {
					message: response.data,
				});
			} else {
				clearErrors("errors");
			}
		}
	};

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Username
            </label>
            <input
              id="username"
              type="username"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="">
              Already have an account?
              <span className="text-blue-800 font-semibold underline pl-1">
                <Link href="/login"> Login</Link>
              </span>
            </p>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring"
            >
              Register
            </button>
          </div>
          <p className="text-gray-400">{errorMessage}</p>
        </form>
      </div>
    </div>
  );
};