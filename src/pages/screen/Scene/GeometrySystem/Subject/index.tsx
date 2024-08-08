import Cell from '@/pages/screen/components/LayoutCell';
import { useCallback, useEffect, useState } from 'react';
import { config, groupSvg } from './config';
import type { SystemDiagramRes } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import { SubSystemType } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import FlowPath from '../FlowPath';
import styles from './index.less';
import { getLocale } from '@/utils';
const isEnUS = getLocale().isEnUS;
import type { UnitType } from '@/models/siteType';

const Subject = ({
  data,
  siteTypeConfig,
}: {
  data?: SystemDiagramRes;
  siteTypeConfig: UnitType;
}) => {
  const [cellList, setCellList] = useState([...config]);
  const [siteTypeArray, setSiteTypeArray] = useState<string[]>([]);
  const getGroupStyle = useCallback(() => {
    const groupStyle = {
      cellStyle: { width: 218, height: 158, left: 173, top: 321 },
      icon: 'icon_',
    };
    const currentSiteTypeArray = [];
    if (siteTypeConfig.hasPv) currentSiteTypeArray.push('pv');
    if (siteTypeConfig.hasFan) currentSiteTypeArray.push('fan');
    if (siteTypeConfig.hasDiesel) currentSiteTypeArray.push('diesel');
    setSiteTypeArray(currentSiteTypeArray);
    switch (currentSiteTypeArray.length) {
      case 0:
        groupStyle.icon = groupStyle.icon + 'pv_disable';
        break;
      case 1:
        groupStyle.icon = groupStyle.icon + currentSiteTypeArray[0];
        break;
      case 2:
        groupStyle.cellStyle = {
          width: 298,
          height: 193,
          left: 135,
          top: currentSiteTypeArray[0] == 'fan' ? 305 : 313,
        };
        groupStyle.icon = groupStyle.icon + currentSiteTypeArray.join('_');
        break;
      case 3:
        groupStyle.cellStyle = {
          width: 362,
          height: 228,
          left: 99,
          top: 289,
        };
        groupStyle.icon = groupStyle.icon + currentSiteTypeArray.join('_');
        break;
    }
    if (isEnUS) groupStyle.icon += '_us';
    groupStyle.icon = groupSvg[groupStyle.icon as keyof typeof groupSvg];
    return groupStyle;
  }, [siteTypeConfig]);
  // 切换充电桩和负载
  useEffect(() => {
    if (data) {
      const shouldHideChargeStack = !siteTypeConfig.hasCharge;
      const newCellList = [...cellList];
      const csCell = newCellList.find((item) => item.subsystemType === SubSystemType.CS);
      const loadCell = newCellList.find((item) => item.subsystemType === SubSystemType.L);
      const groupCell = newCellList.find((item) => item.subsystemType === SubSystemType.GROUP);
      if (shouldHideChargeStack) {
        if (csCell) {
          csCell.hide = true;
        }
        if (loadCell) {
          loadCell.hide = false;
        }
        setCellList(newCellList);
      }
      if (groupCell) {
        const currentGroupStyle = getGroupStyle();
        groupCell.cellStyle = currentGroupStyle.cellStyle;
        groupCell.icon = currentGroupStyle.icon;
        setCellList(newCellList);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, getGroupStyle]);

  const ceils = cellList?.map(
    ({ cellStyle, name, icon, iconDisable, subsystemType, hide, isSVG }) => {
      if (hide) {
        return;
      }
      // const shouldIShowDisableIcon = subsystemType ? !data?.[subsystemType]?.flag : false;
      const Icon = subsystemType && iconDisable ? iconDisable : icon;
      return (
        <Cell {...cellStyle} key={name}>
          {isSVG ? (
            Icon && <Icon />
          ) : (
            <div
              className={styles.iconWrapper}
              style={{
                backgroundImage: `url(${Icon})`,
              }}
            />
          )}
        </Cell>
      );
    },
  );

  return (
    <div>
      {ceils}
      <Cell width={894} height={419} left={18} top={88} zIndex={0}>
        <FlowPath data={data} siteTypeArray={siteTypeArray} siteTypeConfig={siteTypeConfig} />
      </Cell>
    </div>
  );
};

export default Subject;
