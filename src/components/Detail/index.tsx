/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-26 11:33:11
 * @LastEditTime: 2023-07-19 09:56:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\index.tsx
 */

import React from 'react';
import { default as DetailCom, DetailItem, DetailProps } from './Detail';
import Group, { GroupItem, GroupProps } from './Group';
import LineLabel, { LineLabelProps } from './LineLabel';

export { DetailItem, DetailProps, GroupItem, GroupProps, LineLabelProps };

type CompoundedComponent = React.FC<DetailProps> & {
  Group: React.FC<GroupProps>;
  Label: React.FC<LineLabelProps>;
};

const Detail = DetailCom as CompoundedComponent;

Detail.Group = Group;
Detail.Label = LineLabel;

export default Detail;
