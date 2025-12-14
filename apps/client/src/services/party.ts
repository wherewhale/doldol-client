import {
  CreatePartyCommentRequest,
  Party,
  PartyCommentListRequest,
  PartyListRequest,
  PartyListResponse,
} from "./../types/party.d";
import { PartyCommentResponse, PartyRequest } from "@/types/party";
import { apiClient } from "./apiClient";

export const postParty = (data: PartyRequest) => {
  return apiClient.post<Party>("/invites", data);
};

export const getPartyList = (data: PartyListRequest) => {
  return apiClient.get<PartyListResponse>("/invites", {
    params: {
      ...data,
    },
  });
};

export const getPartyInvite = (code: string) => {
  return apiClient.get<Party>(`/invites/${code}`);
};

export const getPartyComments = (code: PartyCommentListRequest) => {
  return apiClient.get<PartyCommentResponse[]>(
    `/invites/${code.inviteCode}/comments`,
  );
};

export const postPartyComment = (
  code: string,
  data: CreatePartyCommentRequest,
) => {
  return apiClient.post<PartyCommentResponse>(
    `/invites/${code}/comments`,
    data,
  );
};
