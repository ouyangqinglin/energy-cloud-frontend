/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 15:48:18
 * @LastEditTime: 2023-04-23 16:05:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\YtStation.tsx
 */

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Dialog from '@/pages/screen/components/Dialog';
import type { item } from '@/pages/screen/components/Dialog';

const YtStation: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const items: item[] = [
    { label: '运行信息', children: <div>运行信息</div> },
    { label: '产品介绍', children: <div>产品介绍</div> },
  ];

  const showModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      永泰示范站
      <Button onClick={showModal}>弹窗</Button>
      <Dialog open={isOpen} onCancel={closeModal} items={items}></Dialog>
    </div>
  );
};

export default YtStation;
