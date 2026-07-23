import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!apiUrl || !anonKey) {
    return NextResponse.json(
      {
        message: "Environment variables are missing",
      },
      {
        status: 500,
      },
    );
  }

  const cookieStore = await cookies();

  const session = cookieStore.get("supabase_session");

  if (!session) {
    return NextResponse.json(
      {
        message: "No session found",
      },
      {
        status: 401,
      },
    );
  }

  const { access_token } = JSON.parse(session.value);

  const response = await fetch(`${apiUrl}/auth/v1/user`, {
    method: "GET",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });

  const user = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        message: "Failed to get user",
      },
      {
        status: response.status,
      },
    );
  }

  return NextResponse.json(user);
}
