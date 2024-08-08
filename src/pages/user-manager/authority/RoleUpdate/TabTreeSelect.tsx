import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TreeSelect from '@/components/TreeSelect';
import { formatMessage } from '@/utils';
import { useMemo, useState, useEffect } from 'react';
import { getEffectMenus } from '../service';
import { useRequest } from 'umi';

const TabTreeSelect = (tabProps: any) => {
  const { value, onChange, form } = tabProps;

  const [category, setCategory] = useState<string>('0');
  const { data: menuData, run } = useRequest(getEffectMenus, {
    manual: true,
  });

  const onTabsChange = (e: string) => {
    setCategory(e);
  };

  useEffect(() => {
    run({ category });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onTreeSelectChange = (newVal: any) => {
    const curvValue = form.getFieldValue('menuKeys') || [];
    curvValue[category] = newVal;
    console.log('curvValue>>', curvValue);
    onChange(curvValue);
  };
  const tabsItem: TabsProps['items'] = useMemo(() => {
    return [
      {
        key: '0',
        label: formatMessage({ id: 'system.1025', defaultMessage: 'web权限' }),
        children: (
          <TreeSelect
            value={value && value[0]}
            onChange={(newVal) => onTreeSelectChange(newVal)}
            treeData={menuData}
          />
        ),
      },
      {
        key: '1',
        label: formatMessage({ id: 'system.1026', defaultMessage: 'app权限' }),
        children: (
          <TreeSelect
            value={value && value[1]}
            onChange={(newVal) => onTreeSelectChange(newVal)}
            treeData={menuData}
          />
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuData, onChange, value, category]);
  return <Tabs items={tabsItem} onChange={onTabsChange} />;
};

export default TabTreeSelect;
