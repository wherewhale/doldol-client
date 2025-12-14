import { Button, Typography } from "@ui/components";

import { ArrowSLineRight } from "@icons/ArrowSLineRight";
import Chip from "@ui/components/Chip/Chip";
import { Icon } from "@ui/components/Icon";
import Link from "next/link";
import { Modal } from "@ui/components";
import PrivacyPolicyContent from "@/components/serviceinfo/PrivacyPolicy";
import TermsOfServiceContent from "@/components/serviceinfo/TermsOfService";
import { getColorFromString } from "@/utils/color";
import useLogoutForm from "@/hooks/form/useLogoutForm";
import useMe from "@/hooks/useMe";
import { useState } from "react";

type ModalType = "PrivacyPolicy" | "TermsOfService" | null;

const ProfileContainer = () => {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const { user } = useMe();
  const { onLogoutApi } = useLogoutForm();

  // 모달 열기
  const OpenModal = (target: ModalType) => {
    setOpenModal(target);
  };

  // 모달 닫기 - null
  const CloseModal = () => {
    setOpenModal(null);
  };

  return (
    <div className=" flex flex-col  items-center w-full">
      <div className="flex mt-5 justify-between w-full">
        <div className="flex gap-5 ">
          <Chip
            src="/assets/logos/symbol-incase-small.png"
            size={56}
            bgColor={getColorFromString(user?.email ?? "")}
          />
          <Typography variant="b18-bold" className="mt-3">
            {user?.name ?? ""}님
          </Typography>
        </div>
        <Link href={"/my-page/edit-profile"}>
          <Button variant="primary" size="medium" className="mt-2">
            정보 수정
          </Button>
        </Link>
      </div>
      <div className="w-full mt-5 px-0 border border-2 border-gray-3 py-5 rounded-lg">
        <Link href={"/paper"}>
          <div className="flex justify-between px-6">
            <div className="flex gap-10">
              <Typography variant="b18-bold">롤링페이퍼</Typography>
            </div>
            <Icon icon={ArrowSLineRight} color="black" />
          </div>
        </Link>
        <Link href={"/party"}>
          <div className="flex justify-between px-6 mt-4">
            <div className="flex gap-10">
              <Typography variant="b18-bold">모임 초대장 만들기</Typography>
            </div>
            <Icon icon={ArrowSLineRight} color="black" />
          </div>
        </Link>
      </div>
      <Typography
        variant="b14-bold"
        className="mt-10 text-left text-gray-2 w-full"
      >
        서비스 정보
      </Typography>
      <div
        className="mt-5 text-left w-full cursor-pointer hover:text-green-1"
        onClick={() => OpenModal("PrivacyPolicy")}
      >
        <Typography variant="b18-bold">개인정보 처리방침</Typography>
      </div>
      <div
        className="mt-4 text-left w-full cursor-pointer hover:text-green-1"
        onClick={() => OpenModal("TermsOfService")}
      >
        <Typography variant="b18-bold" className="text-left w-full">
          서비스 이용 약관
        </Typography>
      </div>
      {openModal === "PrivacyPolicy" && (
        <Modal isOpen={true} onClose={CloseModal}>
          <PrivacyPolicyContent />
        </Modal>
      )}
      {openModal === "TermsOfService" && (
        <Modal isOpen={true} onClose={CloseModal}>
          <TermsOfServiceContent />
        </Modal>
      )}
      {/* 로그아웃 */}
      <Typography
        variant="b14-bold"
        className="mt-10 text-left text-gray-2 w-full"
      >
        로그인 관리
      </Typography>
      <Typography
        variant="b18-bold"
        className="mt-5 text-left w-full hover:text-green-1"
        onClick={() => onLogoutApi()}
      >
        로그아웃
      </Typography>
    </div>
  );
};

export default ProfileContainer;
