"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

export default function ChatOptions() {
  return (
    <Popover className="relative">
      <PopoverButton
        // onMouseEnter={() => setIsOpen(true)}
        // onMouseLeave={() => setIsOpen(false)}
        className="rounded-full"
      >
        <FiMoreHorizontal size={24} />
      </PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        className="flex flex-col bg-white rounded-t-md rounded-b-md min-w-[300px] absolute z-10 shadow-lg"
      >
        <button
          onClick={() => console.log("Change title")}
          className="flex items-center px-4 py-2 hover:bg-background rounded-t-md text-left hover:bg-slate-200"
        >
          <FiEdit3 size={18} className="mr-2" /> Change title
        </button>
        <button
          onClick={() => console.log("Send request to server to delete chat")}
          className="flex items-center px-4 py-2 hover:bg-background rounded-b-md text-left text-red-500 hover:bg-slate-200"
        >
          <FiTrash2 size={18} className="mr-2" /> Delete chat
        </button>
      </PopoverPanel>
    </Popover>
  );
}
