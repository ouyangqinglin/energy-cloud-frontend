const isDev = process.env.NODE_ENV === 'development';
const COMMON_PATH = '/prod-api';
const getWsProtocol = () => {
  const { protocol } = location;
  if (protocol.match(/https/gi)) {
    return 'wss://';
  }
  return 'ws://';
};
export const getWebSocketHost = () => {
  const host = isDev ? '192.168.3.18' : location.host;
  return getWsProtocol() + host + COMMON_PATH;
};
