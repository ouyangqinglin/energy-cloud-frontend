import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Decoration from '../../Decoration';
import Cell from '../../LayoutCell';
import styles from './index.module.less';
import ScrollBoard from '@chuxiaguo/data-view-react-plus/es/scrollBoard';
import useWebsocket from '@/pages/screen/useWebsocket';
import { defaults } from 'lodash';
import type { AlarmLevel } from './config';
import { alarmMap, DEFAULT_DATA } from './config';

const MAX_DISPLAY_NUMBER = 10;

const AlarmList: FC = () => {
  const [data, setData] = useState<[string, string, string][]>([]);
  const config = {
    header: ['告警设备', '告警内容', '告警时间'],
    data,
    headerBGC:
      'linear-gradient(90deg,rgba(8, 139, 255, 0) 0%,rgba(8, 139, 255, 0.2) 53%,rgba(8, 139, 255, 0) 100%)',
    oddRowBGC:
      'linear-gradient(90deg, rgba(8,139,255,0) 0%, rgba(8,139,255,0.12) 53%, rgba(8,139,255,0) 100%)',
    evenRowBGC: '',
    headerHeight: 32,
    waitTime: 10000,
    columnWidth: [133, 133, 133],
    rowNum: 4,
    align: ['center'],
  };

  const getNodeTemplate = (
    level: AlarmLevel,
  ) => `<div style="color: ${alarmMap[level].color}; display: flex; align-items: center;"><div style="display: inline-block;
    width: 5px;
    height: 5px;
    margin-right: 5px;
    background: ${alarmMap[level].color};
    border-radius: 50%;">
  </div>${alarmMap[level].text}<div>`;

  const formatReceivedData = (mockData: any) => {
    // const mockData = {
    //   data: {
    //     deviceId: uniqueId(),
    //     deviceName: '组串式逆变器',
    //     eventName: '测试告警' + uniqueId(),
    //     eventTime: '2023-05-10 11:06:59',
    //     eventType: 'info',
    //   },
    //   type: 2,
    // };
    // console.log('ws: ', mockData);
    if (mockData.type !== 2) {
      return;
    }
    const newData = [...data];
    const { deviceName, eventName, eventTime } = defaults(mockData.data, DEFAULT_DATA);
    newData.unshift([deviceName, eventName, eventTime]);
    if (newData.length > MAX_DISPLAY_NUMBER) {
      newData.pop();
    }
    setData(newData);
  };

  const { connection } = useWebsocket();
  useEffect(() => {
    connection.addReceivedMessageCallback(formatReceivedData);
    return () => {
      connection.removeReceivedMessageCallback(formatReceivedData);
    };
  });
  // const close = () => {
  //   connection.close();
  // };
  // const open = () => {
  //   connection.reconnect();
  // };
  // const mock = () => {
  //   connection.mock();
  // };

  return (
    <Cell cursor="default" width={400} height={240} left={24} top={764}>
      <Decoration title="实时告警">
        <div className={styles.tableWrapper}>
          <ScrollBoard config={config} style={{ width: '384px', height: '184px' }} />
        </div>
      </Decoration>
      {/* <Button type="primary" onClick={close}>
        close
      </Button>
      <Button type="primary" onClick={open}>
        open
      </Button>
      <Button type="primary" onClick={mock}>
        接受消息
      </Button> */}
    </Cell>
  );
};
export default AlarmList;
