"use client";

import { withAuth } from "@/components/HOC/withAuth";
import { useMessageForm } from "@/hooks/form/useMessageForm";
import {
  getMessageDetail,
  onPatchMessage,
  postMessage,
} from "@/services/message";
import { ErrorDTO } from "@/types/error";
import { CreateMessageRequest } from "@/types/message";
import { HELPER_MESSAGES } from "@libs/utils/message";
import { useMutation } from "@tanstack/react-query";
import { Notify } from "@ui/components";
import { AxiosError, isAxiosError } from "axios";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

type MessageEditStage =
  | "selectPerson"
  | "editMessage"
  | "checkMessage"
  | "complete";

const Content = {
  selectPerson: dynamic(
    () => import("@/containers/paper/message/SelectPerson"),
    {
      ssr: false,
      loading: () => <div>Loading...</div>, // 스켈레톤 대체
    },
  ),
  editMessage: dynamic(() => import("@/containers/paper/message/Edit"), {
    ssr: false,
    loading: () => <div>Loading...</div>, // 스켈레톤 대체
  }),
  checkMessage: dynamic(() => import("@/containers/paper/message/Check"), {
    ssr: false,
    loading: () => <div>Loading...</div>, // 스켈레톤 대체
  }),
  complete: dynamic(() => import("@/containers/paper/message/Complete"), {
    ssr: false,
    loading: () => <div>Loading...</div>, // 스켈레톤 대체
  }),
};

const MessageEditPage = ({
  params,
}: {
  params: Promise<{ paperId: string }>;
}) => {
  const { paperId } = use(params);
  const searchParams = useSearchParams();
  const messageId = searchParams.get("messageId");
  const router = useRouter();
  const [stage, setStage] = useState<MessageEditStage>("selectPerson");
  const [userName, setUserName] = useState<string | null>(null);

  const { setValue, register, watch, errors } = useMessageForm();

  const { mutate: onGetMessageDetailApi } = useMutation({
    mutationFn: (messageId: number) => {
      // 메시지 상세 조회 API 호출
      return getMessageDetail(messageId);
    },
    mutationKey: ["getMessageDetail", messageId],
    onSuccess: (res) => {
      if (res) {
        setValue("from", res.data.fromName);
        setValue("backgroundColor", res.data.backgroundColor);
        setValue("content", res.data.content);
        setValue("fontStyle", res.data.fontStyle);
      }
    },
  });

  const { mutate: onPatchMessageApi } = useMutation({
    mutationFn: (messageId: number) => {
      // 메시지 상세 조회 API 호출
      return onPatchMessage({
        messageId: messageId,
        fontStyle: watch("fontStyle"),
        backgroundColor: watch("backgroundColor"),
        content: watch("content"),
        fromName: watch("from"),
      });
    },
    mutationKey: ["patchMessage", messageId],
    onSuccess: (res) => {
      Notify.success(HELPER_MESSAGES.messageUpdateSuccess);
      router.push(`/paper/${paperId}`);
    },
  });

  const {
    mutate: onPostMessageApi,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: CreateMessageRequest) => {
      return postMessage(data);
    },
    mutationKey: ["postMessage", watch("paperId"), watch("receiverId")],
    onSuccess: (res) => {
      if (res) {
        Notify.success(HELPER_MESSAGES.createMessageSuccess);
        setStage("complete");
      }
    },
    onError: (error: AxiosError) => {
      if (isAxiosError<ErrorDTO>(error)) {
        Notify.error(error.response?.data.message);
      }
    },
  });

  useEffect(() => {
    if (messageId) {
      // 수정 모드
      onGetMessageDetailApi(Number(messageId));
      setStage("editMessage");
    }
  }, [messageId]);

  const onNext = (userId?: string, userName?: string) => {
    switch (stage) {
      case "selectPerson":
        if (userId) {
          setValue("receiverId", Number(userId));
          setStage("editMessage");
        }
        if (userName) {
          setUserName(userName);
        }
        break;
      case "editMessage":
        if (errors.content) {
          Notify.error(errors.content.message);
          return;
        }
        if (errors.from) {
          Notify.error(errors.from.message);
          return;
        }
        if (messageId) {
          onPatchMessageApi(Number(messageId));
        }
        setStage("checkMessage");
        break;
      case "checkMessage":
        onPostMessageApi({
          paperId: Number(paperId),
          receiverId: Number(watch("receiverId")),
          content: watch("content"),
          from: watch("from"),
          fontStyle: watch("fontStyle"),
          backgroundColor: watch("backgroundColor"),
        });

        break;
    }
  };

  return (
    <div className="px-6 pb-10">
      {stage === "selectPerson" && (
        <Content.selectPerson paperId={paperId} onNext={onNext} />
      )}
      {stage === "editMessage" && (
        <Content.editMessage
          register={register}
          watch={watch}
          setValue={setValue}
          onNext={onNext}
        />
      )}
      {stage === "checkMessage" && userName && (
        <Content.checkMessage
          watch={watch}
          userName={userName}
          onNext={onNext}
          isLoading={isPending || isSuccess}
        />
      )}
      {stage === "complete" && userName && (
        <Content.complete paperId={paperId} userName={userName} />
      )}
    </div>
  );
};

export default withAuth(MessageEditPage);
