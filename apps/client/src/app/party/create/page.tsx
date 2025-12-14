"use client";

import { withAuth } from "@/components/HOC/withAuth";
import { Party } from "@/types/party";
import dynamic from "next/dynamic";
import { useState } from "react";

type PartyCreateStage = "create" | "complete";

const Content = {
  create: dynamic(() => import("@/containers/party/create/Create"), {
    ssr: false,
    loading: () => <div>Loading...</div>, // 스켈레톤 대체
  }),
  complete: dynamic(() => import("@/containers/party/create/Complete"), {
    ssr: false,
    loading: () => <div>Loading...</div>, // 스켈레톤 대체
  }),
};

const PartyCreatePage = () => {
  const [stage, setStage] = useState<PartyCreateStage>("create");
  const [pageInfo, setPageInfo] = useState<Party | null>(null);

  const onNext = (data: Party) => {
    setPageInfo(data);
    setStage("complete");
  };

  return (
    <div className="px-6 pb-10">
      {stage === "create" && <Content.create onNext={onNext} />}
      {stage === "complete" && pageInfo && <Content.complete data={pageInfo} />}
    </div>
  );
};

export default withAuth(PartyCreatePage, true);
