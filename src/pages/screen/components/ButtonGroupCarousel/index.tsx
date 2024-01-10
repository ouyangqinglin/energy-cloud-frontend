import { FC, useEffect, useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';
import { Radio, RadioChangeEvent, Tooltip } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { YTStoreOutlined } from '@/components/YTIcons';
import Cell from '../LayoutCell';
import { getSiteScreenConfig } from '@/services/station';
import { getSiteId } from '../../Scene/helper';
import { formatMessage } from '@/utils';

export const enum SystemDiagramType {
  NORMAL = 'NORMAL',
  CUSTOMER = 'CUSTOMER',
}

const typeMap = {
  2: SystemDiagramType.CUSTOMER,
  1: SystemDiagramType.NORMAL,
};

const ButtonGroupCarousel: FC<{
  onChange?: (value: SystemDiagramType) => void;
  setAlarmShow?: (value: boolean) => void;
}> = ({ onChange, setAlarmShow }) => {
  const [type, setType] = useState<SystemDiagramType>();
  const { data: screenConfigData } = useRequest(getSiteScreenConfig, {
    defaultParams: [{ siteId: getSiteId() }],
  });

  const handleClick = (e: RadioChangeEvent) => {
    setType(e.target.value);
    onChange?.(e.target.value as SystemDiagramType);
  };

  useEffect(() => {
    const value = typeMap[screenConfigData?.energyFlowDiagramIds?.[0] || '']; //TotalBatteryVoltage
    if (value) {
      setType(value);
      onChange?.(value);
    }
    setAlarmShow?.(screenConfigData?.alarmShow === 1);
  }, [screenConfigData]);

  return (
    <Cell width={112} height={36} left={474} top={253} zIndex={3}>
      <Radio.Group
        className={styles.buttonGroupWrapper}
        size="small"
        value={type}
        onChange={handleClick}
      >
        {screenConfigData?.energyFlowDiagramIds?.includes?.(2 as any) && (
          <Tooltip
            placement="top"
            title={formatMessage({
              id: 'screen.customizedEnergyFlowChart',
              defaultMessage: '定制能流图',
            })}
            color="#0f60a7"
          >
            <Radio.Button value={SystemDiagramType.CUSTOMER}>
              <YTStoreOutlined />
            </Radio.Button>
          </Tooltip>
        )}
        {screenConfigData?.energyFlowDiagramIds?.includes?.(1 as any) && (
          <Tooltip
            placement="top"
            title={formatMessage({
              id: 'screen.standardEnergyFlowChart',
              defaultMessage: '标准能流图',
            })}
            color="#0f60a7"
          >
            <Radio.Button value={SystemDiagramType.NORMAL}>
              <AppstoreOutlined />
            </Radio.Button>
          </Tooltip>
        )}
      </Radio.Group>
    </Cell>
  );
};

export default ButtonGroupCarousel;
