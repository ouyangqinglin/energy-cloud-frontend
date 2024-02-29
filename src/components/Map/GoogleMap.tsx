/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-02-28 16:40:25
 * @LastEditTime: 2024-02-28 16:40:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Map\GoogleMap.tsx
 */

import React from 'react';
import { Map } from 'google-maps-react';
import styles from './index.less';

type GoogleMapType = typeof Map;

const GoogleMap: React.FC<GoogleMapType> = (props) => {
  const { style } = props;

  return (
    <>
      <div className={styles.map} style={style}>
        <Map {...props} />
      </div>
    </>
  );
};

export default GoogleMap;
