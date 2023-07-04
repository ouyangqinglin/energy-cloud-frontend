import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import ServiceRecord from './ServiceRecord';
import Fault from './Fault';
import { PageTypeEnum } from './ServiceRecord';

const Setting = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '安装工单',
      children: <ServiceRecord type={PageTypeEnum.Install} />,
    },
    {
      key: '2',
      label: '维护工单',
      children: <ServiceRecord />,
    },
    {
      key: '3',
      label: '故障申报',
      children: <Fault />,
    },
  ];

  return <Tabs className="page-tabs" tabBarGutter={34} defaultActiveKey="1" items={items} />;
};

export default Setting;
