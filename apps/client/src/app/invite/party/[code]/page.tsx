"use client";

import { withAuth } from "@/components/HOC/withAuth";
import PartyInviteContainer from "@/containers/party/Invite";
import { use } from "react";

const InvitedPartyPage = ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = use(params);
  return <PartyInviteContainer code={code} />;
};

export default withAuth(InvitedPartyPage, true);
