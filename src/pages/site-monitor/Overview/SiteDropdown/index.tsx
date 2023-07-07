import { useRequest } from 'umi';
import { Dropdown, MenuProps, Space } from 'antd';
import { useState } from 'react';
import styles from './index.less';
import { getStations } from '@/services/station';

export type StationItemType = {
  label: string;
  value: number;
  key: string;
};

const SiteDropdown = ({
  defaultSiteId,
  onChange,
}: {
  defaultSiteId?: number | string;
  onChange?: (siteId: string) => void;
}) => {
  const [station, setStation] = useState({});
  const { data } = useRequest(getStations);
  const items: MenuProps['items'] =
    data?.map?.((item: any) => {
      if (defaultSiteId === item.id) {
        setStation(item);
      }
      return {
        label: item.name,
        value: item.id,
        key: String(item.id),
      };
    }) ?? [];

  return (
    <div className={styles.siteDropdown} id="area">
      <h1>{station?.key}</h1>
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: [station?.key],
          onClick: (key) => {
            onChange?.(key);
            setStation(key);
          },
        }}
        overlayClassName={styles.dropdownContent}
        placement="bottomLeft"
        getPopupContainer={() => document.getElementById('area')}
        dropdownMatchSelectWidth={true}
        trigger={['click']}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>选择</Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default SiteDropdown;
