import type { CSSProperties } from 'react';
import { Handle, Position } from 'reactflow';
import BoxText from '../../../components/BoxText';
import IconPower from '../../svg-icon/icon_光伏_正常发电.svg';
import IconStewing from '../../svg-icon/icon_光伏_备用.svg';
import { ExtraNodeData } from '../../../type';
import styles from './index.less';
import { floor, isFunction } from 'lodash';
import { Popover } from 'antd';
import { PvPanelVoList } from '../../type';
import { formatMessage } from '@/utils';

const enum PVStatus {
  NOT = 0,
  NORMAL,
}

const promptColumns = [
  {
    label: formatMessage({ id: 'siteMonitor.numberCode', defaultMessage: '编号' }) + '：',
    value: '#01-06',
    field: 'serialNumber',
  },
  {
    label:
      formatMessage({ id: 'siteMonitor.inverterInterface', defaultMessage: '逆变器接口' }) + '：',
    value: 'PV6',
    field: 'inverterPort',
  },
  {
    label: formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' }) + '：',
    value: '550.3',
    unit: 'V',
    field: 'voltage',
  },
  {
    label: formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流' }) + '：',
    value: '3.11',
    unit: 'A',
    field: 'current',
  },
  {
    label: formatMessage({ id: '状态', defaultMessage: '状态' }) + '：',
    value: '3.11',
    unit: 'A',
    render: (data: PvPanelVoList) =>
      data.status > 0
        ? formatMessage({ id: 'siteMonitor.normalGeneration', defaultMessage: '正常发电' })
        : formatMessage({ id: 'siteMonitor.notGeneratingElectricity', defaultMessage: '未发电' }),
  },
];

const PhotovoltaicPanelGroup = ({ data }: { data: ExtraNodeData }) => {
  const { pvPanelData } = data;
  const groupUp: PvPanelVoList[] = [];
  const groupDown: PvPanelVoList[] = [];

  if (pvPanelData && pvPanelData.length <= 1) {
    groupUp.push(...pvPanelData);
  } else if (pvPanelData) {
    const midIndex = floor(pvPanelData.length / 2);
    groupUp.push(...pvPanelData.slice(0, midIndex));
    groupDown.push(...pvPanelData.slice(midIndex, pvPanelData.length));
  }
  return (
    <>
      <div className={styles.wrapper}>
        {groupUp.map((pvData) => {
          const isPower = pvData.status > 0;
          const promptContent = (
            <div className={styles.prompt}>
              {promptColumns.map(({ label, field, render }) => {
                return (
                  <div key={label} className={styles.promptItem}>
                    <div className={styles.label}>{label}</div>
                    <div className={styles.value}>
                      {(isFunction(render) && render(pvData ?? {})) || (field && pvData[field])}
                    </div>
                  </div>
                );
              })}
            </div>
          );
          return (
            <div key={pvData.serialNumber + pvData.inverterPort} className={styles.pvPanel}>
              <Popover placement="right" content={promptContent} trigger="hover">
                <div
                  className={styles.icon}
                  style={{
                    backgroundImage: `url(${isPower ? IconPower : IconStewing})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                  }}
                />
                <div className={styles.title}>{pvData.serialNumber}</div>
              </Popover>
            </div>
          );
        })}
      </div>
      <div className={styles.wrapper}>
        {groupDown.map((pvData) => {
          const isPower = pvData.status > 0;
          const promptContent = (
            <div className={styles.prompt}>
              {promptColumns.map(({ label, field, render }) => {
                return (
                  <div key={label} className={styles.promptItem}>
                    <div className={styles.label}>{label}</div>
                    <div className={styles.value}>
                      {(isFunction(render) && render(pvData ?? {})) || (field && pvData[field])}
                    </div>
                  </div>
                );
              })}
            </div>
          );
          return (
            <div key={pvData.serialNumber + pvData.inverterPort} className={styles.pvPanel}>
              <Popover placement="right" content={promptContent} trigger="hover">
                <div
                  className={styles.icon}
                  style={{
                    backgroundImage: `url(${isPower ? IconPower : IconStewing})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                  }}
                />
                <div className={styles.title}>{pvData.serialNumber}</div>
              </Popover>
            </div>
          );
        })}
      </div>
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        style={{
          visibility: 'hidden',
        }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={true}
        id="left"
        style={{
          visibility: 'hidden',
        }}
      />
    </>
  );
};

export default PhotovoltaicPanelGroup;
