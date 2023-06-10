import type { DetailItem } from '@/components/Detail';
import Detail from '@/components/Detail';
import Position from '@/components/ScreenDialog/Position';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useRequest } from 'umi';
import { getStationInfo } from './service';
import styles from './index.less';
import { DEFAULT_DATA, stationInfoConfig } from './config';
import type { SiteInfoRes } from './type';
import { defaults, isNumber } from 'lodash';
import React from 'react';
import { List } from 'antd';
import { ReactComponent as TriangleIcon } from '@/assets/image/screen/stationOverview/icon_三角形元素.svg';

const StationInfo = React.forwardRef(() => {
  const { data: rawData = {} as SiteInfoRes } = useRequest(getStationInfo);
  const data: SiteInfoRes = defaults(rawData, DEFAULT_DATA);
  const formatData = () => {
    const { energyStorageCapacity, energyStoragePower } = data;
    data.energyStorageCapacityFront = `${energyStoragePower}kW/${energyStorageCapacity}kWh`;
  };
  formatData();

  const [open, setOpen] = useState(false);
  const onCancel = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  const gunInfoItem: DetailItem[] = stationInfoConfig.map((item) => {
    const LabelComponent = (
      <div className={styles.itemLeft}>
        <div className={styles.iconWrapper}>
          <div className={styles.icon} style={{ backgroundImage: `url(${item.icon})` }} />
        </div>
        <span>{item.label}</span>
      </div>
    );

    const isLocation = item.field === 'address';
    const isValidCoord = isNumber(data.longitude) && isNumber(data.latitude);
    const cursor = isLocation ? 'pointer' : 'default';
    if (isLocation && isValidCoord) {
      item.format = (value): ReactNode => {
        return (
          <span onClick={onOpen} style={{ cursor, color: '#159AFF' }}>
            {value}
          </span>
        );
      };
    }

    return {
      label: LabelComponent,
      field: item.field,
      span: 0,
      format: item.format,
    };
  });

  const dataSource = [
    {
      title: '变压器容量',
      value: 200,
    },
    {
      title: '光伏装机量',
      value: 400,
    },
    {
      title: '储能装机量',
      value: 500,
    },
    {
      title: '充电桩装机量',
      value: 300,
    },
  ];

  return (
    <>
      <div className={styles.contentWrapper}>
        <Detail
          colon={false}
          items={gunInfoItem}
          data={data}
          column={1}
          labelStyle={{
            color: 'white',
            height: '36px;',
            lineHeight: '36px;',
            fontSize: '14px',
          }}
          contentStyle={{
            alignItems: 'center',
            color: 'white',
            height: '36px;',
            lineHeight: '36px;',
            fontSize: '14px',
          }}
        />
        <List
          grid={{
            gutter: 16,
            column: 2,
          }}
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item>
              <div className={styles.box}>
                <div className={styles.boxTitle}>
                  <TriangleIcon className={styles.icon} />
                  <h1>{item.title}</h1>
                </div>
                <div className={styles.boxDescription}>
                  <span className={styles.boxValue}>{item.value}</span>
                  <span className={styles.boxUnit}>kw</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <Position
        id="1"
        open={open}
        point={{ lng: data.longitude, lat: data.latitude }}
        onCancel={onCancel}
        model="screen"
      />
    </>
  );
});
export default StationInfo;
