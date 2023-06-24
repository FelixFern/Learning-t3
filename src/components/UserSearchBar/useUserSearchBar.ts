import type { User } from "@clerk/nextjs/dist/api";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export const useUserSearchBar = () => {
    const [userList, setUserList] = useState<User[]>();

    const [isSearching, setIsSearching] = useState(false);
    const [search, setSearch] = useState("");

    const { data, isLoading } = api.profile.getAllUsers.useQuery();

    useEffect(() => {
        const temp = data?.filter((user) => {
            if (search !== "") {
                return user.username?.includes(search);
            }
        });
        setUserList(temp);
    }, [search]);

    return {
        userList,
        search,
        setSearch,
        isSearching,
        setIsSearching,
    };
};
