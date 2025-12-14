import { Party } from "@/types/party";
import { ArrowSLineRight } from "@icons/ArrowSLineRight";
import { convertDateToDateString } from "@libs/utils";
import { Typography } from "@ui/components";
import { Icon } from "@ui/components/Icon";
import cx from "clsx";
import Link from "next/link";

interface Props {
  data: Party;
  className?: string;
}

const PartyBox: React.FC<Props> = ({ data, className }) => {
  return (
    <div className={cx("p-6 border border-gray-3 rounded-lg", className)}>
      <Link
        href={`/invite/party/${data.inviteCode}`}
        className="flex justify-between items-center gap-2"
      >
        <Typography variant={"b16-bold"}>{data.title}</Typography>
        <Icon icon={ArrowSLineRight} size={16} />
      </Link>

      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-1 items-center">
          <Typography variant="b12" color="gray-2">
            작성된 한 마디{" "}
            <span className="font-medium">{data.comments.length}</span>
          </Typography>
          <Typography variant="b12" color="gray-2">
            ·
          </Typography>
          <Typography variant="b12" color="gray-2">
            위치 <span className="font-medium">{data.location}</span>
          </Typography>
        </div>
        <Typography variant="b12" color="gray-2">
          일시 :{" "}
          {data.eventDateTime
            ? convertDateToDateString(data.eventDateTime)
            : "기한 없음"}
        </Typography>
      </div>
    </div>
  );
};

export default PartyBox;
