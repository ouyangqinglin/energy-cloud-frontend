/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 19:17:46
 * @LastEditTime: 2023-05-08 15:17:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\ChargeDialog\operationMonitor.tsx
 */

import React from 'react';
import { Tabs } from 'antd';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { weekInfo } from '@/utils/dictionary';
import Label from '@/components/Detail/label';
import dayjs from 'dayjs';
import type { fieldType } from '@/utils/dictionary';
import { valueFormat } from '@/utils';
import {
  communicateFormat,
  runFormat,
  modelFormat,
  bmsCloseFormat,
  singleFormat,
  powerFormat,
  voltageFormat,
  currentFormat,
  frequencyFormat,
  tempFormat,
  electricModel,
  workFormat,
  faultFormat,
} from '.';

export type OperationMonitorProps = {
  model: string | undefined;
  data: any;
};

const OperationMonitor: React.FC<OperationMonitorProps> = (props) => {
  const { data, model } = props;

  const emsSystemTime = dayjs(data?.ems?.systemTime || '');

  const statusItems: DetailItem[] = [
    { label: 'PCS通讯状态', field: 'pcsCommunicate', format: communicateFormat },
    { label: 'BMS通讯状态', field: 'bmsCommunicate', format: communicateFormat },
    { label: '电表通讯状态', field: 'elecCommunicate', format: communicateFormat },
    { label: 'EMS系统状态', field: 'emsSystem', format: runFormat },
    { label: '系统模式', field: 'systemModel', format: modelFormat },
    { label: 'BMS主接触器状态', field: 'bmsContactor', format: bmsCloseFormat },
    { label: '气溶胶信号', field: 'a', format: singleFormat },
    { label: '电气急停信号', field: 'aerosolSingle', format: singleFormat },
    { label: 'BMS急停信号', field: 'b', format: singleFormat },
  ];
  const settingItems: DetailItem[] = [
    { label: '手动PCS功率', field: 'a', format: powerFormat },
    { label: '过充保护', field: 'b', format: voltageFormat },
    { label: '过充释放', field: 'c', format: voltageFormat },
    { label: '过放保护', field: 'd', format: voltageFormat },
    { label: '过放释放', field: 'e', format: voltageFormat },
    { label: '时段1', field: 'f' },
    { label: '执行功率', field: 'g', format: powerFormat },
    { label: '时段2', field: 'h' },
    { label: '执行功率', field: 'i', format: powerFormat, span: 2 },
    { label: '时段3', field: 'j' },
    { label: '执行功率', field: 'k', format: powerFormat },
    { label: '时段4', field: 'l' },
    { label: '执行功率', field: 'm', format: powerFormat, span: 2 },
    { label: '时段5', field: 'n' },
    { label: '执行功率', field: 'o', format: powerFormat },
    { label: '时段6', field: 'p' },
    { label: '执行功率', field: 'q', format: powerFormat, span: 2 },
  ];

  const pcsStatusItems: DetailItem[] = [
    { label: '当前实际充放电工作模式', field: 'a', format: electricModel },
    { label: '工作状态', field: 'b', format: workFormat },
    { label: '硬件故障字1', field: 'c', format: faultFormat },
    { label: '硬件故障字2', field: 'd', format: faultFormat },
    { label: '电网故障字', field: 'e', format: faultFormat },
    { label: '母线故障字', field: 'f', format: faultFormat },
    { label: '交流电容故障字', field: 'g', format: faultFormat },
    { label: '系统故障字', field: 'h', format: faultFormat },
    { label: '开关故障字', field: 'i', format: faultFormat },
    { label: '其他故障字', field: 'j', format: faultFormat },
  ];
  const measureItems: DetailItem[] = [
    { label: '输出AB线电压', field: 'a', format: voltageFormat },
    { label: '输出BC线电压', field: 'b', format: voltageFormat },
    { label: '输出CA线电压', field: 'c', format: voltageFormat },
    { label: '输出A相电压', field: 'd', format: voltageFormat },
    { label: '输出B相电压', field: 'e', format: voltageFormat },
    { label: '输出C相电压', field: 'f', format: voltageFormat },
    { label: '输出A相电流', field: 'g', format: currentFormat },
    { label: '输出B相电流', field: 'h', format: currentFormat },
    { label: '输出C相电流', field: 'i', format: currentFormat },
    { label: '电感A相电流', field: 'j', format: currentFormat },
    { label: '电感B相电流', field: 'k', format: currentFormat },
    { label: '电感C相电流', field: 'l', format: currentFormat },
    { label: '电网频率', field: 'm', format: frequencyFormat },
    { label: '电网当前相序', field: 'n' },
    { label: '交流A相有功功率', field: 'o', format: powerFormat },
    { label: '交流B相有功功率', field: 'p', format: powerFormat },
    { label: '交流C相有功功率', field: 'q', format: powerFormat },
    { label: '交流A相视在功率', field: 'r', format: powerFormat },
    { label: '交流B相视在功率', field: 's', format: powerFormat },
    { label: '交流C相视在功率', field: 't', format: powerFormat },
    { label: '交流A相无功功率', field: 'u', format: powerFormat },
    { label: '交流B相无功功率', field: 'v', format: powerFormat },
    { label: '交流C相无功功率', field: 'w', format: powerFormat },
    { label: '交流输出总有功功率', field: 'x', format: powerFormat },
    { label: '交流输出总无功功率', field: 'y', format: powerFormat },
    { label: '交流输出总视在功率', field: 'z', format: powerFormat },
    { label: '交流功率因素', field: 'aa' },
    { label: '总母线电压', field: 'ab', format: voltageFormat },
    { label: '正母线电压', field: 'ac', format: voltageFormat },
    { label: '负母线电压', field: 'ad', format: voltageFormat },
    { label: '电池电压', field: 'ae', format: voltageFormat },
    { label: '电池电流', field: 'af', format: currentFormat },
    { label: '直流功率', field: 'ag', format: powerFormat },
    { label: '环境温度', field: 'ah', format: tempFormat },
    { label: 'IGBT温度', field: 'ai', format: tempFormat },
    { label: 'DSP-V版本', field: 'aj' },
    { label: 'DSP-B版本', field: 'ak' },
    { label: 'DSP-D版本', field: 'al' },
    { label: 'CPLD-V版本', field: 'am' },
    { label: 'CPLD-B版本', field: 'an' },
    { label: 'CPLD-D版本', field: 'ao' },
  ];

  const bmsStatusItems = (data?.bms?.status?.field || []).map((item: fieldType) => {
    return { ...item, format: valueFormat };
  });
  const bmsMeasureItems = (data?.bms?.measure?.field || []).map((item: fieldType) => {
    return { ...item, format: valueFormat };
  });

  const airStatusItems = (data?.air?.status?.field || []).map((item: fieldType) => {
    return { ...item, format: valueFormat };
  });
  const airMeasureItems = (data?.air?.measure?.field || []).map((item: fieldType) => {
    return { ...item, format: valueFormat };
  });

  const electricMeasureItems = (data?.electric?.measure?.field || []).map((item: fieldType) => {
    return { ...item, format: valueFormat };
  });

  const runItems = [
    {
      label: 'EMS',
      key: 'run-item-0',
      children: (
        <>
          <Label title="系统时钟" />
          <div className="desc-label">
            <span className="mr10">{emsSystemTime.format('YYYY-MM-DD')}</span>
            <span className="mr12">{weekInfo[emsSystemTime.day()]}</span>
            <span>{emsSystemTime.format('HH:mm:ss')}</span>
          </div>
          <Label className="mt24" title="状态信息" />
          <Detail
            data={data?.ems?.status || {}}
            items={statusItems}
            column={5}
            labelStyle={model == 'screen' ? { width: '5.98vw' } : { width: '112px' }}
          />
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
