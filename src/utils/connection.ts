import { getAccessToken } from '@/access';
import { remove, uniqueId } from 'lodash';

export type receivedMessageCallback = (msg: any) => void;

const enum ExitCode {
  CLOSE = 3001,
  NETWORK_ERROR,
  OTHER_ERROR,
}

const EXIT_REASON = {
  [ExitCode.CLOSE]: 'closed by user',
};

const enum ConnectStatus {
  UNCONNECTED,
  OPEN,
  CLOSE,
  CLOSING,
  CONNECTING,
  SUCCESS,
}

const enum MessageEventType {
  // 设备实时数据
  DEVICE_REAL_TIME_DATA = 1,
  // 设备告警数据
  DEVICE_EVENT_DATA,
  // 心跳消息
  HEARTBEAT,
  // 提示信息, 连接成功
  TIPS,
}

type MessageType<T = string> = {
  type: MessageEventType;
  data: T;
};

const MAX_RETRY = 3;
const RETRY_INTERVAL = 3000;

export class Connection {
  static retryCount = 0;

  static instance: Connection | null = null;

  static connectedStatus: ConnectStatus = ConnectStatus.UNCONNECTED;

  private client: WebSocket | null = null;

  private receivedMessageCallbacks: receivedMessageCallback[] = [];

  private url?: string = '';

  static getInstance() {
    if (!this.instance) {
      return (this.instance = new Connection());
    }
    return this.instance;
  }

  constructor(url?: string) {
    this.url = url;
  }

  private tryConnectedUntilSuccess() {
    try {
      console.log('websocket: ', 'before connected');
      const token = getAccessToken();
      if (!token) {
        throw Error('Connection: token is invalid');
      }
      Connection.connectedStatus = ConnectStatus.CONNECTING;
      const url = this.url;
      this.client = new WebSocket(
        url ? `${url}/${token}` : `ws://192.168.3.18/prod-api/websocket/${token}`,
      );
      this.client.onerror = (e) => {
        console.log('websocket: ', 'connected error', e);
      };
      this.client.onclose = ({ code, reason }) => {
        Connection.connectedStatus = ConnectStatus.CLOSE;
        if (code === ExitCode.CLOSE) {
          this.reset();
        } else if (Connection.retryCount < MAX_RETRY) {
          setTimeout(() => {
            Connection.retryCount++;
            this.tryConnectedUntilSuccess();
          }, RETRY_INTERVAL);
        }
        console.log('websocket: ', 'close', code, reason);
      };
      this.client.onopen = (e) => {
        console.log('websocket: ', 'connected', e);
      };
      this.client.onmessage = (rawData: MessageEvent<MessageType>) => {
        if (!this.receivedMessageCallbacks.length) {
          return;
        }
        const message = rawData.data ?? {};
        const { type } = message;
        if (type === MessageEventType.HEARTBEAT || type === MessageEventType.TIPS) {
          return;
        }

        this.receivedMessageCallbacks.forEach((cb) => {
          cb(message);
        });
      };
    } catch (error) {
      console.log('websocket: catch error', error);
    }
  }

  isConnecting() {
    return Connection.connectedStatus !== ConnectStatus.UNCONNECTED;
  }

  reconnect() {
    if (this.isConnecting()) {
      return;
    }
    this.tryConnectedUntilSuccess();
  }

  reset() {
    this.receivedMessageCallbacks.length = 0;
    Connection.retryCount = 0;
    Connection.connectedStatus = ConnectStatus.UNCONNECTED;
  }

  close() {
    this.client?.close(ExitCode.CLOSE, EXIT_REASON[ExitCode.CLOSE]);
  }

  mock() {
    this.receivedMessageCallbacks.forEach((cb) => {
      cb({
        data: {
          deviceId: uniqueId(),
          deviceName: '组串式逆变器',
          eventName: '测试告警' + uniqueId(),
          eventTime: '2023-05-10 11:06:59',
          eventType: 'info',
        },
        type: 2,
      } as any);
    });
    setInterval(() => {
      this.receivedMessageCallbacks.forEach((cb) => {
        cb({
          data: {
            deviceId: uniqueId(),
            deviceName: '组串式逆变器',
            eventName: '测试告警' + uniqueId(),
            eventTime: '2023-05-10 11:06:59',
            eventType: 'info',
          },
          type: 2,
        } as any);
      });
    }, 10000);
  }

  sendMessage(data: string) {
    this.client?.send(data);
  }

  addReceivedMessageCallback(callback: receivedMessageCallback) {
    this.receivedMessageCallbacks.push(callback);
  }

  removeReceivedMessageCallback(callback: receivedMessageCallback) {
    remove(this.receivedMessageCallbacks, (fn) => {
      return fn === callback;
    });
  }
}
