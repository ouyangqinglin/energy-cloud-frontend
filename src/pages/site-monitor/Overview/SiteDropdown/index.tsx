import { useRequest } from 'umi';
import { Dropdown, Space } from 'antd';
import { useState } from 'react';
import styles from './index.less';
import { getStations } from '@/services/station';
import type { MenuItemType } from 'antd/es/menu/hooks/useItems';

const SiteDropdown = ({
  // defaultSiteId,
  onChange,
}: {
  // defaultSiteId?: number | string;
  onChange?: (siteId: number) => void;
}) => {
  const [station, setStation] = useState<MenuItemType>({} as MenuItemType);
  const { data } = useRequest(getStations);
  const items: MenuItemType[] =
    data?.map?.((item: any) => {
      // if (defaultSiteId === item.id) {
      //   setStation(item);
      // }
      return {
        label: item.name,
        key: String(item.id),
      };
    }) ?? [];

  const getItemByKey = (key: string) => {
    return items?.find((it) => it?.key === key);
  };

  return (
    <div className={styles.siteDropdown} id="area">
      <h1>{station?.label ?? '请选择站点'}</h1>
      <Dropdown
        menu={{
          items,
          selectable: true,
          // defaultSelectedKeys: [defaultSiteId as string],
          onClick: (menuInfo) => {
            const menu = getItemByKey(menuInfo.key);
            if (menu) {
              onChange?.(Number(menu.key));
              setStation(menu);
            }
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
