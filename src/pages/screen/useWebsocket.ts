import { Connection } from '@/utils/connection';
import { message } from 'antd';
import { useEffect } from 'react';

const useWebsocket = () => {
  const connection = Connection.getInstance({
    // onConnectedSuccess: () => {
    //   message.success({
    //     content: '实时推送连接成功',
    //     style: {
    //       background: 'linear-gradient(275deg, rgba(21,154,255,0.1) 0%, rgba(21,154,255,0.8) 100%)',
    //       color: '#159AFF ',
    //     },
    //     duration: 0,
    //   });
    // },
    // onConnectedError: () => {
    //   message.error('实时推送连接异常');
    // },
  });
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
