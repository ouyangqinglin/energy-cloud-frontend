import React, { useState } from 'react';
import type { MarketElectricityPriceListItem } from './data.d';
import { getMarketElectricityPriceList } from './service';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { useToggle } from 'ahooks';
import { FormOperations } from '@/components/YTModalForm/typing';
import styles from './index.less';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { columns } from './helper';
import { UpdateModal } from './components/edit';

const Customer: React.FC = () => {
  const [state, { toggle }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<MarketElectricityPriceListItem>(
    {} as MarketElectricityPriceListItem,
  );
  const customConfig: YTProTableCustomProps<MarketElectricityPriceListItem> = {
    toolbar: {
      onChange() {
        setInitialValues({} as MarketElectricityPriceListItem);
        setOperations(FormOperations.CREATE);
        toggle(true);
      },
      buttonText: '新建规则',
    },
    option: {
      onDeleteChange() {},
      onDetailChange() {},
      onEditChange(_, entity) {
        setInitialValues({ ...entity });
        setOperations(FormOperations.UPDATE);
        toggle(true);
      },
      modalDeleteText: '您确认要删除该电价规则吗？删除之后无法恢复！',
    },
  };
  const category: TabsProps['items'] = [
    {
      label: '市电电价设置',
      key: '1',
      children: (
        <YTProTable<MarketElectricityPriceListItem>
          columns={columns}
          request={(params) => getMarketElectricityPriceList(params)}
          {...customConfig}
        />
      ),
    },
    {
      label: '光伏上网电价设置',
      key: '2',
    },
    {
      label: '充电电价设置',
      key: '3',
    },
  ];
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        tabBarExtraContent={{ left: <strong style={{ paddingRight: 16 }}>所属类目：</strong> }}
        className={styles.category}
        tabBarGutter={24}
        items={category}
      />
      <UpdateModal
        initialValues={initialValues}
        operations={operations}
        visible={state}
        onVisibleChange={toggle}
      />
    </>
  );
};

export default Customer;
