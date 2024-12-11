"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { validateUser } from "../actions/login";
import { useEffect, useState, Suspense } from "react";
import { UserCredentials } from "../types/types";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyAccount } from "../actions/verification";
import { useAppContext } from "@/src/context";

function Login() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [accountVerified, setAccountVerified] = useState(false);
	const [error, setError] = useState<string>("");
	const {
		addAppError,
		setAuthenticated,
		setRegisterSuccess,
		registerSuccess,
		setFetchConversationsData,
	} = useAppContext();

	const {
		handleSubmit,
		register,
		watch,
		clearErrors,
	} = useForm<UserCredentials>();

	const [watchEmail, watchPasswordHash] = watch(["email", "passwordHash"]);

	useEffect(() => {
		const handleToken = async () => {
			if (token !== null) {
				const response = await verifyAccount(token);
				if (response.success) {
					setRegisterSuccess("");
					setAccountVerified(true);
				} else {
					setAccountVerified(false);
					addAppError(response.data)
				}
			}
		};

		handleToken();
	}, [token, setAccountVerified]);

	useEffect(() => {
		if (watchEmail || watchPasswordHash) {
			clearErrors("errors");
		}
	}, [watchEmail, watchPasswordHash, clearErrors]);

	const handleLogin = async (data: UserCredentials): Promise<void> => {
		setError("");
		const response = await validateUser(data);

		if (!response.success) {
			setError(response.data);
		} else {
			localStorage.setItem("token", response.data);
			setAuthenticated(true);
			router.push("/chatbot");
			setFetchConversationsData(true);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			{token !== null && accountVerified && (
				<div className="flex text-m p-5 max-w-md w-full justify-center mb-8 rounded-lg bg-green-200">
					Account verified!
				</div>
			)}
			{registerSuccess !== "" && (
				<div className="flex text-m p-5 max-w-md w-full justify-center mb-8 rounded-lg bg-green-200">
					{registerSuccess}
				</div>
			)}
			<div className="w-full max-w-md p-8 pt-16 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-3 text-center">
					Login
				</h2>
				{error !== "" && (
					<div className="text-center mt-5 mb-5 text-amber-500">
						{error}
					</div>
				)}
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
						<Link href="/forgot-password">
							Forgot your password?
						</Link>
					</div>
					<div className="flex items-center justify-between">
						<p>
							{"Don't have an account "}
							<span className=" text-blue-800 font-semibold underline pl-1">
								<Link href="/register">Register</Link>
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

export default function LoginPageWrapper() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Login />
		</Suspense>
	);
}
