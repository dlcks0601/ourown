import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { NotificationResponse } from '@/types/notification.type';
import fetcher from '@/utils/fetcher';
import EventSource from 'react-native-sse';

export interface NotificationEvent {
  type: string;
  data: any;
  timestamp: string;
}

class NotificationService {
  private eventSource: EventSource | null = null;
  private isConnected: boolean = false;

  // SSE 연결 시작
  connect(userId: number): EventSource {
    if (this.isConnected) {
      this.disconnect();
    }

    const url = `https://duo.yeol.store/sse/subscribe?userId=${userId}`;

    this.eventSource = new EventSource(url, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });

    this.isConnected = true;

    // 연결 성공 이벤트
    this.eventSource.addEventListener('open', (event: any) => {
      console.log('SSE 연결 성공:', event);
    });

    // 메시지 수신 이벤트
    this.eventSource.addEventListener('message', (event: any) => {
      try {
        if (event.data) {
          const data = JSON.parse(event.data);
          console.log('알림 수신:', data);
          this.handleNotification(data);
        }
      } catch (error) {
        console.error('알림 데이터 파싱 오류:', error);
      }
    });

    // 에러 이벤트
    this.eventSource.addEventListener('error', (event: any) => {
      console.error('SSE 연결 오류:', event);
      this.isConnected = false;
    });

    return this.eventSource;
  }

  // SSE 연결 해제
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.isConnected = false;
      console.log('SSE 연결 해제됨');
    }
  }

  // 알림 처리 로직
  private handleNotification(data: any): void {
    // 알림 store에 저장
    const { addNotification } = useNotificationStore.getState();

    // SSE에서 받은 데이터를 이전 알림 기록과 일관성 있게 변환
    addNotification({
      type: data.type,
      payload: {
        id: data.payload?.id || Date.now(),
        message: data.payload?.message || data.payload,
      },
    });
  }

  // 연결 상태 확인
  isConnectedToSSE(): boolean {
    return this.isConnected;
  }

  // 커스텀 이벤트 리스너 추가
  addEventListener(eventType: any, callback: (event: any) => void): void {
    if (this.eventSource) {
      this.eventSource.addEventListener(eventType, callback);
    }
  }

  // 커스텀 이벤트 리스너 제거
  removeEventListener(eventType: any, callback: (event: any) => void): void {
    if (this.eventSource) {
      this.eventSource.removeEventListener(eventType, callback);
    }
  }
}

// 싱글톤 인스턴스 생성
export const notificationService = new NotificationService();

// 훅으로 사용할 수 있는 함수들
export const useNotificationService = () => {
  const { user } = useAuthStore();

  const connectToSSE = () => {
    if (user.id) {
      return notificationService.connect(user.id);
    } else {
      console.error('사용자 ID가 없습니다.');
      return null;
    }
  };

  const disconnectFromSSE = () => {
    notificationService.disconnect();
  };

  const isConnected = () => {
    return notificationService.isConnectedToSSE();
  };

  return {
    connectToSSE,
    disconnectFromSSE,
    isConnected,
    notificationService,
  };
};

export const getPrevNotification = async (): Promise<NotificationResponse> => {
  const response = await fetcher<NotificationResponse>({
    url: '/notification',
    method: 'GET',
  });
  return response.data;
};
