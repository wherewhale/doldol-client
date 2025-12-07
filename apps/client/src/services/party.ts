import { PartyCreateResponse, PartyRequest } from "@/types/party";
import { apiClient } from "./apiClient";

export const postParty = (data: PartyRequest) => {
  return apiClient.post<PartyCreateResponse>("/invites", data);
};
