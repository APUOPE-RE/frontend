"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { UserCredentials, validateUser } from "../actions/login";
import { useEffect, useState } from "react";

export default function Login() {
	const [valid, setValid] = useState(false);
	const {
		handleSubmit,
		register,
		watch,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<UserCredentials>();

	const [watchEmail, watchPasswordHash] = watch(["email", "passwordHash"]);

	useEffect(() => {
		if (watchEmail || watchPasswordHash) {
			clearErrors("passwordHash");
		}
	}, [watchEmail, watchPasswordHash, clearErrors]);

	const handleLogin = async (data: UserCredentials): Promise<void> => {
		const valid = await validateUser(data);

		if (!valid) {
			setError("passwordHash", {
				message: "Invalid credentials. Please try again.",
			});
			setValid(false);
		} else {
			setValid(true);
			clearErrors("passwordHash");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-3 text-center">Login</h2>

				<div className="flex justify-center text-amber-500 h-5 mb-3">
					<p>{errors.passwordHash && errors.passwordHash.message}</p>
					{/*this is just for testing*/}
					{valid && <p className="text-green-500">Credentials correct!</p>}
				</div>

				<form onSubmit={handleSubmit(handleLogin)}>
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
							{...register("email")}
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
							id="passwordHash"
							type="password"
							placeholder="Enter your password"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
							{...register("passwordHash")}
							required
						/>
					</div>
					<div className="flex w-auto pb-2 text-sm text-gray-600 hover:text-blue-400">
						<a href="">Forgot your password?</a>
					</div>
					<div className="flex items-center justify-between">
						<p>
							{"Don't have an account"}
							<span className=" text-blue-800 font-semibold underline pl-1">
								<Link href="/register"> Register</Link>
							</span>
						</p>
						<input
							type="submit"
							className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring"
							value={"Login"}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
