import { useRequest } from 'umi';
import { Dropdown, MenuProps, Space } from 'antd';
import { useState } from 'react';
import styles from './index.less';
import { getStations } from '@/services/station';

const SiteDropdown = ({ defaultSiteId }: { defaultSiteId: number | string }) => {
  const [stationName, setStationName] = useState('');
  const { data } = useRequest(getStations);
  const items: MenuProps['items'] =
    data?.map?.((item: any) => {
      if (defaultSiteId === item.id) {
        setStationName(item.name);
      }
      return {
        label: item.name,
        value: item.id,
        key: String(item.id),
      };
    }) ?? [];

  return (
    <div className={styles.siteDropdown} id="area">
      <h1>{stationName}</h1>
      <Dropdown
        menu={{ items, onClick: ({ label }) => setStationName(label) }}
        getPopupContainer={() => document.getElementById('area')}
        dropdownMatchSelectWidth={false}
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
