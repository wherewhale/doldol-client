"use client";

import { Button, Notify, Typography } from "@ui/components";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import dayjs from "dayjs";
import { getPartyInvite } from "@/services/party";
import cx from "clsx";
import { PartyTheme } from "@/enum/party.enum";
import { getTextColor } from "@/utils/messageStyle";
import { partyThemeConverter } from "@/utils/party";
import Link from "next/link";
import { useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import { Icon } from "@ui/components/Icon";
import { Calendar } from "@icons/Calendar";
import { MapPinLine } from "@icons/MapPinLine";

interface Props {
  code: string;
}

const PartyInviteContainer: React.FC<Props> = ({ code }) => {
  const captureRef = useRef<HTMLDivElement>(null);

  const { data: partyData, isLoading } = useQuery({
    queryKey: ["partyInvite", code],
    queryFn: async () => {
      const response = await getPartyInvite(code);
      return response.data;
    },
    retry: false,
  });

  const onCopyLink = () => {
    const link = `${window.location.origin}/invite/party/${partyData?.inviteCode}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        Notify.success("초대장 링크가 복사되었습니다.");
      })
      .catch(() => {
        Notify.error("초대장 링크 복사에 실패했습니다.");
      });
  };

  const onCaptureImage = useCallback(async () => {
    if (!captureRef.current) return;

    try {
      Notify.success("이미지 생성을 시작합니다...");
      await document.fonts.ready;

      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `invite_${partyData?.title || "party"}.png`;
      link.href = dataUrl;
      link.click();
      Notify.success("이미지가 저장되었습니다.");
    } catch (err) {
      console.error(err);
      Notify.error("이미지 저장에 실패했습니다.");
    }
  }, [partyData?.title]);

  return (
    <>
      {isLoading && <Typography variant="b16">로딩 중...</Typography>}
      {!partyData && !isLoading && (
        <div className="flex flex-col items-center justify-center h-full mt-10">
          <Image
            src="/assets/images/empty.png"
            alt="빈 롤링페이퍼 이미지"
            width={80}
            height={80}
            className="mb-4"
            priority
          />
          <Typography variant="h24" className="mt-10">
            요청한 초대장이 존재하지 않아요.
          </Typography>
        </div>
      )}
      {partyData && (
        <>
          <Typography element="h1" variant={"h24"} className="mt-10 mb-4">
            파티 초대장이 <br />
            도착했어요!
          </Typography>

          <div className="bg-white pb-6 rounded-xl overflow-hidden">
            <div className="px-4 pt-6">
              <div
                ref={captureRef}
                className={cx(
                  "w-full p-8 rounded-xl shadow-xl mt-6",
                  partyThemeConverter(partyData.theme as PartyTheme)
                    .backgroundColor,
                  getTextColor(
                    partyThemeConverter(partyData.theme as PartyTheme)
                      .backgroundColor,
                  ),
                )}
              >
                <div className="relative w-full aspect-party mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={`/assets/images/party/${partyThemeConverter(partyData.theme as PartyTheme).src}`}
                    alt="테마 이미지"
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />
                </div>

                <Typography
                  variant="b20"
                  className="mt-2 w-full text-center !break-keep"
                >
                  {partyData.title}
                </Typography>
                <div className="mt-10 flex items-center gap-1">
                  <Icon icon={Calendar} size={16} />
                  <Typography variant="b16-medium">일시</Typography>
                </div>

                <Typography variant="b16" className="mt-2">
                  {dayjs(partyData.eventDateTime).format(
                    "YYYY년 MM월 DD일 HH:mm",
                  )}
                </Typography>

                <div className="mt-4 flex items-center gap-1">
                  <Icon icon={MapPinLine} size={16} />
                  <Typography variant="b16-medium">장소</Typography>
                </div>

                <Link href={partyData.locationLink} target="_blank">
                  <Typography variant="b16" className="mt-2 underline">
                    {partyData.location}
                  </Typography>
                </Link>

                <div
                  className={cx(
                    "w-full text-center text-xl",
                    partyData.fontStyle,
                    partyThemeConverter(partyData.theme as PartyTheme)
                      .backgroundColor,
                    getTextColor(
                      partyThemeConverter(partyData.theme as PartyTheme)
                        .backgroundColor,
                    ),
                  )}
                />
                <Typography
                  variant="b18"
                  className={cx(
                    "whitespace-pre-wrap text-center my-10",
                    partyData.fontStyle,
                  )}
                >
                  {partyData.content}
                </Typography>
                <div className="flex items-center gap-2">
                  <Typography
                    element="span"
                    variant="b18-bold"
                    className={getTextColor(
                      partyThemeConverter(partyData.theme as PartyTheme)
                        .backgroundColor,
                    )}
                  >
                    From.
                  </Typography>
                  <input
                    className={cx(
                      "border-b-2 border-gray-3 px-1 py-2 flex-1 text-[18px] font-bold max-w-[200px] placeholder:text-gray-3 bg-transparent",
                      getTextColor(
                        partyThemeConverter(partyData.theme as PartyTheme)
                          .backgroundColor,
                      ),
                    )}
                    value={partyData.sender}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          <Link
            href={`/invite/party/${partyData.inviteCode}/comments`}
            className="mt-10 block"
          >
            <Button variant={"primary"} size={"large"} wide>
              친구들의 한 마디
            </Button>
          </Link>
          <div className="grid grid-cols-2 gap-2 my-4">
            <Button
              variant={"secondary"}
              size={"large"}
              wide
              onClick={onCaptureImage}
            >
              이미지로 저장하기
            </Button>

            <Button
              variant={"outlined"}
              size={"large"}
              wide
              onClick={onCopyLink}
            >
              초대장 링크 공유하기
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default PartyInviteContainer;
