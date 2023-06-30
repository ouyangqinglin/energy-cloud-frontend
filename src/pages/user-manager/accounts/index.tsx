import React, { useRef } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Customer from './Customer';
import Platform from './Platform';
import type { ActionType } from '@ant-design/pro-components';

const enum TabKeys {
  CUSTOMER = '1',
  PLATFORM = '2',
}
const Accounts: React.FC = () => {
  const customerActionRef = useRef<ActionType>(null);
  const platformActionRef = useRef<ActionType>(null);
  const onChange = (activeKey: string) => {
    switch (activeKey) {
      case TabKeys.CUSTOMER:
        customerActionRef.current?.reload();
        break;
      case TabKeys.PLATFORM:
        platformActionRef.current?.reload();
        break;
    }
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '客户账号',
      children: <Customer actionRef={customerActionRef} />,
    },
    {
      key: '2',
      label: '平台账号',
      children: <Platform actionRef={platformActionRef} />,
    },
  ];

  return (
    <>
      <Tabs className="page-tabs" onChange={onChange} tabBarGutter={34} items={items} />
    </>
  );
};

export default Accounts;
