/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-02-28 16:04:35
 * @LastEditTime: 2024-02-28 16:35:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\MapContain\Google.tsx
 */

import React, { CSSProperties } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import { MapTypeEnum, mapAks } from '@/utils/dictionary';
import MapContext from './MapContext';
import styles from './index.less';

export type MapContainType = {
  className?: string;
  style?: CSSProperties;
  [key: string]: any;
};

const MapContain: React.FC<MapContainType> = (props) => {
  const { google, className, style, children } = props;

  return (
    <>
      <MapContext.Provider
        value={{
          google,
        }}
      >
        {children}
      </MapContext.Provider>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: mapAks[MapTypeEnum.Google][0].key,
})(MapContain);
