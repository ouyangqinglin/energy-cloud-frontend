/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 18:51:22
 * @LastEditTime: 2023-05-05 14:30:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\MapContain\index.tsx
 */

import React, { useCallback, useMemo } from 'react';
import { MapApiLoaderHOC } from 'react-bmapgl';
import { aks } from '@/utils/dictionary';

export type MapProps = {
  ready?: () => void;
};

const MapContain: React.FC<MapProps> = (props) => {
  const MyMap = useCallback(() => {
    if (props.ready) {
      props.ready();
    }
    return <>{props.children}</>;
  }, [props]);

  const Component = useMemo(() => MapApiLoaderHOC({ ak: aks[0] })(MyMap), []);

  // return <Component />;
  return <>{props.children}</>;
};

export default MapContain;
