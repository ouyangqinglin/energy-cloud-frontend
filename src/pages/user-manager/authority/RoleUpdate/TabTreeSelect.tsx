import { message, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TreeSelect from '@/components/TreeSelect';
import { formatMessage } from '@/utils';
import { useMemo, useState } from 'react';
import { getEffectMenus } from '../service';

const TabTreeSelect = (tabProps: any) => {
  const { value, onChange, form } = tabProps;
  const [category, setCategory] = useState<string>('0');
  const getMenuData = (key: string) => {
    return getEffectMenus({ category: key })
      .then((res) => {
        if (res.code == 200) {
          return res.data;
        } else {
          return [];
        }
      })
      .catch((err) => {
        message.error(err);
        return [];
      });
  };

  const onTabsChange = (e: string) => {
    setCategory(e);
  };

  const onTreeSelectChange = (newVal: any) => {
    const curvValue = form.getFieldValue('menuKeys') || [];
    curvValue[category] = newVal;
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
            request={getMenuData('0')}
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
            request={getMenuData('1')}
          />
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, value, category]);
  return <Tabs items={tabsItem} onChange={onTabsChange} />;
};

export default TabTreeSelect;
