import React, { type ReactNode } from "react";
import Navbar from "./Navbar";

const LayoutContainer = ({ children }: { children: ReactNode }) => {
    return (
        <main className="mx-auto min-h-screen px-4 md:px-16">
            <Navbar></Navbar>
            {children}
        </main>
    );
};

export default LayoutContainer;
