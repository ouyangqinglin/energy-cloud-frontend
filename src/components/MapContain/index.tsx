/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-04 18:51:22
 * @LastEditTime: 2023-05-10 17:19:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\MapContain\index.tsx
 */

import type { CSSProperties } from 'react';
import React, { useCallback, useMemo } from 'react';
import AmapLoader from '../AmapLoader';
import { aks } from '@/utils/dictionary';
import styles from './index.less';

export type MapProps = {
  className?: string;
  style?: CSSProperties;
  ready?: () => void;
};

const MapContain: React.FC<MapProps> = (props) => {
  const { style, children, className } = props;

  return (
    <>
      <div className={`${styles.contain} ${className}`} style={style}>
        <AmapLoader version="2.0.5" akey={aks[0].key} securityJsCode={aks[0].securityJsCode}>
          {children}
        </AmapLoader>
      </div>
    </>
  );
};

export default MapContain;
