import { getCharacterFromString, getRandomColor } from "@/utils/color";
import { getTextColor } from "@/utils/messageStyle";
import { Modal, Typography } from "@ui/components";
import cx from "clsx";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  author: string;
  content: string;
}

export const CommentDetailModal: React.FC<Props> = ({
  isOpen,
  onClose,
  author,
  content,
}) => {
  const randomColor = getRandomColor();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full min-w-[320px]">
        <Typography variant="b16-medium" className="mt-6">
          댓글 내용
        </Typography>
        <div
          className={cx(
            "w-full p-8 rounded-xl shadow-xl mt-4",
            randomColor,
            getTextColor(randomColor),
          )}
        >
          <div
            className={cx(
              "w-full h-80 text-center text-xl whitespace-pre-line overflow-y-scroll scrollbar-hide",
              randomColor,
              getTextColor(randomColor),
            )}
          >
            {content}
          </div>
        </div>

        <Typography variant="b16-medium" className="mt-10">
          작성자
        </Typography>
        <div className="flex gap-2">
          <div className="size-14 relative">
            <Image
              src={getCharacterFromString(author)}
              alt="댓글 배경 이미지"
              width={100}
              height={100}
              quality={100}
              className={cx("object-cover")}
            />
          </div>
          <Typography variant="b16" className="mt-4">
            {author}
          </Typography>
        </div>
      </div>
    </Modal>
  );
};
