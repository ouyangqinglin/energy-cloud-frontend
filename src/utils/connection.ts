import { getAccessToken } from '@/access';
import { remove, uniqueId } from 'lodash';
import { getWebSocketHost } from './location';

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

export const enum MessageEventType {
  // 设备实时数据
  DEVICE_REAL_TIME_DATA = 1,
  // 设备告警数据
  DEVICE_EVENT_DATA,
  // 心跳消息
  HEARTBEAT,
  // 提示信息, 连接成功
  TIPS,
  // 设备日志数据
  DEVICE_LOG,
}

export enum RequestCommandEnum {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
}

export enum RequestMsgType {
  PROPERTY = 'post_properties',
  EVENT = 'post_event',
}

type RequestMessageBodyType = {
  command: RequestCommandEnum;
  device?: string;
  keys?: string[];
  msgType?: RequestMsgType;
  product?: string;
  [key: string]: any;
};

type RequestMessageType = {
  type: MessageEventType;
  data: RequestMessageBodyType;
};

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

  private clientResolve: any = null;
  private clientReady: Promise<any> | null = null;

  static getInstance() {
    if (!this.instance) {
      return (this.instance = new Connection());
    }
    return this.instance;
  }

  constructor(url?: string) {
    this.url = url;
    this.initClientReady();
  }

  private initClientReady() {
    this.clientReady = new Promise((resolve) => {
      this.clientResolve = resolve;
    });
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
        url ? `${url}/${token}` : `${getWebSocketHost()}/websocket/${token}`,
      );
      this.client.onerror = (e) => {
        this.initClientReady();
        console.log('websocket: ', 'connected error', e);
      };
      this.client.onclose = ({ code, reason }) => {
        this.initClientReady();
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
        this.clientResolve();
        console.log('websocket: ', 'connected', e);
      };
      this.client.onmessage = (rawData: MessageEvent<string>) => {
        if (!this.receivedMessageCallbacks.length) {
          return;
        }
        let message: MessageType;
        let type;
        try {
          message = JSON.parse(rawData.data ?? '{}');
          type = message.type;
        } catch (e) {}
        if (type === MessageEventType.HEARTBEAT || type === MessageEventType.TIPS) {
          // return;
        }

        this.receivedMessageCallbacks.forEach((cb) => {
          cb(message || rawData.data);
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

  mock(data: any, time: number) {
    const log = {
      data: [
        {
          createTime: '2023-06-20 19:33:54',
          logContent: '充电设备接口状态产生变化:由空闲变为占用(未充电)',
          deviceName: '永泰分体式充电枪_4_02',
        },
      ],
      type: 5,
    };
    this.receivedMessageCallbacks.forEach((cb) => {
      cb(data ? data : (log as any));
    });

    setInterval(
      () => {
        this.receivedMessageCallbacks.forEach((cb) => {
          cb(data ? data : (log as any));
        });
      },
      time ? time : 10000,
    );
  }

  sendMessage(data: RequestMessageType) {
    this.clientReady?.then(() => {
      this.client?.send(JSON.stringify(data));
    });
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
