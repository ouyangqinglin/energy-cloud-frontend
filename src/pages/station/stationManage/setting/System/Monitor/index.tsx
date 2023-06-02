import React from 'react';
import { Collapse } from 'antd';

const Monitor: React.FC = () => {
  return (
    <>
      <Collapse className="mt16 bg-white" defaultActiveKey="1" ghost>
        <Collapse.Panel header="市电监测" key="1"></Collapse.Panel>
        <Collapse.Panel header="光伏监测" key="2"></Collapse.Panel>
        <Collapse.Panel header="储能监测" key="3"></Collapse.Panel>
        <Collapse.Panel header="充电桩监测" key="4"></Collapse.Panel>
        <Collapse.Panel header="负载监测" key="5"></Collapse.Panel>
      </Collapse>
    </>
  );
};

export default Monitor;
