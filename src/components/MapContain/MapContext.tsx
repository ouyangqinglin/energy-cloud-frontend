/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-02-28 16:21:01
 * @LastEditTime: 2024-02-28 16:21:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\MapContain\MapContext.tsx
 */

import { createContext } from 'react';

export type MapContextType = {
  google: any;
};

const MapContext = createContext<MapContextType>({
  google: null,
});

export default MapContext;
