"use client";

import { Prisma } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

export type User = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    username: true;
    profilePicture: true;
    createdAt: true;
    admin: true;
  };
}>;

type UserContextType = {
  user: User | null;
  fetchUser: () => Promise<void>;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    const res = await fetch("/api/getUser", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
