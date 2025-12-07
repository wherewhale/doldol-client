import { PartyCommentResponse } from "@/types/party";
import { Typography } from "@ui/components";
import cx from "clsx";
import Image from "next/image";

interface Props {
  data: PartyCommentResponse;
  isOdd: boolean;
}

export const CommentCard: React.FC<Props> = ({ data, isOdd }) => {
  return (
    <div className={cx("size-28 relative", isOdd && "mt-4")}>
      <Image
        src={`/assets/images/party/comments/${(data.commentId % 8) + 1}.png`}
        alt="댓글 배경 이미지"
        width={100}
        height={100}
        quality={100}
        className={cx("object-cover", isOdd ? "-rotate-12" : "rotate-12")}
      />
      <div className="absolute bottom-2 rounded-xl bg-white border border-gray-2 max-w-24 px-2 left-0 right-0 mx-auto">
        <Typography variant="b13" ellipsis={1}>
          {data.author}
        </Typography>
      </div>
    </div>
  );
};
