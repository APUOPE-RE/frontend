"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { registerUser } from "../actions/registration";
import { RegistrationData } from "../types/types";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/src/context/index";

export default function Register() {
	const router = useRouter();
	const { setRegisterSuccess } = useAppContext();
	const {
		handleSubmit,
		register,
		watch,
		setError,
		clearErrors,
		trigger,
		setValue,
		formState: { errors },
	} = useForm<RegistrationData>();

	const [watchEmail, watchPasswordFirst, watchPasswordSecond, watchUsername] =
		watch(["email", "passwordFirst", "passwordSecond", "username"]);

	useEffect(() => {
		if (!watchPasswordFirst) {
			setValue("passwordSecond", "");
		}
	}, [watchPasswordFirst, setValue]);

	useEffect(() => {
		if (watchPasswordFirst || watchPasswordSecond) {
			trigger("passwordFirst");
		}
		clearErrors("passwordFirst");
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
				setRegisterSuccess("Registration successful! Please check your email to verify your account.")
				router.push("/login");
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-3 text-center">
					Register
				</h2>
				<form onSubmit={handleSubmit(handleRegistration)}>
					<div className="mb-4">
						<div className="flex justify-center text-amber-500 h-5 mb-3">
							<p>{errors.errors && errors.errors.message}</p>
						</div>
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
							{...register("username")}
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
							{...register("email")}
							required
						/>
					</div>
					<div className="flex justify-center text-amber-500">
						<p>
							{errors.passwordFirst &&
								errors.passwordFirst.message}
						</p>
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
							{...register("passwordFirst", {
								validate: {
									containsInvalidCharacters: value => !value || /^[a-zA-Z0-9@$!%*?&()#^]*$/.test(value) ||
										"Password contains invalid characters. Only letters, numbers, and @$!%*?&()#^ are allowed.",
									minLength: value => !value || value.length >= 8 || "Password must be at least 8 characters long",
									maxLength: value => !value || value.length <= 20 || "Password cannot exceed 20 characters",
									containLowercase: value => !value || /[a-z]/.test(value) || "Password must include at least one lowercase letter",
									containsUppercase: value => !value || /[A-Z]/.test(value) || "Password must include at least one uppercase letter",
									containsNumber: value => !value || /[0-9]/.test(value) || "Password must include at least one number",
									containsSpecial: value => !value || /[@$!%*?&()#^]/.test(value) || "Password must include at least one special character",
								}
							})}
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
							{...register("passwordSecond")}
							required
						/>
					</div>
					<div className="flex items-center justify-between">
						<p className="">
							{"Already have an account? "}
							<span className="text-blue-800 font-semibold underline pl-1">
								<Link href="/login">Login</Link>
							</span>
						</p>
						<input
							type="submit"
							className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring"
							value={"Register"}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
