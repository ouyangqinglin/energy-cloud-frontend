import { isNil } from 'lodash';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import DescriptionCard from '../components/CardDescription';
import { config } from './config';
import { getElectricityStatistics } from './service';

// const DEFAULT_VALUE = {
//   photovoltaic: {
//     charge: '--',
//     power: '--',
//   },
//   storedEnergy: {
//     charge: '--',
//     discharge: '--',
//     power: '--',
//     dischargeableCapacity: '--',
//   },
//   electricSupply: {
//     charge: '--',
//     discharge: '--',
//     power: '--',
//   },
//   load: {
//     charge: '--', //当日用电量
//     chargingPileCharge: '--', //充电桩用电量
//     power: '--', //用电功率
//     chargingPilePower: '--', //充电桩功率
//   },
// };

const Statistics = ({ siteId }: { siteId?: number }) => {
  const { data = {}, run } = useRequest(getElectricityStatistics, {
    manual: true,
  });

  useEffect(() => {
    if (!isNil(siteId)) {
      run(siteId);
    }
  }, [run, siteId]);

  return (
    <>
      {config.map((column) => {
        return (
          <DescriptionCard data={data?.[column.field] ?? {}} key={column.title} config={column} />
        );
      })}
    </>
  );
};

export default Statistics;
