export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface MessageResponse {
  code: number;
  text: string;
}

export interface Couple {
  anniversary: string;
}

export interface User {
  id: number;
  code: string;
  coupleId: number;
  email: string;
  nickname: string;
  profileUrl: string;
  birthday: string;
}

export interface Partner {
  id: number;
  nickname: string;
  profileUrl: string;
  code?: string;
  birthday: string;
}

export interface LoginResponse {
  isNew: boolean;
  jwt: TokenResponse;
  message: MessageResponse;
  user: User;
  partner: Partner;
  couple: Couple;
}

export interface SignupResponse {
  isNew: boolean;
  jwt: TokenResponse;
  message: MessageResponse;
  user: User;
  partner: Partner;
  couple: Couple;
}

export interface SignupState {
  isReady: boolean;
  user: User;
  jwt: TokenResponse;
  logIn: (user: User, jwt: TokenResponse) => void;
  setNickname: (nickname: string) => void;
}

// zustand 상태관리
export interface AuthState {
  isLoggedIn: boolean;
  isReady: boolean;
  user: User;
  jwt: TokenResponse;
  partner: Partner;
  couple: Couple;
  logIn: (
    user: User,
    jwt: TokenResponse,
    partner: Partner,
    couple: Couple
  ) => void;
  updateNickname: (nickname: string) => void;
  updateAnniversary: (anniversary: string) => void;
  updateBirthday: (birthday: string) => void;
  updateProfileUrl: (profileUrl: string) => void;
  updateUser: (user: User, Partner: Partner, couple: Couple) => void;
  logOut: () => void;
}
