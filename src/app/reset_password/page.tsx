"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { verifyEmail } from "../actions/reset_password";
import { EmailforPassReset } from "../types/types";

export default function ResetPassword() {
	const {
		handleSubmit,
		register,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm<EmailforPassReset>();

	const [watchEmail] = watch(["email"]);

	useEffect(() => {
		if (watchEmail) {
			clearErrors("errors");
		}
	}, [watchEmail]);

	const handleResetPass = async (data: EmailforPassReset): Promise<void> => {
		await verifyEmail(data);
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-3 text-center">
					Reset Password
				</h2>
				<form onSubmit={handleSubmit(handleResetPass)}>
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
							className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-indigo-500`}
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[A-Za-z0-9][A-Za-z0-9_.+-]*@[A-Za-z0-9-]+(\.[A-Za-z]{2,})+$/,
									message: "Invalid email format"
								}
							})}
							required
						/>
						<p className="block text-gray-700 text-xs mt-4">
							{"If the email address is associated with an account, you will receive an email with instructions to reset your password."}
						</p>
						<p className="block text-gray-700 text-xs mt-1">
							{"If you do not receive an email, it may be because the email address is not registered."}
						</p>
					</div>

					<div className="flex items-center justify-between">
						<p className="">
							{"Back to the login page "}
							<span className="text-blue-800 font-semibold underline pl-1">
								<Link href="/login">Login</Link>
							</span>
						</p>
						<input
							type="submit"
							className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring"
							value={"Send email"}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
