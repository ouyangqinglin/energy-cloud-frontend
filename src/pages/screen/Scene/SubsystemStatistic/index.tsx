import React, { useMemo, useState } from 'react';
import DecorationCarousel from '../../components/DecorationCarousel';
import Cell from '../../components/LayoutCell';
import ChargingStation from './ChargingStation';
import EnergyStorage from './EnergyStorage';
import Photovoltaic from './Photovoltaic';
import Diesel from './Diesel';
import { formatMessage } from '@/utils';
import type { UnitType } from '@/models/siteType';

type SubsystemProps = {
  siteTypeConfig: UnitType;
};
const SubsystemStatistic: React.FC<SubsystemProps> = (props) => {
  const { siteTypeConfig } = props;
  const [activeBtn, setActiveBtn] = useState(1);

  const child = useMemo(() => {
    const result = [];
    if (siteTypeConfig.hasPv || siteTypeConfig.hasFan) {
      result.push(<Photovoltaic />);
    }
    if (siteTypeConfig.hasDiesel) {
      result.push(<Diesel />);
    }
    if (siteTypeConfig.hasEnergy) {
      result.push(<EnergyStorage />);
    }
    if (siteTypeConfig.hasCharge) {
      result.push(<ChargingStation />);
    }
    return result;
  }, [siteTypeConfig]);

  return (
    <Cell cursor="default" width={400} height={635} left={1515} top={426}>
      <DecorationCarousel
        onSiteTypeButtonChange={setActiveBtn}
        panelStyle={{ padding: 0 }}
        siteTypeConfig={siteTypeConfig}
        valueType={'siteType'}
        title={formatMessage({
          id: 'screen.subsystemRunningData',
          defaultMessage: '子系统运行数据',
        })}
      >
        {child}
      </DecorationCarousel>
    </Cell>
  );
};
export default SubsystemStatistic;
