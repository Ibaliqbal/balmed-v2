"use client";
import instance from "@/libs/axios/instance";
import { GetUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

type UserContextType = {
  user: GetUser | null;
  isLoading: boolean;
};

const userContext = React.createContext<UserContextType>({
  user: null,
  isLoading: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user-login"],
    queryFn: async () => (await instance.get("/api/users/login")).data?.user,
    staleTime: Infinity,
    enabled: !!data,
    refetchInterval: 60 * 60 * 1000,
  });
  return (
    <userContext.Provider value={{ user, isLoading }}>
      {children}
    </userContext.Provider>
  );
};

export const useGetUserLogin = () => {
  const { user, isLoading } = useContext(userContext);

  return { user, isLoading };
};
