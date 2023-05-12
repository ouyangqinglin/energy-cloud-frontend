/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:40:01
 * @LastEditTime: 2023-05-11 11:42:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Cabinet\index.tsx
 */

import React, { useEffect } from 'react';
import { Modal, Tabs } from 'antd';
import { useRequest } from 'umi';
import ScreenDialog from '@/components/ScreenDialog';
import { getDeviceInfo } from '@/components/ScreenDialog/service';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import ImgCharge from '@/assets/image/screen/dialog/charge.png';

const Cabinet: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const {
    data = {},
    loading,
    run,
  } = useRequest(getDeviceInfo, {
    manual: true,
  });
  data.img = data.img || ImgCharge;

  useEffect(() => {
    if (open) {
      run(id);
    }
  }, [open]);

  const Component = model === 'screen' ? ScreenDialog : Modal;

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: <></>,
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: <></>,
    },
    {
      label: '报警/故障',
      key: 'item-2',
      children: <></>,
    },
    {
      label: '设备日志',
      key: 'item-3',
      children: <></>,
    },
  ];

  return (
    <>
      <Component
        title="设备详情"
        open={open}
        onCancel={onCancel}
        loading={loading}
        width={model === 'screen' ? '62.5vw' : '1200px'}
        wrapClassName={model === 'screen' ? '' : 'dialog-equipment'}
        footer={null}
        destroyOnClose
      >
        <EquipInfo id={id} model={model} />
        <Tabs items={tabItems} />
      </Component>
    </>
  );
};

export default Cabinet;
