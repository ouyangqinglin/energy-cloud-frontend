import { Connection } from '@/utils/connection';
import { useEffect } from 'react';

const useWebsocket = () => {
  const connection = Connection.getInstance();

  const close = () => {
    connection.close();
  };

  useEffect(() => {
    window.addEventListener('onbeforeunload', close);
    return () => {
      connection.close();
      connection.reset();
      window.removeEventListener('onbeforeunload', close);
    };
  });

  return {
    connection,
  };
};
export default useWebsocket;
