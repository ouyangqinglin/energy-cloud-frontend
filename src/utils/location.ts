import defaultSettings from '../../config/defaultSettings';

const isDev = process.env.NODE_ENV === 'development';
const getWsProtocol = () => {
  const { protocol, hostname } = location;
  if (hostname == 'localhost') {
    return 'wss://';
  }
  if (protocol.match(/https/gi)) {
    return 'wss://';
  }
  return 'ws://';
};
export const getWebSocketHost = () => {
  const host = isDev ? '192.168.3.18' : location.host;
  return getWsProtocol() + host + '/prod-api';
};
