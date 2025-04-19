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
  isDesktop: boolean;
  hasContributed: boolean;
  fetchContributionStatus: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [hasContributed, setHasContributed] = useState(false);

  const fetchUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getUser`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      setLoading(false);
    }
  };

  const fetchContributionStatus = async () => {
    if (!user) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/getContributedStatus?userId=${user.id}`
      );
      const data = await res.json();
      setHasContributed(data.hasContributed);
    } catch (err) {
      console.error("Failed to fetch contribution status", err);
    }
  };

  useEffect(() => {
    fetchUser();
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchContributionStatus();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        fetchUser,
        loading,
        isDesktop,
        hasContributed,
        fetchContributionStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
