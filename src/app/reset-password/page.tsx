"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NewPasswordData } from "../types/types";
import { resetPassword } from "../actions/resetPassword";
import { usePasswordStrength } from "../actions/usePasswordStrength";

export default function ResetPassword() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const {
		handleSubmit,
		register,
		watch,
		setError,
		clearErrors,
		trigger,
		setValue,
		formState: { errors },
	} = useForm<NewPasswordData>();

	const [watchPasswordFirst, watchPasswordSecond] = watch([
		"passwordFirst",
		"passwordSecond",
	]);

	const passwordStrength = usePasswordStrength(watchPasswordFirst || "");

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

	const handleResetPassword = async (
		data: NewPasswordData
	): Promise<void> => {
		if (data.passwordFirst !== watchPasswordSecond) {
			setError("passwordFirst", {
				message: "Passwords don't match!",
			});
		} else {
			const input = {
				...data,
				uuid: token ?? "",
			};
			const response = await resetPassword(input);

			if (!response.success) {
				setError("errors", {
					message: response.data,
				});
			} else {
				clearErrors("errors");
				router.push("/login");
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-3 text-center">
					Reset password
				</h2>
				<form onSubmit={handleSubmit(handleResetPassword)}>
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
							New Password
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
						<div>
							<p className="text-sm">Remember your password?</p>
							<p className="text-blue-800 font-semibold underline">
								<Link href="/login">Login</Link>
							</p>
						</div>
						<input
							type="submit"
							className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring"
							value={"Set New Password"}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
