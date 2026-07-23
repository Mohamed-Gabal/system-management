import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
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
        message: "User is not authenticated.",
      },
      {
        status: 401,
      },
    );
  }

  const { access_token } = JSON.parse(session.value);

  const response = await fetch(`${apiUrl}/auth/v1/logout`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  }

  cookieStore.delete("supabase_session");

  return NextResponse.json(
    {
      message: "Logged out successfully.",
    },
    {
      status: 200,
    },
  );
}
