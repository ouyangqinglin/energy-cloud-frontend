import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import ServiceRecord from './ServiceRecord';
import Fault from './Fault';
import EmptyPage from '@/components/EmptyPage';

const Setting = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '数据查询',
      children: <EmptyPage />,
    },
    {
      key: '2',
      label: '数据报表',
      children: <EmptyPage />,
    },
    {
      key: '3',
      label: '服务记录',
      children: <ServiceRecord />,
    },
    {
      key: '4',
      label: '故障申报',
      children: <Fault />,
    },
  ];

  return <Tabs className="page-tabs" tabBarGutter={34} defaultActiveKey="1" items={items} />;
};

export default Setting;
