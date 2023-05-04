import { FC } from 'react';
import Decoration from '../../Decoration';
import Cell from '../../LayoutCell';
import styles from './index.module.less';
import ScrollBoard from '@chuxiaguo/data-view-react-plus/es/scrollBoard';
export const enum AlarmLevel {
  NORMAL,
  WARNING,
  ERROR,
}

const alarmMap = {
  [AlarmLevel.ERROR]: {
    color: '#ff5656',
    text: '一级',
  },
  [AlarmLevel.WARNING]: {
    color: '#FFC22A',
    text: '二级',
  },
  [AlarmLevel.NORMAL]: {
    color: '#11DA81',
    text: '三级',
  },
};

const AlarmList: FC = () => {
  const config = {
    header: ['告警设备', '告警内容', '告警时间', '告警等级'],
    data: [
      ['smart215', 'PCS掉线', '2023.03.10  12:45:59', 0],
      ['smart215', 'PCS掉线', '2023.03.10  12:45:59', 1],
      ['smart215', 'PCS掉线', '2023.03.10  12:45:59', 2],
      ['smart215', 'PCS掉线', '2023.03.10  12:45:59', 0],
      ['smart215', 'PCS掉线', '2023.03.10  12:45:59', 1],
    ],
    headerBGC:
      'linear-gradient(90deg,rgba(8, 139, 255, 0) 0%,rgba(8, 139, 255, 0.2) 53%,rgba(8, 139, 255, 0) 100%)',
    oddRowBGC:
      'linear-gradient(90deg, rgba(8,139,255,0) 0%, rgba(8,139,255,0.12) 53%, rgba(8,139,255,0) 100%)',
    evenRowBGC: '',
    headerHeight: 32,
    waitTime: 10000,
    columnWidth: [90, 90, 135, 85],
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
  const handleAlarmLevel = () => {
    config.data.forEach((ceils) => {
      const level = ceils[3];
      ceils.pop();
      ceils.push(getNodeTemplate(level as AlarmLevel));
    });
  };
  handleAlarmLevel();

  return (
    <Cell width={400} height={240} left={24} top={808}>
      <Decoration title="实时告警">
        <div className={styles.tableWrapper}>
          <ScrollBoard config={config} style={{ width: '384px', height: '184px' }} />
        </div>
      </Decoration>
    </Cell>
  );
};
export default AlarmList;
