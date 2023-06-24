import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
    BiPaperPlane,
    BiPencil,
    BiLogOut,
    BiUser,
    BiSearch,
    BiHome,
} from "react-icons/bi";
import UserSearchBar from "./UserSearchBar/UserSearchBar";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);
    const [mobileView, setMobileView] = useState<boolean>(false);
    const user = useUser();
    const { signOut } = useClerk();
    const router = useRouter();

    const handleSignOut = () => {
        signOut()
            .then(() => {
                router.push("/").catch((err) => {
                    console.error(err);
                });
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setMobileView(true);
        }
    }, []);

    if (mobileView) {
        return (
            <div className="w-full">
                <header className="border-b-[1px] border-zinc-200 py-4">
                    <div className="flex items-center justify-between gap-2">
                        <div
                            className="flex items-center gap-2 text-xl"
                            role="button"
                            onClick={() => {
                                router.push("/home").catch((err) => {
                                    console.error(err);
                                });
                            }}
                        >
                            <BiPaperPlane></BiPaperPlane>
                            <h1 className="font-bold">paperplane.</h1>
                        </div>
                        <div className="text-xl">
                            <UserSearchBar></UserSearchBar>
                        </div>
                    </div>
                </header>
                <nav className="fixed bottom-0 left-0 flex w-screen items-center justify-center border-t-[1px] border-zinc-200 bg-white py-2">
                    <div className="flex items-center justify-around w-full text-2xl text-zinc-900">
                        <div
                            role="button"
                            onClick={() => {
                                router.push("/home").catch((err) => {
                                    console.error(err);
                                });
                            }}
                            className={
                                router.route.includes("home")
                                    ? "rounded-xl bg-zinc-900 p-[8px] text-white"
                                    : ""
                            }
                        >
                            <BiHome></BiHome>
                        </div>
                        <div role="button" onClick={() => handleSignOut()}>
                            <BiLogOut></BiLogOut>
                        </div>
                        <Image
                            src={user.user?.profileImageUrl ?? ""}
                            alt="profile-image"
                            width={35}
                            height={35}
                            className="transition-opacity border-2 rounded-full duration-250 border-zinc-900 hover:opacity-75"
                            role="button"
                            onClick={() => {
                                router
                                    .push(
                                        `/profile/${user.user?.username ?? ""}`
                                    )
                                    .catch((err) => {
                                        console.error(err);
                                    });
                            }}
                        ></Image>
                    </div>
                </nav>
            </div>
        );
    }

    return (
        <header>
            <div
                className={`${
                    toggleMenu ? "hidden md:block" : "hidden"
                } absolute left-0 top-0 h-screen w-screen bg-white opacity-80`}
                onClick={() => {
                    setToggleMenu(false);
                }}
            ></div>
            <div className="flex flex-col justify-between w-full gap-4 pt-6 md:flex-row md:items-center md:py-6">
                <div
                    className="flex items-center gap-2"
                    role="button"
                    onClick={() => {
                        router.push("/home").catch((err) => {
                            console.error(err);
                        });
                    }}
                >
                    <div className="text-3xl">
                        <BiPaperPlane></BiPaperPlane>
                    </div>
                    <h1 className="text-2xl font-bold">Paperplane.</h1>
                </div>
                {router.route.includes("profile") ? (
                    <></>
                ) : (
                    <div
                        className={`flex items-start justify-between w-full gap-2 md:w-fit md:items-end ${
                            toggleMenu ? "relative" : ""
                        }`}
                    >
                        <div className="z-50 flex flex-row-reverse items-center gap-4 md:flex-row">
                            <div className="flex flex-col items-start md:items-end">
                                <p className="text-md mb-[-4px]">Hello,</p>
                                <h1 className="text-xl font-bold">
                                    {user.user?.fullName}
                                </h1>
                            </div>
                            <Image
                                src={user.user?.profileImageUrl ?? ""}
                                alt="profile-image"
                                width={45}
                                height={45}
                                className="transition-opacity duration-250 rounded-xl hover:opacity-75"
                                role="button"
                                onClick={() => setToggleMenu(!toggleMenu)}
                            ></Image>
                            <UserSearchBar></UserSearchBar>
                        </div>
                        <div
                            className={`right-0 top-0 mt-1 flex w-fit items-center justify-between gap-2 transition-transform duration-500 md:absolute md:top-full md:mt-4 md:flex-col md:items-end ${
                                toggleMenu
                                    ? "md:translate-x-[0]"
                                    : "md:translate-x-[500%]"
                            }`}
                        >
                            {/* Desktop */}
                            <button
                                className="hidden px-4 py-1 text-sm font-medium text-black transition-colors border-2 rounded-md duration-250 border-zinc-900 hover:bg-zinc-700 hover:text-white md:block"
                                onClick={() => {
                                    router
                                        .push(
                                            `/profile/${
                                                user.user?.username ?? ""
                                            }`
                                        )
                                        .catch((err) => {
                                            console.error(err);
                                        });
                                }}
                            >
                                My Profile
                            </button>
                            <button
                                className="hidden px-4 py-1 text-sm font-medium text-black transition-colors border-2 rounded-md duration-250 border-zinc-900 hover:bg-zinc-700 hover:text-white md:block"
                                onClick={() => {
                                    router
                                        .push("/edit-profile")
                                        .catch((err) => {
                                            console.error(err);
                                        });
                                }}
                            >
                                Edit Profile
                            </button>
                            <button
                                className="hidden px-4 py-1 text-sm font-medium text-white transition-colors border-2 rounded-md duration-250 border-zinc-900 bg-zinc-900 hover:bg-zinc-700 md:block"
                                onClick={() => handleSignOut()}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
