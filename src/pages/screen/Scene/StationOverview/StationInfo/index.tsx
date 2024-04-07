import type { DetailItem } from '@/components/Detail';
import Detail from '@/components/Detail';
import Position from '@/components/ScreenDialog/Position';
import type { ReactNode } from 'react';
import { useState } from 'react';
import styles from './index.less';
import { stationBoxConfig, stationInfoConfig } from './config';
import { isNumber } from 'lodash';
import React from 'react';
import { List } from 'antd';
import { ReactComponent as TriangleIcon } from '@/assets/image/screen/stationOverview/icon_三角形元素.svg';
import type { SiteInfoRes } from '../type';

const StationInfo = React.forwardRef(({ data }: { data: SiteInfoRes }) => {
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
        <span className={styles.label}>{item.label}</span>
      </div>
    );

    const isLocation = item.field === 'address';
    const isValidCoord = isNumber(data.longitude) && isNumber(data.latitude);
    const cursor = isLocation ? 'pointer' : 'default';
    if (isLocation && isValidCoord) {
      item.format = (value): ReactNode => {
        return (
          <span
            className={styles.itemRight}
            title={value}
            onClick={onOpen}
            style={{ cursor, color: '#159AFF', lineHeight: 1.2 }}
          >
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
    <>
      <div className={styles.contentWrapper}>
        <Detail
          colon={false}
          items={gunInfoItem}
          data={data}
          column={1}
          labelStyle={{
            color: 'white',
            height: '36px',
            fontSize: '14px',
          }}
          contentStyle={{
            alignItems: 'center',
            color: 'white',
            height: '36px',
            fontSize: '14px',
          }}
          valueStyle={{
            display: 'flex',
          }}
        />
        <List
          grid={{
            gutter: 16,
            column: 2,
          }}
          dataSource={stationBoxConfig}
          renderItem={(item) => (
            <List.Item>
              <div className={styles.box}>
                <div className={styles.boxTitle}>
                  <TriangleIcon className={styles.icon} />
                  <h1 title={item.label}>{item.label}</h1>
                </div>
                {item.render ? (
                  item.render(data)
                ) : (
                  <div className={styles.boxDescription}>
                    <span className={styles.boxValue}>{data[item.field]}</span>
                    <span className={styles.boxUnit}>{item.unit ?? 'kW'}</span>
                  </div>
                )}
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
        mapType={data?.map}
      />
    </>
  );
});
export default StationInfo;
