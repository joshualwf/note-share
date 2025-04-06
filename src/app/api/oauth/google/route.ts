import { NextResponse } from "next/server";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI! // where Google sends the user after login, tentatively -> http://localhost:3000/api/oauth/google/callback
);

export async function GET() {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });

  return NextResponse.redirect(url); // sends user directly to Google's login page, once authenticated, Google redirects to callback URI.
}
