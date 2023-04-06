import { type AppType } from "next/app";
import { type Session } from "next-auth";

import { api } from "~/utils/api";
import { DM_Sans } from "next/font/google";

import "~/styles/globals.css";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/router";

const dm_sans = DM_Sans({
    weight: ["400", "500", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps,
}) => {
    return (
        <main className={dm_sans.className}>
            <ClerkProvider {...pageProps}>
                <Component {...pageProps} />
            </ClerkProvider>
        </main>
    );
};

export default api.withTRPC(MyApp);
