const isDev = process.env.NODE_ENV === 'development';
const COMMON_PATH = '/prod-api';
export const getWebSocketHost = () => {
  const host = isDev ? 'ws://192.168.3.18' : location.origin;
  return host + COMMON_PATH;
};
