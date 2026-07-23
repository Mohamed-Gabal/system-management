export async function getUser() {
  try {
    const response = await fetch("/api/auth/user", {
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        message: result.message || "Failed to get user",
      };
    }

    return {
      ok: true,
      data: result,
    };
  } catch {
    return {
      ok: false,
      message: "Unable to connect",
    };
  }
}
