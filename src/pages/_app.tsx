import { type AppType } from "next/app";
import { type Session } from "next-auth";

import { api } from "~/utils/api";
import { DM_Sans } from "next/font/google";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutContainer from "~/components/LayoutContainer";

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
                <LayoutContainer>
                    <Component {...pageProps} />
                </LayoutContainer>
            </ClerkProvider>
        </main>
    );
};

export default api.withTRPC(MyApp);
