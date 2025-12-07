"use client";

import { withAuth } from "@/components/HOC/withAuth";
import { ArrowSLineUp } from "@icons/ArrowSLineUp";
import { Button } from "@ui/components";

const PartyPage = () => {
  const onScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="px-6 pb-10">
      <Button
        className="fixed bottom-6 right-6 z-10"
        variant={"primary"}
        size={"medium"}
        shape="circle"
        onClick={onScrollToTop}
        icon={{ DefaultComponent: ArrowSLineUp }}
      />
      초대장 리스트 페이지 가져오기
      {/* <PaperListContainer /> */}
    </div>
  );
};

// TODO: dev 아이디 확인 이후, 다시 auth 적용 필요
export default withAuth(PartyPage, true);
