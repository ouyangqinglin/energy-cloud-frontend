/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 15:48:18
 * @LastEditTime: 2023-04-27 15:00:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\YtStation.tsx
 */

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import ChargeDialog from '@/pages/screen/components/ChargeDialog';
import Weather from '@/pages/screen/components/Weather';

const YtStation: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chargeId, setChargeId] = useState('1');

  const showModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      永泰示范站
      <Button onClick={showModal}>720充电桩弹窗</Button>
      <Button onClick={showModal}>120充电桩弹窗</Button>
      <Button className="ml12" onClick={showModal}>
        160充电桩弹窗
      </Button>
      <ChargeDialog id={chargeId} open={isOpen} onCancel={closeModal} />
      <Weather code={'1'} />
    </div>
  );
};

export default YtStation;
