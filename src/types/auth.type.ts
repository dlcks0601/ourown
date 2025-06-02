export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface MessageResponse {
  code: number;
  text: string;
}

export interface User {
  email: string;
  nickname: string;
  profileUrl: string;
}

export interface LoginResponse {
  isNew: boolean;
  jwt: TokenResponse;
  message: MessageResponse;
  user: User;
}

export interface SignupResponse {
  message: MessageResponse;
  user: User;
  jwt: TokenResponse;
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
  logIn: (user: User, jwt: TokenResponse) => void;
  updateNickname: (nickname: string) => void;
  logOut: () => void;
}
