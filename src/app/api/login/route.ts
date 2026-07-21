import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password, rememberMe } = await request.json();
  const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!apiUrl || !anonKey) {
    return NextResponse.json(
      { message: "Environment variables are missing" },
      { status: 500 },
    );
  }
  const response = await fetch(`${apiUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const result = await response.json();
  if (response.ok && rememberMe) {
    const oneMonth = 60 * 60 * 24 * 30;
    const res = NextResponse.json(result, {
      status: response.status,
    });

    res.cookies.set(
      "supabase_session",
      JSON.stringify({
        access_token: result.access_token,
        refresh_token: result.refresh_token,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: oneMonth,
        sameSite: "lax",
        path: "/",
      },
    );

    return res;
  }

  return NextResponse.json(result, {
    status: response.status,
  });
}
