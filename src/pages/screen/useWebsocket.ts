import { Connection } from '@/utils/connection';
import { useEffect } from 'react';

const useWebsocket = (autoClose?: boolean) => {
  const connection = Connection.getInstance({});
  connection.reconnect();

  const close = () => {
    connection.close();
  };

  useEffect(() => {
    window.addEventListener('onbeforeunload', close);
    return () => {
      if (autoClose) {
        connection.close();
      }
      window.removeEventListener('onbeforeunload', close);
    };
  }, [autoClose]);

  return {
    connection,
  };
};
export default useWebsocket;
