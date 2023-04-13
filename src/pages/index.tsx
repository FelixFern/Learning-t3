/* eslint-disable react-hooks/exhaustive-deps */
import { SignIn, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
    const user = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user.isSignedIn && user.isLoaded) {
            if (user.user.username) {
                router.push("/home").catch((err) => {
                    console.error(err);
                });
            } else {
                router.push("/edit-profile").catch((err) => {
                    console.error(err);
                });
            }
        }
    }, [user]);

    return (
        <div className="min-h-screen w-screen">
            <Head>
                <title>Paperplane | Login</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex h-screen w-screen items-center justify-center bg-neutral-200">
                {user.isSignedIn ? (
                    <div>
                        <h2 className="text-xl font-bold">
                            Signed In Successfully
                        </h2>
                    </div>
                ) : (
                    <SignIn></SignIn>
                )}
            </main>
        </div>
    );
};

export default Home;
