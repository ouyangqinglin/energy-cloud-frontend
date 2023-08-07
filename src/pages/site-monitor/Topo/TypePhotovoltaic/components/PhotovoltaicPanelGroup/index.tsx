import type { CSSProperties } from 'react';
import { Handle, Position } from 'reactflow';
import BoxText from '../../../components/BoxText';
import IconPower from '../../svg-icon/icon_光伏_正常发电.svg';
import IconStewing from '../../svg-icon/icon_光伏_备用.svg';
import { ExtraNodeData } from '../../../type';
import styles from './index.less';
import { floor, isFunction } from 'lodash';
import { Popover } from 'antd';

const enum PVStatus {
  NOT = 0,
  NORMAL,
}

const promptColumns = [
  {
    label: '编号：',
    value: '#01-06',
    field: 'number',
  },
  {
    label: '逆变器接口：',
    value: 'PV6',
    field: 'number',
  },
  {
    label: '电压：',
    value: '550.3',
    unit: 'V',
    field: 'number',
  },
  {
    label: '电流：',
    value: '3.11',
    unit: 'A',
    field: 'number',
  },
  {
    label: '状态：',
    value: '3.11',
    unit: 'A',
    render: (data) => (data.status > 0 ? '正常发电' : '未发电'),
  },
];

const mockData = [
  {
    id: '1',
    name: '#01-01',
    status: 0,
  },
  {
    id: '2',
    name: '#01-02',
    status: 1,
  },
  {
    id: '3',
    name: '#01-03',
    status: 1,
  },
  {
    id: '4',
    name: '#01-04',
    status: 1,
  },
  {
    id: '5',
    name: '#01-05',
    status: 0,
  },
  {
    id: '6',
    name: '#01-06',
    status: 0,
  },
];

const PhotovoltaicPanelGroup = ({ data }: { data: ExtraNodeData }) => {
  const { rawData } = data;
  const groupUp = [];
  const groupDown = [];

  if (mockData.length <= 1) {
    groupUp.push(...mockData);
  } else {
    const midIndex = floor(mockData.length / 2);
    groupUp.push(...mockData.slice(0, midIndex));
    groupDown.push(...mockData.slice(midIndex, mockData.length));
  }
  return (
    <>
      <div className={styles.wrapper}>
        {groupUp.map(({ id, name, status, ...restData }) => {
          const isPower = status > 0;
          const promptContent = (
            <div className={styles.prompt}>
              {promptColumns.map(({ label, value, field, render }) => {
                return (
                  <div key={label} className={styles.promptItem}>
                    <div className={styles.label}>{label}</div>
                    <div className={styles.value}>
                      {(isFunction(render) && render(restData ?? {})) || value}
                    </div>
                  </div>
                );
              })}
            </div>
          );
          return (
            <div key={id} className={styles.pvPanel}>
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
                <div className={styles.title}>{name}</div>
              </Popover>
            </div>
          );
        })}
      </div>
      <div className={styles.wrapper}>
        {groupDown.map(({ id, name, status, ...restData }) => {
          const isPower = status > 0;
          const promptContent = (
            <div className={styles.prompt}>
              {promptColumns.map(({ label, value, field, render }) => {
                return (
                  <div key={label} className={styles.promptItem}>
                    <div className={styles.label}>{label}</div>
                    <div className={styles.value}>
                      {(isFunction(render) && render(restData ?? {})) || value}
                    </div>
                  </div>
                );
              })}
            </div>
          );
          return (
            <div key={id} className={styles.pvPanel}>
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
                <div className={styles.title}>{name}</div>
              </Popover>
            </div>
          );
        })}
      </div>
      <Handle
        type="target"
        position={Position.Right}
        id="a"
        style={{
          visibility: 'hidden',
          top: 18,
        }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Right}
        isConnectable={true}
        id="b"
        style={{
          visibility: 'hidden',
          top: 71,
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={true}
        id="c"
        style={{
          visibility: 'hidden',
          top: 18,
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={true}
        id="d"
        style={{
          visibility: 'hidden',
          top: 71,
        }}
      />
    </>
  );
};

export default PhotovoltaicPanelGroup;
