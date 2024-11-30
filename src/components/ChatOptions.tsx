"use client";
import {
  Dialog,
  DialogPanel,
  Input,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

export default function ChatOptions({ conversation }: any) {
  const [dialogWindow, setDialogWindow] = useState<string | null>(null);
  const [chatTitle, setChatTitle] = useState<string>("Conversation title 1");

  const { id } = conversation;
  const token = localStorage.getItem("token");

  const handleTitleChange = () => {
    const changeTitle = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/updateConversationTitle/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ newTitle: chatTitle }),
        }
      );

      console.log("CHANGE TITLE RESPONSE: ", response);
    };

    changeTitle();
  };

  const handleDeleteChat = () => {
    const deleteConversation = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deleteConversation/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      console.log("DELETE CHAT RESPONSE: ", response);
    };

    deleteConversation();
  };

  return (
    <>
      <Popover className="relative">
        <PopoverButton className="flex rounded-full items-center">
          <FiMoreHorizontal size={26} />
        </PopoverButton>
        <PopoverPanel
          anchor="bottom start"
          className="flex flex-col bg-white rounded-t-md rounded-b-md min-w-[300px] absolute z-10 shadow-lg"
        >
          <button
            onClick={() => setDialogWindow("change-title")}
            className="flex items-center px-4 py-4 hover:bg-background rounded-t-md text-left hover:bg-slate-200"
          >
            <FiEdit3 size={18} className="mr-2" /> Change title
          </button>
          <button
            onClick={() => setDialogWindow("delete-chat")}
            className="flex items-center px-4 py-4 hover:bg-background rounded-b-md text-left text-red-500 hover:bg-slate-200"
          >
            <FiTrash2 size={18} className="mr-2" /> Delete chat
          </button>
        </PopoverPanel>
      </Popover>

      <Dialog
        open={dialogWindow !== null}
        as="div"
        className="relative z-100 focus:outline-none"
        onClose={() => setDialogWindow(null)}
      >
        <div className="fixed inset-0 z-100 w-screen overflow-y-auto bg-slate-600 bg-opacity-40">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="rounded-xl w-[450px] bg-white p-6"
            >
              {/* Change title */}
              {dialogWindow === "change-title" && (
                <>
                  <h2 className="text-2xl">Change title</h2>

                  <p className="mt-4 text-lg">
                    Introduce a new title for this <strong>{chatTitle}</strong>:
                  </p>

                  <Input
                    type="text"
                    value={chatTitle}
                    onChange={(e: any) => setChatTitle(e.target.value)}
                    className="mt-4 border w-full border-gray-500 rounded-lg py-2 px-3 text-lg"
                  />

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setDialogWindow(null)}
                      className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleTitleChange()}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md"
                    >
                      Save
                    </button>
                  </div>
                </>
              )}

              {/* Delete chat */}
              {dialogWindow === "delete-chat" && (
                <>
                  <h2 className="text-2xl">Are you sure?</h2>
                  <p className="mt-2">
                    Are you sure you want to delete this chat?
                  </p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setDialogWindow(null)}
                      className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteChat()}
                      className="bg-red-600 text-white px-6 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
