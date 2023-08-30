import type { FC } from 'react';
import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import styles from './index.less';
import { useInterval } from 'ahooks';

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
};

const ButtonGroupSiteType: FC<SiteTypeButtonGroupProps> = ({ onChange }) => {
  const [size, setSize] = useState<SiteType>(SiteType.PV);
  const handleClick = (e: RadioChangeEvent) => {
    setSize(e.target.value);
    onChange?.(e.target.value as SiteType);
  };

  useInterval(() => {
    let index = siteTypeArr.findIndex((item) => item == size) + 1;
    if (index >= siteTypeArr.length) {
      index = 0;
    }
    setSize(siteTypeArr[index]);
    onChange?.(siteTypeArr[index]);
  }, 5 * 1000);

  return (
    <Radio.Group
      className={styles.buttonGroupWrapper}
      size="small"
      value={size}
      onChange={handleClick}
    >
      <Radio.Button value={SiteType.PV}>光伏</Radio.Button>
      <Radio.Button value={SiteType.ES}>储能</Radio.Button>
      <Radio.Button value={SiteType.CS}>充电桩</Radio.Button>
    </Radio.Group>
  );
};
export default ButtonGroupSiteType;
