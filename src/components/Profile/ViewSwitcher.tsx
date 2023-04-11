import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ViewSwitcher = ({ slug, view }: { slug: string; view: string }) => {
    const router = useRouter();
    return (
        <>
            <div className="space-between flex w-full border-b-[1px] border-zinc-200">
                <h1
                    className="relative w-full pb-2 text-center text-lg font-medium"
                    role="button"
                    onClick={() => {
                        router
                            .push(`/profile/${slug?.toString() ?? ""}/origami`)
                            .catch((err) => {
                                console.error(err);
                            });
                    }}
                >
                    Origamis
                    {view === "origamis" ? (
                        <>
                            <div className="absolute bottom-[-3px] right-1/2 mx-auto h-[4px] w-[64px] translate-x-1/2 rounded-md bg-zinc-900"></div>
                        </>
                    ) : (
                        <></>
                    )}
                </h1>
                <h1
                    className="relative w-full pb-2 text-center text-lg font-medium"
                    role="button"
                    onClick={() => {
                        router
                            .push(`/profile/${slug?.toString() ?? ""}/folding`)
                            .catch((err) => {
                                console.error(err);
                            });
                    }}
                >
                    Foldings
                    {view === "foldings" ? (
                        <>
                            <div className="absolute bottom-[-3px] right-1/2 mx-auto h-[4px] w-[64px] translate-x-1/2 rounded-md bg-zinc-900"></div>
                        </>
                    ) : (
                        <></>
                    )}
                </h1>
            </div>
        </>
    );
};

export default ViewSwitcher;
