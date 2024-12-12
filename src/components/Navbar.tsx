"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppContext } from "../context";
import { handleLogout } from "../app/actions/logout";

export const Navbar: React.FC = (): JSX.Element => {
	const { isAuthenticated, setAuthenticated, setFetchPreviousQuizzesData, setFetchConversationsData } = useAppContext();
	const router = useRouter();
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [currentLink, setCurrentLink] = useState("");

	const isOnPreviousQuizzesPage = pathname === "/previous-quizzes";

	useEffect(() => {
		const isLoggedin = localStorage.getItem("token") !== null;
		setAuthenticated(isLoggedin);
	}, [setAuthenticated]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (imageRef.current && imageRef.current.contains(event.target as Node)) {
				return;
			}
			if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
				return;
			}
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMenuOpen(false);
			}
			if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
				setMobileMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleToggleMenu = () => {
		setMenuOpen(prev => !prev);
		setMobileMenuOpen(prev => !prev);
	};

	const logoutAndRedirect = async () => {
		await handleLogout(setAuthenticated);
		router.push("/login");
	};

	return (
		<>
			<header className="fixed top-0 left-0 w-full">
				<div className="w-full h-20 shadow-xl bg-blue-200 flex justify-between border-b-2 border-blue-400">
					<div className="hidden md:flex items-center h-full px-4">
						{isAuthenticated ? (
							<Link href="/chatbot">
								<Image
									src="/logo.png"
									alt="logo"
									width={205}
									height={75}
									priority={true}
								/>
							</Link>
						) : (
							<Image
								src="/logo.png"
								alt="logo"
								width={205}
								height={75}
								priority={true}
							/>
						)}
					</div>

					<div className="w-full hidden md:flex justify-center">
						{isAuthenticated ? (
							<ul className="flex items-center h-full text-black text-xl">
								<nav className="hidden md:flex space-x-6">

									<li className="font-semibold h-full">
										<Link
											href="/chatbot"
											onClick={() => {
												setCurrentLink("chatbot"),
													setFetchConversationsData(true)
											}}
											className={`px-3 transition-colors duration-300 h-full flex items-center ${currentLink == "chatbot"
												? "border-b-2  border-blue-600"
												: "hover:bg-blue-100"
												}`}
										>
											Chatbot
										</Link>
									</li>
									<li className="font-semibold h-full">
										<Link
											href="/quiz"
											onClick={() => setCurrentLink("quiz")}
											className={`px-3 transition-colors duration-300 h-full flex items-center ${currentLink == "quiz"
												? "border-b-2  border-blue-600"
												: "hover:bg-blue-100"
												}`}
										>
											Quiz maker
										</Link>
									</li>
									<li className="font-semibold h-full">
										<Link
											href="/previous-quizzes"
											onClick={() => {
												setCurrentLink("previous-quizzes"),
													setFetchPreviousQuizzesData(true)
											}}
											className={`px-3 transition-colors duration-300 h-full flex items-center ${currentLink == "previous-quizzes"
												? "border-b-2  border-blue-600"
												: "hover:bg-blue-100"
												}`}
										>
											Previous Quizzes
										</Link>
									</li>
								</nav>
							</ul>
						) : (
							null
						)}

					</div>

					<div className="hidden md:flex items-center ml-auto mr-6 relative">
						<Image
							src="/user_icon.png"
							alt="User Icon"
							width={48}
							height={48}
							className="cursor-pointer"
							ref={imageRef}
							onClick={() => handleToggleMenu()}
						/>

						{menuOpen && (
							<div
								ref={menuRef}
								className="absolute top-full right-0 w-28 bg-white border border border-gray-500 rounded-md z-50"
							>
								{isAuthenticated ? (
									<button
										className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left rounded-md border border-gray-500"
										onClick={() => { logoutAndRedirect(); setMenuOpen(false); }}
									>
										Log out
									</button>
								) : (
									<>
										<Link href="/login"
											className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left rounded-t-md border border-gray-500 "
											onClick={() => setMenuOpen(false)}
										>
											Log in
										</Link>
										<Link href="/register"
											className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left rounded-b-md border border-gray-500 "
											onClick={() => setMenuOpen(false)}
										>
											Sign up
										</Link>
									</>

								)}
							</div>
						)}
					</div>

					{/* Mobile Menu */}
					<div className="md:hidden flex items-center h-full px-4">
						{isOnPreviousQuizzesPage ? (
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								Quiz Results
							</button>
						) : (
							isAuthenticated ? (
								<Link href="/chatbot">
									<Image
										src="/logo.png"
										alt="logo"
										width={205}
										height={75}
										priority={true}
									/>
								</Link>
							) : (
								<Image
									src="/logo.png"
									alt="logo"
									width={205}
									height={75}
									priority={true}
								/>
							))}
					</div>
					<div className="md:hidden items-center ml-auto relative">
						<button
							className="p-4"
							ref={buttonRef}
							onClick={() => { handleToggleMenu(); }}
						>
							<span className="sr-only">Open menu</span>
							<svg
								className="w-10 h-10"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
						{mobileMenuOpen && (
							<div ref={mobileMenuRef}
								className="absolute top-full right-0 w-28 bg-white rounded-md border border-gray-500 z-50 md:hidden"
							>
								{isAuthenticated ? (
									<>
										<Link
											href="/chatbot"
											onClick={() => { setMobileMenuOpen(false); setCurrentLink("chatbot") }}
											className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left rounded-t-md border border-gray-500"
										>
											Chatbot
										</Link>
										<Link
											href="/quiz"
											onClick={() => { setMobileMenuOpen(false); setCurrentLink("quiz") }}
											className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left border border-gray-500"
										>
											Quiz Maker
										</Link>
										<Link
											href="/previous-quizzes"
											onClick={() => { setMobileMenuOpen(false); setCurrentLink("previous-quizzes") }}
											className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left border border-gray-500"
										>
											Previous Quizzes
										</Link>
										<button
											className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left rounded-b-md border border-gray-500"
											onClick={() => {
												logoutAndRedirect();
												setMobileMenuOpen(false);
											}}
										>
											Log out
										</button>
									</>
								) : (
									<>
										<Link
											href="/login"
											onClick={() => setMobileMenuOpen(false)}
											className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left rounded-t-md border border-gray-500"
										>
											Log In
										</Link>
										<Link
											href="/register"
											onClick={() => setMobileMenuOpen(false)}
											className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left rounded-b-md border border-gray-500"
										>
											Sign In
										</Link>
									</>
								)}
							</div>
						)}
					</div>
				</div >
			</header >
			<div className="w-full bg-white" style={{ height: "12dvh" }}></div>
		</>
	);
};
