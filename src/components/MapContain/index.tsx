/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 18:51:22
 * @LastEditTime: 2023-05-04 19:36:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\MapContain\index.tsx
 */

import React from 'react';
import { MapApiLoaderHOC } from 'react-bmapgl';
import { aks } from '@/utils/dictionary';

const MapContain: React.FC = (props) => {
  const MyMap = () => {
    return <>{props.children}</>;
  };

  const Component = MapApiLoaderHOC({ ak: aks[0] })(MyMap);

  return <Component />;
};

export default MapContain;
