import { PartyTheme } from "@/enum/party.enum";

/** 초대장 생성 */
export interface PartyRequest {
  title: string;
  eventDateTime: string;
  location: string;
  locationLink: string;
  content: string;
  sender: string;
  theme: PartyTheme;
  fontStyle: string;
}

export interface PartyComment {
  commentId: number;
  author: string;
  userId: number;
  content: string;
  createdAt: string;
}

export interface PartyCreateResponse {
  inviteId: number;
  title: string;
  eventDateTime: string;
  location: string;
  locationLink: string;
  content: string;
  sender: string;
  inviteCode: string;
  theme: string;
  fontStyle: string;
  comments: PartyComment[];
}
