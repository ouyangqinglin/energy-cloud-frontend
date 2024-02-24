import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import styles from './index.less';
import { useInterval } from 'ahooks';
import { formatMessage } from '@/utils';

export const enum SiteType {
  // 光伏
  PV,
  // 储能
  ES,
  // 充电桩
  CS,
}

const siteTypeArr = [SiteType.PV, SiteType.ES, SiteType.CS];

export type SiteTypeButtonGroupProps = {
  onChange?: (type: SiteType) => void;
  isUseInterval: boolean;
  current: number;
};

const ButtonGroupSiteType: FC<SiteTypeButtonGroupProps> = ({
  onChange,
  isUseInterval = true,
  current = 0,
}) => {
  const [size, setSize] = useState<SiteType>(SiteType.PV);
  const handleClick = (e: RadioChangeEvent) => {
    setSize(e.target.value);
    onChange?.(e.target.value as SiteType);
  };
  useEffect(() => {
    setSize(current);
  }, [current]);

  if (isUseInterval) {
    setInterval(() => {
      let index = siteTypeArr.findIndex((item) => item == size) + 1;
      if (index >= siteTypeArr.length) {
        index = 0;
      }
      setSize(siteTypeArr[index]);
      onChange?.(siteTypeArr[index]);
    }, 5 * 1000);
  }

  return (
    <Radio.Group
      className={styles.buttonGroupWrapper}
      size="small"
      value={size}
      onChange={handleClick}
    >
      <Radio.Button value={SiteType.PV}>
        {formatMessage({ id: 'screen.pv', defaultMessage: '光伏' })}
      </Radio.Button>
      <Radio.Button value={SiteType.ES}>
        {formatMessage({ id: 'screen.storage', defaultMessage: '储能' })}
      </Radio.Button>
      <Radio.Button value={SiteType.CS}>
        {formatMessage({ id: 'screen.chargingPile', defaultMessage: '充电桩' })}
      </Radio.Button>
    </Radio.Group>
  );
};
export default ButtonGroupSiteType;
