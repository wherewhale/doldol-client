"use client";

import { withAuth } from "@/components/HOC/withAuth";
import PaperInviteContainer from "@/containers/paper/Invite";
import { use } from "react";

const InvitedPartyPage = ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = use(params);
  return <PaperInviteContainer code={code} />;
};

export default withAuth(InvitedPartyPage, true);
