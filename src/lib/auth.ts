import { cookies } from "next/headers";
import redis from "./redis";

export async function getUserSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) return null;

  const userSession = await redis.get(`session:${sessionId}`);
  return userSession ? JSON.parse(userSession) : null;
}

export async function createSession(sessionId: string, userData: object) {
  await redis.set(`session:${sessionId}`, JSON.stringify(userData), "EX", 60 * 60 * 24 * 7); // 7 days expiration
}

export async function deleteSession(sessionId: string) {
  await redis.del(`session:${sessionId}`);
}
