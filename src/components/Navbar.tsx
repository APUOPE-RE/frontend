"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context";
import { handleLogout } from "../app/actions/logout";

export const Navbar: React.FC = (): JSX.Element => {
	const { isAuthenticated, setAuthenticated } = useAppContext();
	const router = useRouter();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const [currentLink, setCurrentLink] = useState("");

	useEffect(() => {
		const isLoggedin = localStorage.getItem("token") !== null;
		setAuthenticated(isLoggedin);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const logoutAndRedirect = async () => {
		await handleLogout(setAuthenticated);
		router.push("/login");
	};

	return (
		<>
			<header className="fixed top-0 left-0 w-full">
				<div className="w-full h-20 shadow-xl bg-blue-200 flex justify-between border-b-2 border-blue-400">
					<div className="flex items-center h-full px-4">
						<Link href="/chatbot">
							<Image
								src="/logo.png"
								alt="logo"
								width={205}
								height={75}
								priority={true}
							/>
						</Link>
					</div>
					<div>
						<ul className="flex items-center h-full px-4 text-black text-xl">
							<li className="font-semibold h-full">
								<Link
									href="/previous-quizzes"
									onClick={() =>
										setCurrentLink("previous-quizzes")
									}
									className={`px-3 transition-colors duration-300 h-full flex items-center ${
										currentLink == "previous-quizzes"
											? "border-b-2  border-blue-600"
											: "hover:bg-blue-100"
									}`}
								>
									Previous Quizzes
								</Link>
							</li>
							<li className="font-semibold h-full">
								<Link
									href="/quiz"
									onClick={() => setCurrentLink("quiz")}
									className={`px-3 transition-colors duration-300 h-full flex items-center ${
										currentLink == "quiz"
											? "border-b-2  border-blue-600"
											: "hover:bg-blue-100"
									}`}
								>
									Quiz maker
								</Link>
							</li>
							<li className="font-semibold h-full">
								<Link
									href="/chatbot"
									onClick={() => setCurrentLink("chatbot")}
									className={`px-3 transition-colors duration-300 h-full flex items-center ${
										currentLink == "chatbot"
											? "border-b-2  border-blue-600"
											: "hover:bg-blue-100"
									}`}
								>
									Chatbot
								</Link>
							</li>
						</ul>
					</div>
					<div className="flex items-center gap-7 mx-7 relative">
						<Image
							src="/user_icon.png"
							alt="User Icon"
							width={40}
							height={40}
							className="cursor-pointer"
							onClick={() => setMenuOpen((prev) => !prev)}
						/>
						{menuOpen && (
							<div
								ref={menuRef}
								className="absolute top-full right-0 w-28 bg-white shadow-lg rounded-md z-50"
							>
								{!isAuthenticated ? (
									<>
										<Link href="/login">
											<button
												className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left rounded-t-md"
												onClick={() =>
													setMenuOpen(false)
												}
											>
												Log in
											</button>
										</Link>
										<Link href="/register">
											<button
												className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left rounded-b-md"
												onClick={() =>
													setMenuOpen(false)
												}
											>
												Sign up
											</button>
										</Link>
									</>
								) : (
									<button
										className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left rounded-md"
										onClick={() => {
											logoutAndRedirect();
											setMenuOpen(false);
										}}
									>
										Log out
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</header>
			<div className="w-full bg-white" style={{ height: "12dvh" }}></div>
		</>
	);
};
