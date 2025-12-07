export const ERROR_MESSAGES = {
  /** 로그인 */
  usernameRequired: "아이디를 입력해주세요.",
  passwordRequired: "비밀번호를 입력해주세요.",

  /** 회원가입 */
  emailInvalid: "이메일 형식이 올바르지 않습니다.",
  emailRequired: "이메일을 입력해주세요.",
  duplicateEmail: "이미 존재하는 회원입니다.",
  passwordInvalid:
    "비밀번호는 8~16자의 영문, 숫자, 특수문자를 포함해야 합니다.",
  passwordConfirmInvalid: "비밀번호가 일치하지 않습니다.",
  phoneNumberInvalid: "번호는 - 를 뺀 01012341234로 입력해주세요.",
  phoneNumberRequired: "휴대전화 번호를 입력해주세요.",
  phoneNumberResponseFailed: "휴대전화 인증번호가 틀렸습니다.",
  phoneNumberCodeInvalid: "휴대전화 인증번호는 6자리의 숫자입니다.",
  oauthRegisterFailed: "소셜 회원가입에 실패했습니다.",
  usernameInvalid: "이름은 2~5자의 한글로 입력해주세요.",

  emailCodeSentFailed: "이메일 인증번호 전송에 실패했습니다.",
  emailCodeInvalid: "이메일 인증번호는 6자리의 숫자입니다.",
  emailCodeRequired: "이메일 인증번호를 입력해주세요.",
  emailCodeCheckInvalid: "이메일 인증번호가 일치하지 않습니다.",

  /** 비밀번호 변경 */
  passwordCheckInvalid:
    "비밀번호 양식이 올바르지 않거나, 비밀번호가 일치하지 않습니다.",
  emailCheckInvalid: "존재하는 아이디가 없습니다.",
  emailPhoneNumberNotMatched: "이메일과 휴대전화 번호가 일치하지 않습니다.",

  /** 롤링페이퍼 */
  paperNameRequired: "롤링페이퍼 이름을 입력해주세요.",
  paperDescriptionRequired: "롤링페이퍼 설명을 입력해주세요.",
  paperOpenDateRequired: "롤링페이퍼 오픈 날짜를 입력해주세요.",
  messageContentInvalid: "메시지 내용은 1자 이상 120자 이하로 입력해주세요.",

  /** 초대장 */
  partyTitleRequired: "초대장 이름을 입력해주세요.",
  partyDescriptionRequired: "초대장 설명을 입력해주세요.",
  partyDateTimeRequired: "초대장 날짜 및 시간을 입력해주세요.",
  partyLocationRequired: "장소 이름을 입력해주세요.",
  partyLocationLinkInvalid: "장소 링크는 필수 입력입니다.",
  senderRequired: "단체명을 입력해주세요.",

  /** 기타 */
  blockRecirect:
    "작성하신 내용이 저장되지 않았습니다. 이 페이지를 떠나시겠습니까?",

  /** 권한 에러 */
  unauthorized: "로그인이 필요합니다.",
  forbidden: "접근 권한이 없습니다.",

  updateFailure: "수정에 실패하였습니다.",

  reportFailure: "신고 접수에 실패하였습니다.",
};

export const HELPER_MESSAGES = {
  /** 유저 관련 */
  userDeleteSuccess: "해당 회원이 탈퇴되었습니다.",

  /** Auth Form 관련 */
  emailValid: "사용 가능한 이메일입니다.",
  passwordValid: "사용 가능한 비밀번호입니다.",
  passwordConfirmValid: "비밀번호가 일치합니다.",

  /** 비밀번호 변경 */
  emailCheckValid: "이메일이 확인되었습니다.",
  passwordChangeSuccess: "비밀번호 변경이 완료되었습니다.",

  /** 본인 인증 */
  emailCodeSentSuccess: "이메일로 인증번호가 전송되었습니다.",
  emailCodeCheckSuccess: "인증번호가 확인되었습니다.",

  /** 롤링페이퍼 */
  joinPaperSuccess: "새로운 롤링페이퍼에 참여했어요!",
  createMessageSuccess: "새로운 메시지가 작성되었습니다.",
  messageDeleteSuccess: "메시지가 삭제되었습니다.",
  messageUpdateSuccess: "메시지가 수정되었습니다.",

  /** 로그인 */
  loginSuccess: "로그인 되었습니다.",
  logoutSuccess: "로그아웃 되었습니다.",

  userInfoUpdateSuccess: "유저 정보 수정이 완료되었습니다.",

  reportSuccess: "신고가 정상적으로 접수되었습니다",
};
