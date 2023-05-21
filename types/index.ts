import { blog, User } from "@prisma/client"

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}

export type safeBlogs = Omit<blog, "createdAt"> & { createdAt: string };