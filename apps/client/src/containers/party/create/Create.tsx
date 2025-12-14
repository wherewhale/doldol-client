import { Button, Notify, TextField, Typography } from "@ui/components";

import { ERROR_MESSAGES } from "@libs/utils/message";
import cx from "clsx";
import { ErrorDTO } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { useCreatePartyForm } from "@/hooks/form/useCreatePartyForm";
import { Party, PartyRequest } from "@/types/party";
import { postParty } from "@/services/party";
import { PartyTheme } from "@/enum/party.enum";
import { getTextColor } from "@/utils/messageStyle";
import Image from "next/image";
import { partyThemeConverter } from "@/utils/party";

interface Props {
  onNext: (data: Party) => void;
}

const PartyCreateContainer: React.FC<Props> = ({ onNext }) => {
  const { register, handleSubmit, watch, errors, setValue } =
    useCreatePartyForm();

  const onSubmit = async (data: PartyRequest) => {
    onCreatePartyApi(data);
  };

  const {
    mutate: onCreatePartyApi,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data: PartyRequest) => postParty(data),
    mutationKey: ["createParty", watch("title"), watch("location")],
    onSuccess: (res) => {
      if (res) {
        Notify.success("새로운 초대장이 생성되었습니다.");
        onNext(res.data);
      }
    },
    onError: (error: AxiosError) => {
      if (isAxiosError<ErrorDTO>(error)) {
        Notify.error("초대장 생성에 실패했습니다.");
      }
    },
  });

  return (
    <>
      <Typography variant="h24" className="mt-10">
        새로운 초대장을 만들고
        <br />
        신나는 파티를 시작해보세요!
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="b20-medium" className="mt-10">
          초대장 정보
        </Typography>

        <Typography variant="b16" className="mt-10">
          초대장 이름
        </Typography>
        <TextField
          placeholder="초대장 이름을 입력해주세요. (최대 20자)"
          error={errors.title ? true : false}
          errorMessage={errors.title?.message}
          gutterBottom
          {...register("title", {
            required: ERROR_MESSAGES.partyTitleRequired,
            validate: (value) => {
              if (watch("title") !== value) {
                return ERROR_MESSAGES.partyTitleRequired;
              }
              if (value.length > 20) {
                return "초대장 이름은 최대 20자까지 입력 가능합니다.";
              }
            },
          })}
        />

        <Typography variant="b16" className="mt-10">
          행사 일시 선택
        </Typography>
        <input
          type="datetime-local"
          className={cx("w-64 mt-2 px-4 py-2 border rounded-lg shadow-lg")}
          min={new Date().toISOString()} // 오늘 날짜 이후로 선택 가능
          {...register("eventDateTime", {
            required: ERROR_MESSAGES.partyDateTimeRequired,
            validate: (value) => {
              const today = new Date();
              const selectedDate = new Date(value);
              if (selectedDate < today) {
                return "행사 날짜는 오늘 이후로 선택해주세요.";
              }
            },
          })}
        />
        <Typography color="red-1" className="mt-2" variant="b12">
          {errors.eventDateTime?.message}
        </Typography>

        <Typography variant="b16" className="mt-10">
          장소 이름
        </Typography>
        <TextField
          placeholder="장소 이름을 입력해주세요. (최대 20자)"
          error={errors.location ? true : false}
          errorMessage={errors.location?.message}
          gutterBottom
          {...register("location", {
            required: ERROR_MESSAGES.partyLocationRequired,
            validate: (value) => {
              if (value.length > 20) {
                return "장소 이름은 최대 20자까지 입력 가능합니다.";
              }
            },
          })}
        />

        <Typography variant="b16" className="mt-10">
          장소 링크
        </Typography>
        <TextField
          placeholder="카카오, 네이버 지도 링크를 입력해주세요."
          error={errors.locationLink ? true : false}
          errorMessage={errors.locationLink?.message}
          gutterBottom
          {...register("locationLink", {
            required: ERROR_MESSAGES.partyLocationLinkInvalid,
            validate: (value) => {
              if (!value.startsWith("http")) {
                return "유효한 링크를 입력해주세요.";
              }
            },
          })}
        />

        <div className="space-y-4">
          <Typography element="h2" variant="b20-medium" className="mt-10">
            초대장 카드 디자인
          </Typography>
          <Typography variant="b16" className="mt-10">
            테마 선택
          </Typography>
          <div className="flex gap-2 mt-2">
            <Button
              variant={"outlined"}
              size={"small"}
              type="button"
              isActive={watch("theme") === PartyTheme.BIRTHDAY}
              onClick={() => setValue("theme", PartyTheme.BIRTHDAY)}
            >
              생일
            </Button>
            <Button
              variant={"outlined"}
              size={"small"}
              type="button"
              isActive={watch("theme") === PartyTheme.CHRISTMAS}
              onClick={() => setValue("theme", PartyTheme.CHRISTMAS)}
            >
              크리스마스
            </Button>
            <Button
              variant={"outlined"}
              size={"small"}
              type="button"
              isActive={watch("theme") === PartyTheme.YEAR_END}
              onClick={() => setValue("theme", PartyTheme.YEAR_END)}
            >
              송년회
            </Button>
            <Button
              variant={"outlined"}
              size={"small"}
              type="button"
              isActive={watch("theme") === PartyTheme.NEW_YEAR}
              onClick={() => setValue("theme", PartyTheme.NEW_YEAR)}
            >
              새해
            </Button>
          </div>

          <Typography variant="b16" className="mt-10">
            글씨체 선택
          </Typography>
          <div className="flex gap-2 mt-2">
            <Button
              variant={"outlined"}
              size={"small"}
              type="button"
              className="font-pretendard"
              isActive={watch("fontStyle") === "font-pretendard"}
              onClick={() => setValue("fontStyle", "font-pretendard")}
            >
              기본
            </Button>
            <Button
              variant={"outlined"}
              size={"small"}
              type="button"
              className="font-minguk"
              isActive={watch("fontStyle") === "font-minguk"}
              onClick={() => setValue("fontStyle", "font-minguk")}
            >
              손글씨
            </Button>
            <Button
              variant={"outlined"}
              size={"small"}
              type="button"
              className="font-dahyun"
              isActive={watch("fontStyle") === "font-dahyun"}
              onClick={() => setValue("fontStyle", "font-dahyun")}
            >
              동글동글
            </Button>
          </div>

          {/* 카드 */}
          <div
            className={cx(
              "w-full p-8 rounded-xl shadow-xl",
              partyThemeConverter(watch("theme")).backgroundColor,
              getTextColor(partyThemeConverter(watch("theme")).backgroundColor),
            )}
          >
            <Image
              src={`/assets/images/party/${partyThemeConverter(watch("theme")).src}`}
              alt="테마 이미지"
              width={500}
              height={300}
              className="mb-4 aspect-party rounded-xl"
            />
            <textarea
              className={cx(
                "w-full h-80 resize-none text-center text-xl placeholder:text-gray-3",
                watch("fontStyle"),
                partyThemeConverter(watch("theme")).backgroundColor,
                getTextColor(
                  partyThemeConverter(watch("theme")).backgroundColor,
                ),
              )}
              placeholder="내용을 입력하세요..."
              {...register("content", {
                required: ERROR_MESSAGES.messageContentInvalid,
                validate: (value) => {
                  if (value.length > 120) {
                    return ERROR_MESSAGES.messageContentInvalid;
                  }
                },
              })}
            />
            {/* From 입력 */}
            <div className="flex items-center gap-2">
              <Typography
                element="span"
                variant="b18-bold"
                className={getTextColor(
                  partyThemeConverter(watch("theme")).backgroundColor,
                )}
              >
                From.
              </Typography>
              <input
                className={cx(
                  "border-b-2 border-gray-3 px-1 py-2 flex-1 text-[18px] font-bold max-w-[200px] placeholder:text-gray-3",
                  getTextColor(
                    partyThemeConverter(watch("theme")).backgroundColor,
                  ),
                )}
                placeholder="단체명 입력"
                {...register("sender", {
                  required: "단체명을 입력해주세요.",
                  validate: (value) => {
                    if (value.length > 10) {
                      return "단체명은 최대 10자까지 입력할 수 있습니다.";
                    }
                  },
                })}
              />
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          size="large"
          wide
          className="mt-10"
          type="submit"
          disabled={
            watch("title") === "" ||
            watch("eventDateTime") === "" ||
            watch("location") === "" ||
            watch("locationLink") === "" ||
            watch("content") === "" ||
            watch("sender") === "" ||
            Object.keys(errors).length > 0 ||
            isPending ||
            isSuccess
          }
        >
          새로운 초대장 생성
        </Button>
      </form>
    </>
  );
};

export default PartyCreateContainer;
