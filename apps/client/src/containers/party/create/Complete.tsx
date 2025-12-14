import { Button, Notify, Typography } from "@ui/components";

import Link from "next/link";
import dayjs from "dayjs";
import cx from "clsx";
import { getTextColor } from "@/utils/messageStyle";
import { partyThemeConverter } from "@/utils/party";
import { PartyTheme } from "@/enum/party.enum";
import Image from "next/image";
import { Party } from "@/types/party";

interface Props {
  data: Party;
}

const PartyCreateCompleteContainer: React.FC<Props> = ({ data }) => {
  const onCopyLink = () => {
    const link = `${window.location.origin}/invite/party/${data.inviteCode}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        Notify.success("초대장 링크가 복사되었습니다.");
      })
      .catch(() => {
        Notify.error("초대장 링크 복사에 실패했습니다.");
      });
  };

  return (
    <>
      <Typography variant="h24" className="mt-10">
        새로운 초대장이
        <br />
        만들어졌어요!
      </Typography>
      <Typography variant="b20-medium" className="mt-10">
        초대장 정보
      </Typography>
      <Typography variant="b20" className="mt-2 w-full text-center !break-keep">
        {data.title}
      </Typography>

      <div
        className={cx(
          "w-full p-8 rounded-xl shadow-xl mt-10",
          partyThemeConverter(data.theme as PartyTheme).backgroundColor,
          getTextColor(
            partyThemeConverter(data.theme as PartyTheme).backgroundColor,
          ),
        )}
      >
        <Image
          src={`/assets/images/party/${partyThemeConverter(data.theme as PartyTheme).src}`}
          alt="테마 이미지"
          width={500}
          height={300}
          className="mb-4 aspect-party rounded-xl"
        />
        <div
          className={cx(
            "w-full text-center text-xl",
            data.fontStyle,
            partyThemeConverter(data.theme as PartyTheme).backgroundColor,
            getTextColor(
              partyThemeConverter(data.theme as PartyTheme).backgroundColor,
            ),
          )}
        />
        <Typography
          variant="b18"
          className={cx(
            "whitespace-pre-wrap text-center my-10",
            data.fontStyle,
          )}
        >
          {data.content}
        </Typography>
        <div className="flex items-center gap-2">
          <Typography
            element="span"
            variant="b18-bold"
            className={getTextColor(
              partyThemeConverter(data.theme as PartyTheme).backgroundColor,
            )}
          >
            From.
          </Typography>
          <input
            className={cx(
              "border-b-2 border-gray-3 px-1 py-2 flex-1 text-[18px] font-bold max-w-[200px] placeholder:text-gray-3",
              getTextColor(
                partyThemeConverter(data.theme as PartyTheme).backgroundColor,
              ),
            )}
            value={data.sender}
            readOnly
          />
        </div>
      </div>

      <Typography variant="b16-medium" className="mt-10">
        행사 일시
      </Typography>
      <Typography variant="b16" className="mt-2">
        {dayjs(data.eventDateTime).format("YYYY년 MM월 DD일 HH:mm")}
      </Typography>

      <Typography variant="b16-medium" className="mt-4">
        행사 장소
      </Typography>
      <Link href={data.locationLink} target="_blank">
        <Typography variant="b16" className="mt-2 underline">
          {data.location}
        </Typography>
      </Link>

      <Button
        variant={"primary"}
        size={"large"}
        wide
        className="mt-10 mb-4"
        onClick={onCopyLink}
      >
        초대장 링크 공유하기
      </Button>
      <Link href={"/party"}>
        <Button variant={"secondary"} size={"large"} wide>
          완료
        </Button>
      </Link>
    </>
  );
};

export default PartyCreateCompleteContainer;
