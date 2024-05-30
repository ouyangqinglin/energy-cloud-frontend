import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import styles from './index.less';
import { formatMessage } from '@/utils';
import type { UnitType } from '@/models/siteType';

export type SiteTypeButtonGroupProps = {
  onChange?: (type: number) => void;
  isUseInterval: boolean;
  current: number;
  siteTypeConfig?: UnitType;
};

const ButtonGroupSiteType: FC<SiteTypeButtonGroupProps> = ({
  onChange,
  isUseInterval = true,
  current = 0,
  siteTypeConfig,
}) => {
  const [size, setSize] = useState<number>(0);
  const [siteTypeArr, setSiteTypeArr] = useState<number[]>([]);
  const handleClick = (e: RadioChangeEvent) => {
    setSize(e.target.value);
    onChange?.(e.target.value);
  };
  useEffect(() => {
    setSize(current);
  }, [current]);

  useEffect(() => {
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
  }, [isUseInterval, onChange, siteTypeArr, size]);

  const radioButton = useMemo(() => {
    const group = [];
    const typeArr = [] as number[];
    if (siteTypeConfig?.hasPv || siteTypeConfig?.hasFan) {
      group.push(
        <Radio.Button value={group.length}>
          {formatMessage({ id: 'device.green', defaultMessage: '绿电' })}
        </Radio.Button>,
      );
    }
    if (siteTypeConfig?.hasDiesel) {
      group.push(
        <Radio.Button value={group.length}>
          {formatMessage({ id: 'screen.1009', defaultMessage: '柴发' })}
        </Radio.Button>,
      );
    }
    if (siteTypeConfig?.hasEnergy) {
      group.push(
        <Radio.Button value={group.length}>
          {formatMessage({ id: 'screen.storage', defaultMessage: '储能' })}
        </Radio.Button>,
      );
    }
    if (siteTypeConfig?.hasCharge) {
      group.push(
        <Radio.Button value={group.length}>
          {formatMessage({ id: 'screen.chargingPile', defaultMessage: '充电桩' })}
        </Radio.Button>,
      );
    }
    group.forEach((i, index) => {
      typeArr.push(index);
    });
    setSiteTypeArr(typeArr);
    return group;
  }, [siteTypeConfig]);
  return (
    <Radio.Group
      className={styles.buttonGroupWrapper}
      size="small"
      value={size}
      onChange={handleClick}
    >
      {radioButton.map((item) => item)}
    </Radio.Group>
  );
};
export default ButtonGroupSiteType;
