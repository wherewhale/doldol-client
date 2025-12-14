"use client";

import { setTokens } from "@/utils/token";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const SocialLoginContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      setTokens({ accessToken, refreshToken });
      router.replace("/");
    }
  }, [searchParams, router]);

  return (
    <>
      소셜 로그인을 성공했습니다. <br />
    </>
  );
};

const SocialLoginSuccessPage = () => {
  return (
    <Suspense fallback={<div>페이지 로딩 중...</div>}>
      <SocialLoginContent />
    </Suspense>
  );
};

export default SocialLoginSuccessPage;
