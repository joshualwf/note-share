import { NextResponse } from "next/server";
import { google } from "googleapis";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/auth";
import { cookies } from "next/headers";

/* OAuth Procedure
1. Exchanging the code for an access token
2. Getting user profile data
3. Creating or finding the user in your database
4. Issuing a custom JWT
5. Setting the JWT as a cookie
6. Redirecting the user back into your app 
*/

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ message: "Missing code" }, { status: 400 });
  }

  const { tokens } = await oauth2Client.getToken(code); // exchange code for access
  oauth2Client.setCredentials(tokens); // authenticates OAuth2 client to make authenticated API calls

  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  const { data: profile } = await oauth2.userinfo.get(); // calls Google’s user info API to get the user’s info

  if (!profile.email) {
    return NextResponse.json(
      { message: "Google account has no email" },
      { status: 400 }
    );
  }

  // Check or create user in DB
  let user = await prisma.user.findUnique({
    where: { email: profile.email },
  });

  // Generate random Dicebear avatar URL
  const seed = crypto.randomUUID();
  const randomGeneratedProfilePicUrl = `https://api.dicebear.com/9.x/micah/svg?seed=${seed}&scale=100&radius=50&backgroundColor=ebebec&mouth=laughing,smile`;

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: profile.email,
        username: profile.name || null,
        passwordHash: "", // no password for Google users
        profilePicture: randomGeneratedProfilePicUrl,
      },
    });
  }

  // Create JWT
  const { token, expiresAt } = await createSessionToken(String(user.id));

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });

  // Redirect to app home
  return NextResponse.redirect(new URL("/authcomplete", req.url));
}
