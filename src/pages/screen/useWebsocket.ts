import { Connection } from '@/utils/connection';
import { useEffect } from 'react';

const useWebsocket = () => {
  const connection = Connection.getInstance();
  connection.reconnect();

  const close = () => {
    connection.close();
  };

  useEffect(() => {
    window.addEventListener('onbeforeunload', close);
    return () => {
      connection.close();
      window.removeEventListener('onbeforeunload', close);
    };
  }, []);

  return {
    connection,
  };
};
export default useWebsocket;
