"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { setNewPassword } from "../actions/reset_password";
import { useRouter, useSearchParams } from "next/navigation";
import { NewPasswordData } from "../types/types";
import { resetPassword } from "../actions/resetPassword";

export default function SetNewPassword() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const {
		handleSubmit,
		register,
		watch,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<NewPasswordData>();

	const [watchUuid, watchPasswordFirst, watchPasswordSecond] =
		watch(["uuid", "passwordFirst", "passwordSecond"]);

	useEffect(() => {
		if (watchPasswordFirst || watchPasswordSecond) {
			clearErrors("passwordFirst");
		}
	}, [watchPasswordFirst, watchPasswordSecond, clearErrors]);

	const handleSetNewPass = async (data: NewPasswordData): Promise<void> => {
		if (data.passwordFirst !== watchPasswordSecond) {
			setError("passwordFirst", {
				message: "Passwords don't match!",
			});
		} else {
			const input = {
				...data,
				uuid: token ?? "",
			}
			const response = await resetPassword(input);

			if (!response.success) {
				setError("errors", {
					message: response.data,
				});
			} else {
				clearErrors("errors");
				router.push("/login")
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-3 text-center">
					Set New Password
				</h2>
				<form onSubmit={handleSubmit(handleSetNewPass)}>
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
							{...register("passwordFirst")}
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
						<p className="text-sm">
							{"Remember your password? "}
							<br/>
							<span className="text-blue-800 font-semibold underline">
								<Link href="/login">Login</Link>
							</span>
						</p>
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
