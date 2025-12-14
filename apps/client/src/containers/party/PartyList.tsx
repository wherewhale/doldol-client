"use client";

import { Button, Typography } from "@ui/components";

import Image from "next/image";
import { PlusLine } from "@icons/PlusLine";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { getPartyList } from "@/services/party";
import PartyBox from "@/components/party/PartyBox";

const PartyListContainer = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["partyList"],
    queryFn: ({ pageParam = 0 }) =>
      getPartyList({
        cursorId: pageParam === 0 ? null : pageParam,
        size: 10,
      }).then((res) => {
        return res.data;
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
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

  const parties = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <div className="flex justify-end mt-6">
        <Link href={"/party/create"}>
          <Button
            variant={"outlined"}
            size={"medium"}
            icon={{ DefaultComponent: PlusLine }}
          >
            새로 만들기
          </Button>
        </Link>
      </div>

      {parties.length > 0 && (
        <Typography variant={"b16"} className="mt-6">
          돌돌로 생성한 초대장을 확인해보세요!
        </Typography>
      )}

      {parties.length > 0 ? (
        <ul className="flex flex-col gap-4 mt-4">
          {parties.map((party, index) => (
            <li key={party.inviteId ?? index}>
              <PartyBox key={party.inviteId ?? index} data={party} />
            </li>
          ))}
          <div ref={observerRef} className="h-10" />
        </ul>
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
            아직까지는 생성된
            <br />
            초대장이 없다 돌돌..
          </Typography>
        </div>
      )}
    </>
  );
};

export default PartyListContainer;
