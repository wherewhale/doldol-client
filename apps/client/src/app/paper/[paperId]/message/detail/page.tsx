"use client";

import { withAuth } from "@/components/HOC/withAuth";
import MessageDetailContainer from "@/containers/paper/message/Detail";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect } from "react";

const MessageDetailPage = ({
  params,
}: {
  params: Promise<{ paperId: string }>;
}) => {
  const router = useRouter();
  const { paperId } = use(params);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const index = searchParams.get("index");

  const isValidType = type === "send" || type === "receive";
  const isValidCursor = !!index;

  // ❗ 비정상 접근일 경우 리디렉션
  useEffect(() => {
    if (!isValidType || !isValidCursor) {
      router.replace(`/paper/${paperId}`);
    }
  }, [isValidType, isValidCursor, router, paperId]);

  return (
    <MessageDetailContainer
      paperId={paperId}
      index={Number(index)}
      messageType={type === "send" ? "SEND" : "RECEIVE"}
    />
  );
};

export default withAuth(MessageDetailPage);
