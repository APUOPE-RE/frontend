"use client"
import Link from "next/link";
import { FormEvent, useState } from "react";

const login: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPasswordHash] = useState<string>(""); // temporary use "setPasswordHash"

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, passwordHash: password }), // temporary use "pssswordHash: "
      });

      if (!response.ok) {
        alert("Unexpected error occurred.");
      } else {
        const validUser = await response.json();
        if (validUser) {
          alert("Login successful!");
          window.location.href = '/'; // TBD
        } else {
          alert("Invalid email or password.");
        }
      }

    } catch (error) {
      console.error(error);
      alert("Network error occurred.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPasswordHash(e.target.value)} // temporary use "setPasswordHash"
              required
            />
          </div>
          <div className="flex w-auto pb-2 text-sm text-gray-600 hover:text-blue-400">
            <a href="">Forgot your password?</a>
          </div>
          <div className="flex items-center justify-between">
            <p>
              don't have accout?
              <span className=" text-blue-800 font-semibold underline pl-1">
                <Link href="/register"> Register</Link>
              </span>
            </p>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;
