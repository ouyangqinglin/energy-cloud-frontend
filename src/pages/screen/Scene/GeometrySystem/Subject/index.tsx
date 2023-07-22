import Cell from '@/pages/screen/components/LayoutCell';
import { useState } from 'react';
import { config } from './config';
import type { SystemDiagramRes } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import { SubSystemType } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import FlowPath from '../FlowPath';
const Subject = ({ data }: { data?: SystemDiagramRes }) => {
  const [cellList, setCellList] = useState([...config]);

  // 切换充电桩和负载
  if (data) {
    const shouldHideChargeStack = !data[SubSystemType.CS].flag;
    if (shouldHideChargeStack) {
      const newCellList = [...cellList];
      const csCell = newCellList.find((item) => item.subsystemType === SubSystemType.CS);
      const loadCell = newCellList.find((item) => item.subsystemType === SubSystemType.L);
      if (csCell) {
        csCell.hide = true;
      }
      if (loadCell) {
        loadCell.hide = false;
      }
      setCellList(newCellList);
    }
  }

  const ceils = cellList?.map(({ cellStyle, name, icon, iconDisable, subsystemType, hide }) => {
    if (hide) {
      return;
    }
    const shouldIShowDisableIcon = subsystemType ? !data?.[subsystemType]?.flag : false;
    const Icon = shouldIShowDisableIcon && iconDisable ? iconDisable : icon;
    return (
      <Cell {...cellStyle} key={name}>
        {Icon && <Icon />}
      </Cell>
    );
  });
  return (
    <div>
      {ceils}
      <Cell width={894} height={419} left={18} top={88} zIndex={0}>
        <FlowPath data={data} />
      </Cell>
    </div>
  );
};

export default Subject;
