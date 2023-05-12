/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 19:17:46
 * @LastEditTime: 2023-05-11 16:56:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\operationMonitor.tsx
 */

import React from 'react';
import { Tabs } from 'antd';
import Detail from '@/components/Detail';
import { weekInfo, EnergyEquipmentEnum } from '@/utils/dictionary';
import Label from '@/components/Detail/label';
import dayjs from 'dayjs';
import {
  statusItems,
  settingItems,
  pcsStatusItems,
  measureItems,
  bmsStatusItems,
  bmsMeasureItems,
  airStatusItems,
  airMeasureItems,
  electricMeasureItems,
} from './equipmentItem';

export type OperationMonitorProps = {};

const OperationMonitor: React.FC<OperationMonitorProps> = (props) => {
  const data: any = {};

  const emsSystemTime = dayjs(data?.ems?.systemTime || '');

  const runItems = [
    {
      label: 'EMS',
      key: 'run-item-0',
      children: (
        <>
          <Label title="系统时钟" />
          <div className="desc-label">
            {data?.ems?.systemTime ? (
              <>
                <span className="mr10">{emsSystemTime.format('YYYY-MM-DD')}</span>
                <span className="mr12">{weekInfo[emsSystemTime.day()]}</span>
                <span>{emsSystemTime.format('HH:mm:ss')}</span>
              </>
            ) : (
              <>无</>
            )}
          </div>
          <Label className="mt24" title="状态信息" />
          <Detail data={data?.ems?.status || {}} items={statusItems} column={5} />
          <Label className="mt24" title="设置信息" />
          <Detail data={data?.ems?.setting || {}} items={settingItems} column={5} />
        </>
      ),
    },
    {
      label: 'PCS',
      key: 'run-item-1',
      children: (
        <>
          <Label title="状态信息" />
          <Detail data={data?.pcs?.status || {}} items={pcsStatusItems} column={5} />
          <Label className="mt24" title="测量信息" />
          <Detail data={data?.pcs?.measure || {}} items={measureItems} column={5} />
        </>
      ),
    },
    {
      label: 'BMS',
      key: 'run-item-2',
      children: (
        <>
          <Label title="状态信息" />
          <Detail data={data?.bms?.status?.value || {}} items={bmsStatusItems} column={5} />
          <Label title="测量信息" />
          <Detail data={data?.bms?.measure?.value || {}} items={bmsMeasureItems} column={5} />
        </>
      ),
    },
    {
      label: '空调',
      key: 'run-item-3',
      children: (
        <>
          <Label title="状态信息" />
          <Detail data={data?.air?.status?.value || {}} items={airStatusItems} column={5} />
          <Label title="测量信息" />
          <Detail data={data?.air?.measure?.value || {}} items={airMeasureItems} column={5} />
        </>
      ),
    },
    {
      label: '电表',
      key: 'run-item-4',
      children: (
        <>
          <Label title="测量信息" />
          <Detail
            data={data?.electric?.measure?.value || {}}
            items={electricMeasureItems}
            column={5}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Tabs className="child-tabs" items={runItems} tabPosition="left" />
    </>
  );
};

export default OperationMonitor;
