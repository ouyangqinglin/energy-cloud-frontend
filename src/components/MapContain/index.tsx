/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 18:51:22
 * @LastEditTime: 2023-05-10 17:19:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\MapContain\index.tsx
 */

import React, { CSSProperties, useCallback, useMemo } from 'react';
import AmapLoader from '../AmapLoader';
import { aks } from '@/utils/dictionary';

export type MapProps = {
  style?: CSSProperties;
  ready?: () => void;
};

const MapContain: React.FC<MapProps> = (props) => {
  return (
    <>
      <div style={{ height: '220px', ...props.style }}>
        <AmapLoader version="2.0.5" akey={aks[0].key} securityJsCode={aks[0].securityJsCode}>
          {props.children}
        </AmapLoader>
      </div>
    </>
  );
};

export default MapContain;
