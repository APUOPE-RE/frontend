"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context";
import { handleLogout } from "../app/actions/logout";

export const Navbar: React.FC = (): JSX.Element => {
	const { isAuthenticated, setAuthenticated } = useAppContext();
	const router = useRouter();

	useEffect(() => {
		const isLoggedin = localStorage.getItem("token") !== null;
		setAuthenticated(isLoggedin);
	}, []);

	return (
		<>
			<header className="fixed top-0 left-0 w-full">
				<div className="w-full h-20 shadow-xl bg-blue-200 flex justify-between border-b-2 border-blue-400">
					<div className="flex items-center h-full px-4">
						<Link href="/">
							<Image src="/logo.png" alt="logo" width={205} height={75} priority={true} />
						</Link>
					</div>
					<div>
						<ul className="flex items-center h-full px-4 gap-5 text-black text-xl">
							<li className="font-semibold">
                <Link href="/quiz">
									Quiz maker
								</Link>
              </li>
							<li className="font-semibold">
								<Link href="/chatbot">
									Chatbot
								</Link>
							</li>
						</ul>
					</div>
					<div className="flex items-center gap-7 mx-7">
						{!isAuthenticated ? (
							<>
								<Link href="/login">
									<button className="bg-blue-500 text-white px-4 py-2 flex rounded-md hover:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring">
										LOG IN
									</button>
								</Link>

								<Link href="/register">
									<button className="bg-blue-500 text-white px-4 py-2 flex rounded-md hover:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring">
										SIGN UP
									</button>
								</Link>
							</>
						) : (
							<button
								onClick={() =>
									handleLogout(setAuthenticated, router)
								}
								className="bg-red-500 text-white px-4 py-2 flex rounded-md hover:bg-red-700 active:bg-red-700 focus:outline-none focus:ring"
							>
								LOGOUT
							</button>
						)}
					</div>
				</div>
			</header>
      <div className="w-full bg-blue-200" style={{height: "12dvh"}}>

      </div>
		</>
	);
};