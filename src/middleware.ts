import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import redis from "@/lib/redis";

export async function middleware(req: NextRequest) {
  const sessionId = req.cookies.get("sessionId")?.value;

  // If no session cookie, redirect to root page
  if (!sessionId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Verify session in Redis
  const userSession = await redis.get(`session:${sessionId}`);

  // If session is invalid or expired, redirect to root page
  if (!userSession) {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("sessionId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0), // Clear cookie immediately
    });
    return response;
  }

  // Continue normally if session is valid
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
