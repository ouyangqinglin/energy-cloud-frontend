/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 19:25:45
 * @LastEditTime: 2023-05-05 09:25:54
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\PointSelect\index.tsx
 */

import React from 'react';
import MapContain from '@/components/MapContain';
import { Map } from 'react-bmapgl';
import { Marker } from 'react-bmapgl';

const PointSelect: React.FC = (props) => {
  return (
    <>
      <MapContain>
        <Map style={{ height: 220 }} center={{ lng: 116.404449, lat: 39.914889 }} zoom={12} />
      </MapContain>
    </>
  );
};

export default PointSelect;
