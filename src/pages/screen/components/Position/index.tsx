/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-13 13:50:09
 * @LastEditTime: 2023-05-13 14:25:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Position\index.tsx
 */
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import ScreenDialog from '@/components/ScreenDialog';
import MapContain from '@/components/MapContain';
import { Map, Marker } from '@uiw/react-amap';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import { getPoint } from '@/utils/map';

export type PositionProps = BusinessDialogProps & {
  point: AMap.LngLat;
};

const Position: React.FC<PositionProps> = (props) => {
  const { point, open, onCancel, model } = props;
  const [zoom] = useState(15);
  const Component = model === 'screen' ? ScreenDialog : Modal;
  const [center, setCenter] = useState<AMap.LngLat>();

  useEffect(() => {
    if (point && point.lng && point.lat) {
      getPoint(point.lng, point.lat).then((res) => {
        setCenter(res);
      });
    }
  }, [point]);

  return (
    <>
      <Component
        title="站点地址"
        open={open}
        onCancel={onCancel}
        width={model === 'screen' ? '62.5vw' : '1200px'}
        wrapClassName={model === 'screen' ? '' : 'dialog-equipment'}
        footer={null}
        destroyOnClose
      >
        <MapContain style={{ height: '36vw' }}>
          <Map center={center} zoom={zoom}>
            {center && <Marker position={center} />}
          </Map>
        </MapContain>
      </Component>
    </>
  );
};

export default Position;
