/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-13 13:50:09
 * @LastEditTime: 2023-05-16 08:51:12
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Position\index.tsx
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from 'antd';
import Dialog from '@/components/Dialog';
import MapContain from '@/components/MapContain';
import { Map, Marker } from '@uiw/react-amap';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import { getPoint } from '@/utils/map';
import { formatMessage, getLocale } from '@/utils';
import { AmapLang } from '@/utils/dictionary';

export type PositionProps = BusinessDialogProps & {
  point: AMap.LngLat;
};

const Position: React.FC<PositionProps> = (props) => {
  const { point, open, onCancel, model } = props;
  const [zoom] = useState(15);
  const [center, setCenter] = useState<AMap.LngLat>();

  const lang = useMemo(() => {
    return getLocale().isZh ? '' : AmapLang.En;
  }, []);

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
        title={formatMessage({ id: 'siteManage.siteList.siteAddress', defaultMessage: '站点地址' })}
        open={open}
        onCancel={onCancel}
        footer={null}
        destroyOnClose
      >
        <MapContain style={{ height: '100%' }}>
          <Map center={center} zoom={zoom} lang={lang}>
            {center && <Marker position={center} />}
          </Map>
        </MapContain>
      </Dialog>
    </>
  );
};

export default Position;
