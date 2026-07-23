"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RecoveryRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      router.replace("/login");
      return;
    }

    const params = new URLSearchParams(hash.substring(1));
    const type = params.get("type");
    const accessToken = params.get("access_token");

    if (type === "recovery" && accessToken) {
      router.replace(
        `/reset-password?access_token=${encodeURIComponent(accessToken)}`,
      );
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
};

export default RecoveryRedirect;
