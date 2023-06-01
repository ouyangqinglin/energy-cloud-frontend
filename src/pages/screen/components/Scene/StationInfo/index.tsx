import type { DetailItem } from '@/components/Detail';
import Detail from '@/components/Detail';
import Position from '@/pages/screen/components/Position';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { useRequest } from 'umi';
import Decoration from '../../Decoration';
import Cell from '../../LayoutCell';
import { getStationInfo } from './service';
import styles from './index.module.less';
import { DEFAULT_DATA, stationInfoConfig } from './config';
import type { SiteInfoRes } from './type';
import { defaults, isNumber } from 'lodash';
import React from 'react';

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
        <div className={styles.icon} style={{ backgroundImage: `url(${item.icon})` }} />
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

  return (
    <Cell cursor="default" width={400} height={320} left={24} top={58}>
      <Decoration title="站点信息概览">
        <div className={styles.contentWrapper}>
          <Detail
            colon={false}
            items={gunInfoItem}
            data={data}
            column={1}
            labelStyle={{
              color: '#A7B7CA',
              height: '18px',
              lineHeight: '18px',
              fontSize: '14px',
            }}
            contentStyle={{
              color: 'white',
              height: '18px',
              lineHeight: '18px',
              fontSize: '14px',
            }}
          />
        </div>
      </Decoration>
      <Position
        id="1"
        open={open}
        point={{ lng: data.longitude, lat: data.latitude }}
        onCancel={onCancel}
        model="screen"
      />
    </Cell>
  );
});
export default StationInfo;
