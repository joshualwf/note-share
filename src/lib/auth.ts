import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function getUserSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    return decoded; // Returns user data from the token
  } catch (error) {
    return null;
  }
}
