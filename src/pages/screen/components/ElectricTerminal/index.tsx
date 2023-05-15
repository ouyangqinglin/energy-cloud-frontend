/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:31:31
 * @LastEditTime: 2023-05-08 19:31:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\ElectricTerminal\index.tsx
 */

import React, { useEffect } from 'react';
import { Modal, Tabs } from 'antd';
import { useRequest } from 'umi';
import Label from '@/components/Detail/label';
import Dialog from '@/components/Dialog';
import { getDeviceInfo } from '@/components/Dialog/service';
import type { BusinessDialogProps } from '@/components/Dialog';
import EquipInfo from '@/components/EquipInfo';
import ImgCharge from '@/assets/image/screen/dialog/charge.png';
import Detail from '@/components/Detail';
import type { fieldType } from '@/utils/dictionary';
import { valueFormat } from '@/utils';

const ElectricTerminal: React.FC<BusinessDialogProps> = (props) => {
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

  const runItems = (data?.run?.electricTerminal?.field || []).map((item: fieldType) => {
    return { ...item, format: valueFormat };
  });

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
          <Label title="市电负载" />
          <Detail data={data?.run?.electricTerminal?.value || {}} items={runItems} column={5} />
        </>
      ),
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
      <Dialog
        model={model}
        title="设备详情"
        open={open}
        onCancel={onCancel}
        loading={loading}
        footer={null}
        destroyOnClose
      >
        <EquipInfo id={id} model={model} />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default ElectricTerminal;
