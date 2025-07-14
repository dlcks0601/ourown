export interface Notification {
  type: string;
  payload: Payload;
  // 클라이언트에서 관리하는 필드들
  id: string;
  createdAt: string;
  isRead: boolean;
}
export interface PrevNotification {
  id: number;
  message: string;
  payload: string;
  createdAt: string;
  isRead: boolean;
}

export interface Payload {
  id: number;
  message: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

export type NotificationType =
  | 'LIST_TOGGLED' // 버킷리스트 토글
  | 'MEMO_CREATED'; // 메모 생성

export interface NotificationResponse {
  message: string;
  notifications: PrevNotification[];
}
