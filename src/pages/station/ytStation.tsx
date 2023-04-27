/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 15:48:18
 * @LastEditTime: 2023-04-26 11:03:26
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\YtStation.tsx
 */

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import ChargeDialog from '@/pages/screen/components/ChargeDialog';

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
      <Button onClick={showModal}>160充电桩弹窗</Button>
      <ChargeDialog id={chargeId} open={isOpen} onCancel={closeModal} />
    </div>
  );
};

export default YtStation;
