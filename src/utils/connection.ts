import { getAccessToken } from '@/access';

export type receivedMessageCallback = (msg: string) => void;

const enum ExitCode {
  CLOSE = 3001,
  NETWORK_ERROR,
  OTHER_ERROR,
}

const MAX_RETRY = 2;
const RETRY_INTERVAL = 3000;

export class Connection {
  static retryCount = 0;

  static instance: Connection | null = null;

  private client: WebSocket | null = null;

  private receivedMessageCallbacks: receivedMessageCallback[] = [];

  static getInstance() {
    if (!this.instance) {
      return (this.instance = new Connection());
    }
    return this.instance;
  }

  constructor(url?: string) {
    this.tryConnectedUntilSuccess(url);
  }

  private tryConnectedUntilSuccess(url?: string) {
    try {
      console.log('websocket: ', 'before connected');
      const token = getAccessToken();
      if (!token) {
        throw Error('Connection: token is invalid');
      }

      this.client = new WebSocket(
        url ? `${url}/${token}` : `ws://192.168.3.18/prod-api/websocket/${token}`,
      );
      this.client.onerror = (e) => {
        console.log('websocket: ', 'error', e);
      };
      this.client.onclose = ({ code, reason }) => {
        if (code === ExitCode.CLOSE) {
          this.reset();
        } else if (Connection.retryCount < MAX_RETRY) {
          setTimeout(() => {
            Connection.retryCount++;
            this.tryConnectedUntilSuccess(url);
          }, RETRY_INTERVAL);
        }
        console.log('websocket: ', 'close', code, reason);
      };
      this.client.onopen = (e) => {
        console.log('websocket: ', 'connected');
      };
      this.client.onmessage = (rawData) => {
        if (!this.receivedMessageCallbacks.length) {
          return;
        }
        this.receivedMessageCallbacks.forEach((cb) => {
          cb(rawData.data);
        });
      };
    } catch (error) {
      console.log('websocket: ', error);
    }
  }

  reset() {
    this.client = null;
    this.receivedMessageCallbacks.length = 0;
    Connection.retryCount = 0;
    Connection.instance = null;
  }

  close() {
    this.client?.close(ExitCode.CLOSE);
  }

  sendMessage(data: string) {
    this.client?.send(data);
  }

  addReceivedMessageCallback(callback: receivedMessageCallback) {
    this.receivedMessageCallbacks.push(callback);
  }
}
