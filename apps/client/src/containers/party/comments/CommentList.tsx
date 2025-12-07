"use client";

import { Button, Typography } from "@ui/components";

import Image from "next/image";
import { PlusLine } from "@icons/PlusLine";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { getPartyComments } from "@/services/party";
import { CommentCard } from "@/components/party/comment/Card";

interface Props {
  code: string;
}

const CommentListContainer = ({ code }: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

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
        // cursorId: pageParam === 0 ? null : pageParam,
        // size: 10,
        // sortDirection: PaperListSort.LATEST,
        // TODO: code로 변경
        code: "4",
      }).then((res) => {
        return res.data;
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      //   return lastPage.rollingPaper.hasNext
      //     ? lastPage.rollingPaper.nextCursor
      //     : undefined;
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

  const papers = data?.pages.flatMap((page) => page) ?? [];
  //   const paperCount = data?.pages[0].paperCount ?? 0;
  const commentCount = 0;

  return (
    <>
      <div className="flex justify-between mt-6">
        <Link
          href={`/invite/party/${code}/comments/create`}
          className="ml-auto"
        >
          <Button
            variant={"outlined"}
            size={"medium"}
            icon={{ DefaultComponent: PlusLine }}
          >
            한 마디 남기기
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3">
        <CommentCard
          data={{
            commentId: 1,
            author: "Author Name",
            content: "This is a sample comment.",
            createdAt: "2024-01-01T00:00:00Z",
          }}
          isOdd={true}
        />
        <CommentCard
          data={{
            commentId: 2,
            author: "Author Name",
            content: "This is a sample comment.",
            createdAt: "2024-01-01T00:00:00Z",
          }}
          isOdd={false}
        />
        <CommentCard
          data={{
            commentId: 1,
            author: "Author Name",
            content: "This is a sample comment.",
            createdAt: "2024-01-01T00:00:00Z",
          }}
          isOdd={true}
        />
        <CommentCard
          data={{
            commentId: 3,
            author: "Author Name",
            content: "This is a sample comment.",
            createdAt: "2024-01-01T00:00:00Z",
          }}
          isOdd={false}
        />
        <CommentCard
          data={{
            commentId: 4,
            author: "Author Name",
            content: "This is a sample comment.",
            createdAt: "2024-01-01T00:00:00Z",
          }}
          isOdd={true}
        />
        <CommentCard
          data={{
            commentId: 5,
            author: "Author Name",
            content: "This is a sample comment.",
            createdAt: "2024-01-01T00:00:00Z",
          }}
          isOdd={false}
        />
        <div ref={observerRef} className="h-10" />
      </div>

      {commentCount > 0 && (
        <Typography variant={"b16"} className="mt-6">
          총 <b>{commentCount}개</b>의 댓글이 있어요!
        </Typography>
      )}

      {commentCount > 0 ? (
        <div className="flex flex-col gap-4 mt-4">
          <CommentCard
            data={{
              commentId: 1,
              author: "Author Name",
              content: "This is a sample comment.",
              createdAt: "2024-01-01T00:00:00Z",
            }}
            isOdd={true}
          />
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
    </>
  );
};

export default CommentListContainer;
