import { Dayjs } from "dayjs";
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
  content: string;
  createdAt: string;
}

export interface CreateCommentRequest {
  author: string;
  content: string;
}

export interface Party {
  inviteId: number;
  title: string;
  eventDateTime: Dayjs;
  location: string;
  locationLink: string;
  content: string;
  sender: string;
  inviteCode: string;
  theme: string;
  fontStyle: string;
  comments: PartyComment[];
}

export interface CreatePartyCommentRequest {
  author: string;
  content: string;
}

export interface PartyListRequest {
  cursorId: number | null;
  size: number;
}

export interface PartyListResponse {
  data: Party[];
  size: number;
  nextCursor: number;
  hasNext: boolean;
  empty: boolean;
}

export interface PartyCommentListRequest {
  inviteCode: string;
  cursorId: number | null;
  size: number;
}

export interface PartyCommentResponse {
  data: {
    commentId: number;
    author: string;
    content: string;
    createdAt: string;
  }[];
  size: number;
  nextCursor: number;
  hasNext: boolean;
  empty: boolean;
}
