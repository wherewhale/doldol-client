"use client";

import React, { Suspense, useState } from "react";

import dynamic from "next/dynamic";
import { RegisterSocialForm } from "@/interface/auth/register.interface";
import { withNoAuth } from "@/components/HOC/withNoAuth";
import { useSearchParams } from "next/navigation";

type RegisterStage = "register" | "checkCode" | "complete";

const Content = {
  register: dynamic(() => import("@/containers/auth/register/SocialRegister"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }),
  checkCode: dynamic(() => import("@/containers/auth/CheckEmailCode"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }),
  complete: dynamic(() => import("@/containers/auth/register/Complete"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }),
};

const SocialRegisterContent = () => {
  const [stage, setStage] = useState<RegisterStage>("register");
  const [userData, setUserData] = useState<RegisterSocialForm | undefined>(
    undefined,
  );

  const searchParams = useSearchParams();
  const socialId = searchParams.get("socialId");
  const socialType = searchParams.get("socialType");

  const onNext = (data?: RegisterSocialForm) => {
    if (data) {
      setUserData(data);
    }

    if (stage === "register") {
      console.log("Register Data:", data);
      setStage("checkCode");
    } else if (stage === "checkCode") {
      setStage("complete");
    }
  };

  return (
    <>
      {stage === "register" && socialId && socialType && (
        <Content.register
          onNext={onNext}
          socialId={socialId}
          socialType={socialType}
        />
      )}
      {stage === "checkCode" && (
        <Content.checkCode onNext={onNext} userData={userData} />
      )}
      {stage === "complete" && userData && (
        <Content.complete
          isSocial
          userData={{
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            socialId: userData.socialId,
            socialType: userData.socialType,
          }}
        />
      )}
    </>
  );
};

const AuthSocialRegisterPage = () => {
  return (
    <Suspense fallback={<div>페이지 로딩 중...</div>}>
      <SocialRegisterContent />
    </Suspense>
  );
};

// 3. HOC는 최상위 컴포넌트에 적용
export default withNoAuth(AuthSocialRegisterPage);
