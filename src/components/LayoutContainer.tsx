import { useRouter } from "next/router";
import React, { type ReactNode } from "react";
import Navbar from "./Navbar";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const whitelisted = ["/home", "/edit-profile", "/profile/."];
    if (
        whitelisted.includes(router.pathname) ||
        whitelisted.some(
            (substring) =>
                router.pathname.includes(
                    substring.slice(0, substring.length - 2)
                ) && substring[substring.length - 1] === "."
        )
    ) {
        return (
            <main className="mx-auto min-h-screen px-4 md:px-16">
                <Navbar></Navbar>
                {children}
            </main>
        );
    } else {
        return <>{children}</>;
    }
};

export default LayoutContainer;
