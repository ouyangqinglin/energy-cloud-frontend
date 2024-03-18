/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 09:11:33
 * @LastEditTime: 2024-03-18 10:54:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\Entity\ChargeMaster\index.tsx
 */

import React from 'react';
import { EntityType } from '../../type';
import Model from '../../Model';
import { ConfigType } from '../../type';
import { formatMessage } from '@/utils';
import { DeviceProductTypeEnum } from '@/utils/dictionary';
import ChargeImg from '@/assets/image/station/charge-master/charge.png';
import EnvironmentImg from '@/assets/image/station/charge-2gun/environment.png';
import EnvironmentLineImg from '@/assets/image/station/charge-master/environment-line.png';
import PowerImg from '@/assets/image/station/charge-2gun/power.png';
import PowerLineImg from '@/assets/image/station/charge-master/power-line.png';

const configs: ConfigType[] = [
  {
    label: formatMessage({ id: 'device.environmentalInformation', defaultMessage: '环境信息' }),
    productTypeId: DeviceProductTypeEnum.ChargeMaster,
    position: { top: 86, left: 71 },
    icon: EnvironmentImg,
    line: EnvironmentLineImg,
    linePosition: { top: 22, left: 110 },
    data: [{ field: 'mt1' }, { field: 'mt2' }, { field: 'mh' }],
  },
  {
    label: formatMessage({ id: 'device.powerInformation', defaultMessage: '功率信息' }),
    productTypeId: DeviceProductTypeEnum.ChargeMaster,
    position: { top: 86, left: 712 },
    icon: PowerImg,
    line: PowerLineImg,
    linePosition: { top: 22, left: -149 },
    data: [{ field: 'Ua' }, { field: 'Ub' }, { field: 'Uc' }],
  },
];

const ChargeMaster: React.FC<EntityType> = (props) => {
  const { ...restProps } = props;

  return (
    <>
      <Model
        modelStyle={{
          height: '300px',
          backgroundImage: `url(${ChargeImg})`,
          backgroundSize: '22%',
        }}
        configs={configs}
        {...restProps}
      ></Model>
    </>
  );
};

export default ChargeMaster;
