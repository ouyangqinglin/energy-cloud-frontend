import { FC, HtmlHTMLAttributes, useEffect, useRef } from 'react';
import Decoration from '../../Decoration';
import Cell from '../../LayoutCell';
import styles from './index.module.less';
import { ScrollBoard } from '@jiaminghi/data-view-react';

const AlarmList: FC = () => {
  const config = {
    header: ['告警设备', '告警内容', '告警时间', '告警等级'],
    data: [
      ['smart215', 'PCS掉线', '2023.03.10  12:45:59', `<div className=${styles.circle}></div>一级`],
      ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
      ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
      ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
      ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
      ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
      ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
      ['行8列1', '<span style="color:#e062ae;">行8列2</span>', '行8列3'],
      ['<span style="color:#e690d1;">行9列1</span>', '行9列2', '行9列3'],
      ['行10列1', '<span style="color:#e7bcf3;">行10列2</span>', '行10列3'],
    ],
    headerBGC:
      'linear-gradient(90deg,rgba(8, 139, 255, 0) 0%,rgba(8, 139, 255, 0.2) 53%,rgba(8, 139, 255, 0) 100%)',
    oddRowBGC:
      'linear-gradient(90deg, rgba(8,139,255,0) 0%, rgba(8,139,255,0.12) 53%, rgba(8,139,255,0) 100%)',
    evenRowBGC: '',
    headerHeight: 32,
    waitTime: 3000,
    columnWidth: [90, 90, 135, 85],
    rowNum: 4,
    align: ['center'],
  };

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
