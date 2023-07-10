import { useRequest } from 'umi';
import { Dropdown, Space } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import type { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { getStations } from './service';

const SiteDropdown = ({
  defaultSiteId,
  onChange,
}: {
  defaultSiteId?: number | string;
  onChange?: (siteId: number) => void;
}) => {
  const [station, setStation] = useState<MenuItemType>({} as MenuItemType);
  const { data } = useRequest(getStations);
  const items: MenuItemType[] = useMemo(
    () =>
      data?.map?.((item: any) => {
        return {
          label: item.name,
          key: String(item.id),
        };
      }) ?? [],
    [data],
  );

  const getDefaultSelectedKey = useMemo(() => {
    if (!items.length) {
      return [];
    }

    // 默认选中第一个项作为默认站点
    let defaultSelectedItem: MenuItemType = items[0];
    // url中存在siteId
    if (defaultSiteId && items.length) {
      const matchItem = items.find((it) => it.key === String(defaultSiteId));
      if (matchItem) {
        defaultSelectedItem = matchItem;
      }
    }

    onChange?.(Number(defaultSelectedItem.key));
    setStation(defaultSelectedItem);
    return [defaultSelectedItem.key as string];
  }, [defaultSiteId, items, onChange]);

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
          defaultSelectedKeys: getDefaultSelectedKey,
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
