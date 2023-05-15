/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 19:17:46
 * @LastEditTime: 2023-05-15 09:48:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\index.tsx
 */

import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Tabs, Button } from 'antd';
import { useRequest } from 'umi';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/Dialog';
import EquipInfo from '@/components/EquipInfo';
import OperationMonitor from './operationMonitor';
import Alarm from './alarm';
import Log from './log';
import Setting from './setting';
import Community from './community';
import { getChildEquipment } from './service';
import EnergyImg from '@/assets/image/product/energy.png';
import EnergyIntroImg from '@/assets/image/product/energy-intro.jpg';

const EnergyDialog: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const [equipmentIds, setEquipmentIds] = useState({});

  useEffect(() => {
    if (open) {
      getChildEquipment({ parentId: id }).then((res) => {
        const obj = {};
        res?.data?.forEach?.((item: any) => {
          obj[item.productId] = item.deviceId;
        });
        setEquipmentIds(obj);
      });
    }
  }, [open]);

  const onSettingClick = () => {
    setOpenSettingModal(!openSettingModal);
  };

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: <OperationMonitor open={open} equipmentIds={equipmentIds} />,
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: <Setting />,
    },
    {
      label: '报警/故障',
      key: 'item-2',
      children: <Alarm equipmentIds={equipmentIds} />,
    },
    {
      label: '设备日志',
      key: 'item-3',
      children: <Log equipmentIds={equipmentIds} />,
    },
  ];

  return (
    <>
      <Dialog
        model={model}
        title="设备详情"
        open={open}
        onCancel={onCancel}
        footer={null}
        destroyOnClose
      >
        <EquipInfo
          id={id}
          model={model}
          equipmentImg={EnergyImg}
          productImg={EnergyIntroImg}
          buttons={
            <Button type="link" onClick={onSettingClick}>
              设置通信信息
            </Button>
          }
        />
        <Tabs items={tabItems} />
      </Dialog>
      <Community id={id} open={openSettingModal} onCancel={onSettingClick} model={model} />
    </>
  );
};

export default EnergyDialog;
