import {
  CreatePartyCommentRequest,
  PartyCommentListRequest,
} from "./../types/party.d";
import {
  PartyCommentResponse,
  PartyCreateResponse,
  PartyRequest,
} from "@/types/party";
import { apiClient } from "./apiClient";

export const postParty = (data: PartyRequest) => {
  return apiClient.post<PartyCreateResponse>("/invites", data);
};

export const getPartyInvite = (code: string) => {
  return apiClient.get<PartyCreateResponse>(`/invites/${code}`);
};

export const getPartyComments = (code: PartyCommentListRequest) => {
  return apiClient.get<PartyCommentResponse[]>(
    `/invites/${code.code}/comments`,
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
