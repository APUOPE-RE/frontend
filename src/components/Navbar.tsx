"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context";
import { handleLogout } from "../app/actions/logout";

export const Navbar: React.FC = (): JSX.Element => {
  const { isAuthenticated, setAuthenticated } = useAppContext();
  const router = useRouter();
  const [currentLink, setCurrentLink] = useState("");

  useEffect(() => {
    const isLoggedin = localStorage.getItem("token") !== null;
    setAuthenticated(isLoggedin);
  }, []);

  const logoutAndRedirect = async () => {
    await handleLogout(setAuthenticated);
    router.push("/login");
  };

  useEffect(() => {
    console.log("currentLink: ", currentLink);
  }, [currentLink]);


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
                <Link href="/previous-quizzes" onClick={() => setCurrentLink("previous-quizzes")} className={`px-3 transition-colors duration-300 h-full flex items-center ${currentLink == "previous-quizzes" ? "border-b-2  border-blue-600" : "hover:bg-blue-100" }`}>Previous Quizzes</Link>
              </li>
              <li className="font-semibold h-full">
                <Link href="/quiz" onClick={() => setCurrentLink("quiz")} className={`px-3 transition-colors duration-300 h-full flex items-center ${currentLink == "quiz" ? "border-b-2  border-blue-600" : "hover:bg-blue-100" }`}>Quiz maker</Link>
              </li>
              <li className="font-semibold h-full">
                <Link href="/chatbot" onClick={() => setCurrentLink("chatbot")} className={`px-3 transition-colors duration-300 h-full flex items-center ${currentLink == "chatbot" ? "border-b-2  border-blue-600" : "hover:bg-blue-100" }`}>Chatbot</Link>
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
                onClick={logoutAndRedirect}
                className="bg-red-500 text-white px-4 py-2 flex rounded-md hover:bg-red-700 active:bg-red-700 focus:outline-none focus:ring"
              >
                LOGOUT
              </button>
            )}
          </div>
        </div>
      </header>
      <div className="w-full bg-white" style={{ height: "12dvh" }}></div>
    </>
  );
};
