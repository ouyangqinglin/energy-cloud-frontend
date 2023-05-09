/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 19:17:46
 * @LastEditTime: 2023-05-08 15:18:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\index.tsx
 */

import React, { useEffect } from 'react';
import { Modal, Tabs } from 'antd';
import { useRequest } from 'umi';
import ScreenDialog from '@/components/ScreenDialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import ImgCharge from '@/assets/image/screen/dialog/charge.png';
import { getDeviceInfo } from '@/components/ScreenDialog/service';
import EquipInfo from '@/components/EquipInfo';
import { getValue } from '@/utils';
import OperationMonitor from './operationMonitor';
import Alarm from './alarm';
import Log from './log';

export const communicateFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-error">失联</span>
  );
};
export const runFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">运行</span>
  ) : (
    <span className="cl-error">待机</span>
  );
};
export const modelFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">手动</span>
  ) : (
    <span className="cl-error">自动</span>
  );
};
export const bmsCloseFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">闭合</span>
  ) : (
    <span className="cl-error">断开</span>
  );
};
export const singleFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-error">断开</span>
  );
};
export const powerFormat = (value: string) => {
  return getValue(value, 'KW');
};
export const voltageFormat = (value: string) => {
  return getValue(value, 'V');
};
export const currentFormat = (value: string) => {
  return getValue(value, 'A');
};
export const frequencyFormat = (value: string) => {
  return getValue(value, 'HZ');
};
export const tempFormat = (value: string) => {
  return getValue(value, '℃');
};
export const electricModel = (value: number) => {
  const map = {
    0: '电池恒压',
    1: '并网恒流',
    2: '电池恒流',
  };
  return <span className="cl-success">{map[value]}</span>;
};
export const workFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-error">停机</span>
  );
};
export const faultFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-error">故障</span>
  );
};

const EnergyDialog: React.FC<BusinessDialogProps> = (props) => {
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
    run(id);
  }, [id]);

  const Component = model === 'screen' ? ScreenDialog : Modal;

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: <OperationMonitor data={data.run || {}} model={model} />,
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: <></>,
    },
    {
      label: '报警/故障',
      key: 'item-2',
      children: <Alarm id={props.id} />,
    },
    {
      label: '设备日志',
      key: 'item-3',
      children: <Log id={props.id} />,
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
      >
        <EquipInfo data={data} product={data.product} model={model} />
        <Tabs items={tabItems} />
      </Component>
    </>
  );
};

export default EnergyDialog;
