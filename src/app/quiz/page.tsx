"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { UserCredentials, validateUser } from "../actions/login";
import { useEffect, useState } from "react";

export default function Quiz() {

	return (
        <div className="flex w-full bg-gray-100 p-3" style={{height: "88dvh"}}>
            <div className="basis-1/4 me-3  bg-white p-3 h-full rounded overflow-auto">
            
                <h3 className="font-bold">This week</h3>

                <div className="flex w-100 h-20 rounded-xl mt-3 p-3 bg-gray-200 shadow-lg">
                    <div className="basis-3/4">
                        <p>Dark patterns</p>
                    </div>
                        <div className="basis-1/4 flex flex-col justify-between">
                            <p className="bg-blue-500 text-center text-white rounded-xl">
                                4/5
                            </p>
                            <p className="text-sm text-gray-500">
                                15/10/2024
                            </p>
                        </div>
                </div>

                <div className="flex w-100 h-20 rounded-xl mt-3 p-3 bg-white shadow-lg">
                    <div className="basis-3/4">
                        <p>Dark patterns</p>
                    </div>
                        <div className="basis-1/4 flex flex-col justify-between">
                            <p className="bg-blue-500 text-center text-white rounded-xl">
                                4/5
                            </p>
                            <p className="text-sm text-gray-500">
                                15/10/2024
                            </p>
                        </div>
                </div>

                <h3 className="font-bold mt-3">This month</h3>

                <div className="flex w-100 h-20 rounded-xl mt-3 p-3 bg-white shadow-lg">
                    <div className="basis-3/4">
                        <p>Dark patterns</p>
                    </div>
                        <div className="basis-1/4 flex flex-col justify-between">
                            <p className="bg-blue-500 text-center text-white rounded-xl">
                                4/5
                            </p>
                            <p className="text-sm text-gray-500">
                                15/10/2024
                            </p>
                        </div>
                </div>

                <div className="flex w-100 h-20 rounded-xl mt-3 p-3 bg-white shadow-lg">
                    <div className="basis-3/4">
                        <p>Dark patterns</p>
                    </div>
                        <div className="basis-1/4 flex flex-col justify-between">
                            <p className="bg-blue-500 text-center text-white rounded-xl">
                                4/5
                            </p>
                            <p className="text-sm text-gray-500">
                                15/10/2024
                            </p>
                        </div>
                </div>
                <h3 className="font-bold">Previous</h3>

                <div className="flex w-100 h-20 rounded-xl mt-3 p-3 bg-white shadow-lg">
                    <div className="basis-3/4">
                        <p>Dark patterns</p>
                    </div>
                        <div className="basis-1/4 flex flex-col justify-between">
                            <p className="bg-blue-500 text-center text-white rounded-xl">
                                4/5
                            </p>
                            <p className="text-sm text-gray-500">
                                15/10/2024
                            </p>
                        </div>
                </div>

                <div className="flex w-100 h-20 rounded-xl mt-3 p-3 bg-white shadow-lg">
                    <div className="basis-3/4">
                        <p>Dark patterns</p>
                    </div>
                        <div className="basis-1/4 flex flex-col justify-between">
                            <p className="bg-blue-500 text-center text-white rounded-xl">
                                4/5
                            </p>
                            <p className="text-sm text-gray-500">
                                15/10/2024
                            </p>
                        </div>
                </div>
            </div>


            <div className="basis-3/4 flex flex-col bg-white p-3 h-full rounded">
                <div className="basis-2/12 flex flex-row justify-between" style={{height: "10%"}}>
                    <div className="flex flex-col justify-center">
                        <p>15/10/2024</p>
                        <p>15:34</p>
                    </div>
                    <div className="flex items-center font-bold text-2xl">
                        <p>Dark patterns</p>
                    </div>
                    <div className="flex items-center">
                        <p>Score: <span className="bg-blue-500 text-white rounded-md px-2 py-1">4/5</span></p>
                    </div>
                    

                </div>
                <div className="basis-10/12" style={{height: "90%"}}>
                

                    <div className="w-full h-full p-4 rounded-xl bg-gray-200">
                        <div className="w-full h-full rounded-xl border p-4 border-gray-400 bg-white">
                            <div className="w-full h-full overflow-auto px-3">
                                <div className="flex justify-between mb-2">
                                    <p className="text-gray-500">Question 1 topic</p>
                                    <p className="text-gray-500">1/1</p>

                                </div>
                                <p className="mb-2"><strong>1. Question number 1?</strong></p>
                                <div className="flex border border-lime-500 p-2 mb-2 rounded-xl ">
                                    <div className="basis-11/12">
                                        <strong>Answer:</strong>
                                        <p>This is a test answer for open question number 1.</p>
                                    </div>
                                    <div className="basis-1/12">
                                        <p className="text-lime-500">Correct!</p>
                                    </div>
                                </div>
                                <div className="border border-gray-300 p-2 rounded-xl ">
                                    <strong>AI feedback:</strong>
                                    <p>This is some feedback from the AI.</p>
                                </div>

                                <hr className="h-px my-8 bg-gray-200 border-0"></hr>
                                
                                <div className="flex justify-between mb-2">
                                    <p className="text-gray-500">Question 2 topic</p>
                                    <p className="text-gray-500">0/1</p>

                                </div>
                                <p className="mb-2"><strong>2. Question number 2?</strong></p>
                                <div className="flex items-center mb-2">
                                    <input disabled type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>
                                    <label className="ms-2 text-gray-900">Option 1</label>
                                </div>
                                <div className="flex items-center mb-2">
                                    <input disabled type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>
                                    <label className="ms-2 text-gray-900">Option 2 <span className="ms-3 text-gray-400">Correct answer</span></label>
                                </div>
                                <div className="flex items-center mb-2">
                                    <input checked type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>
                                    <label className="ms-2 text-gray-900">Option 3</label>
                                </div>
                                <div className="border border-gray-300 p-2 rounded-xl ">
                                    <strong>AI feedback:</strong>
                                    <p>This is some feedback from the AI.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
	);
}
