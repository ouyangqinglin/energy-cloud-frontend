/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-13 13:50:09
 * @LastEditTime: 2023-05-15 17:06:48
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Position\index.tsx
 */
import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import Dialog from '@/components/Dialog';
import MapContain from '@/components/MapContain';
import { Map, Marker } from '@uiw/react-amap';
import type { BusinessDialogProps } from '@/components/Dialog';
import { getPoint } from '@/utils/map';

export type PositionProps = BusinessDialogProps & {
  point: AMap.LngLat;
};

const Position: React.FC<PositionProps> = (props) => {
  const { point, open, onCancel, model } = props;
  const [zoom] = useState(15);
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
      <Dialog
        model={model}
        title="站点地址"
        open={open}
        onCancel={onCancel}
        footer={null}
        destroyOnClose
      >
        <MapContain style={{ height: '755px' }}>
          <Map center={center} zoom={zoom}>
            {center && <Marker position={center} />}
          </Map>
        </MapContain>
      </Dialog>
    </>
  );
};

export default Position;
