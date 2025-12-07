"use client";

import { withAuth } from "@/components/HOC/withAuth";
import CommentListContainer from "@/containers/party/comments/CommentList";
import { use } from "react";

const PartyCommentsPage = ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = use(params);
  return <CommentListContainer code={code} />;
};

export default withAuth(PartyCommentsPage, true);
