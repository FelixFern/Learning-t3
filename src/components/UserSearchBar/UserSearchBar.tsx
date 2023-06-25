import React from "react";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import { useUserSearchBar } from "./useUserSearchBar";
import { useRouter } from "next/router";

const UserSearchBar = () => {
    const { userList, search, setSearch, isSearching, setIsSearching } =
        useUserSearchBar();
    const router = useRouter();

    return (
        <div>
            <div
                className="hover:opacity-80 cursor-pointer rounded-md border-[0.25px text-white bg-zinc-900 p-2"
                onClick={() => setIsSearching((val) => !val)}
            >
                <BiSearch></BiSearch>
            </div>
            {isSearching ? (
                <div className="absolute top-0 left-0 w-screen h-screen bg-white bg-opacity-80">
                    <div className="flex items-center mt-6">
                        <div className="relative w-11/12 mx-auto my-4">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                value={search}
                                onBlur={() => setIsSearching(false)}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <div className="w-11/12 mx-auto">
                        {userList?.map((user) => (
                            <div
                                key={user.id}
                                className="h-fit gap-3 border-[0.25px] border-zinc-200 bg-white p-4 w-full flex items-center hover:opacity-75"
                                role="button"
                                onClick={() => {
                                    router
                                        .push(
                                            `/profile/${user?.username ?? ""}`
                                        )
                                        .catch((err) => {
                                            console.error(err);
                                        });
                                }}
                            >
                                <Image
                                    src={user?.profileImageUrl ?? ""}
                                    alt="profile-image"
                                    width={40}
                                    className="rounded-xl"
                                    height={40}
                                ></Image>
                                <div className="flex flex-col gap-2">
                                    <h1 className="flex items-center gap-2 font-bold">
                                        {user?.firstName != ""
                                            ? [
                                                  user?.firstName,
                                                  user?.lastName,
                                              ].join(" ")
                                            : "Anonymous"}
                                    </h1>
                                    <span className="text-md mt-[-12px] text-gray-400">
                                        {user?.username
                                            ? `@${user?.username}`
                                            : "@user"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default UserSearchBar;
