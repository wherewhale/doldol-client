"use client";

import { Button, Typography } from "@ui/components";

import Image from "next/image";
import { PlusLine } from "@icons/PlusLine";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getPartyComments } from "@/services/party";
import { CommentCard } from "@/components/party/comment/Card";
import { useModal } from "@/hooks/useModal";
import { CommentCreateModal } from "./CreateModal";
import { CommentDetailModal } from "./DetailModal";

type ModalType = "create" | "detail" | null;

interface Props {
  code: string;
}

const CommentListContainer = ({ code }: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const { isOpened, onOpen, onClose } = useModal();
  const [focusedComment, setFocusedComment] = useState<{
    author: string;
    content: string;
  } | null>(null);

  const openModal = (
    type: ModalType,
    comment?: { author: string; content: string },
  ) => {
    setModalType(type);

    if (type === "detail") {
      if (comment) {
        setFocusedComment(comment);
      }
      onOpen();
    }

    onOpen();
  };

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["commentList", code],
    queryFn: ({ pageParam = 0 }) =>
      getPartyComments({
        cursorId: pageParam === 0 ? null : pageParam,
        size: 12,
        inviteCode: code,
      }).then((res) => {
        return res.data;
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
      return undefined;
    },
    retry: false,
  });

  // IntersectionObserver로 마지막 요소 감지
  useEffect(() => {
    if (
      !observerRef.current ||
      !hasNextPage ||
      isFetchingNextPage ||
      isFetching
    )
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const comments = data?.pages.flatMap((comment) => comment.data) ?? [];

  return (
    <>
      <div className="flex justify-between mt-6">
        <Button
          variant={"outlined"}
          size={"medium"}
          icon={{ DefaultComponent: PlusLine }}
          className="ml-auto"
          onClick={() => openModal("create")}
        >
          한 마디 남기기
        </Button>
      </div>

      <div className="grid grid-cols-3">
        <div ref={observerRef} className="h-10" />
      </div>

      {comments.length > 0 && (
        <Typography variant={"b16"} className="mt-6">
          총 <b>{comments.length}개</b>의 댓글이 있어요!
        </Typography>
      )}

      {comments.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {comments.map((comment, index) => (
            <li
              className="cursor-pointer"
              key={comment.commentId}
              onClick={() =>
                openModal("detail", {
                  author: comment.author,
                  content: comment.content,
                })
              }
            >
              <CommentCard data={comment} isOdd={index % 2 === 0} />
            </li>
          ))}
          <div ref={observerRef} className="h-10" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <Image
            src="/assets/images/empty.png"
            alt="빈 롤링페이퍼 이미지"
            width={80}
            height={80}
            className="mb-4"
          />
          <Typography variant={"b20-medium"} className="mt-6 text-center">
            아직 친구들의
            <br />한 마디가 없다 돌돌..
          </Typography>
        </div>
      )}

      {modalType === "create" && (
        <CommentCreateModal
          code={code}
          isOpen={isOpened}
          onClose={onClose}
          refetchComments={refetch}
        />
      )}
      {modalType === "detail" && (
        <CommentDetailModal
          isOpen={isOpened}
          onClose={onClose}
          author={focusedComment?.author || ""}
          content={focusedComment?.content || ""}
        />
      )}
    </>
  );
};

export default CommentListContainer;
