/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 19:17:46
 * @LastEditTime: 2023-05-29 19:53:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\operationMonitor.tsx
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Tabs, Pagination } from 'antd';
import Detail from '@/components/Detail';
import { weekInfo, EnergyEquipmentEnum } from '@/utils/dictionary';
import { OptionType } from '@/types';
import Label from '@/components/Detail/DotLabel';
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
import useSubscribe from '@/pages/screen/useSubscribe';
import { voltageFormat, tempFormat } from '@/utils/format';

export type OperationMonitorProps = {
  open: boolean;
  equipmentIds: Record<string, any>;
  onEmsDataChange?: (value: Record<string, any>) => void;
};

const OperationMonitor: React.FC<OperationMonitorProps> = (props) => {
  const { equipmentIds = {}, open, onEmsDataChange } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const items = useMemo(() => Array.from({ length: 12 }), []);
  const tempArr = useMemo(() => Array.from({ length: 6 }), []);

  const emsData = useSubscribe(equipmentIds[EnergyEquipmentEnum.EMS], open);
  const pcsData = useSubscribe(equipmentIds[EnergyEquipmentEnum.PCS], open);
  const bmsData = useSubscribe(equipmentIds[EnergyEquipmentEnum.BMS], open);
  const airData = useSubscribe(equipmentIds[EnergyEquipmentEnum.AIR], open);
  const meterData = useSubscribe(equipmentIds[EnergyEquipmentEnum.METER], open);

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    if (onEmsDataChange) {
      onEmsDataChange(emsData);
    }
  }, [emsData]);

  const upItems: React.ReactNode[] = [];
  const downItems: React.ReactNode[] = [];
  const upTempItems: React.ReactNode[] = [];
  const downTempItems: React.ReactNode[] = [];
  const rightItems = (
    <>
      <div className="card-temp-item temp-right-item">
        <span className="card-temp-dot" />
        <div>
          温度{(currentPage - 1) * 13 + 6}:
          <span className="card-temp-value">
            {tempFormat(bmsData?.['Temperature' + (currentPage + 7)])}
          </span>
        </div>
      </div>
    </>
  );
  items.forEach((_, index) => {
    upItems.push(
      <div className="card-battery-item" key={'up' + index}>
        <span>
          电芯1_{currentPage}_{(currentPage - 1) * 24 + index + 1}
        </span>
        <div className="card-battery-value">
          {voltageFormat(bmsData?.['Voltage' + ((currentPage - 1) * 24 + index + 1)] || '_')}
        </div>
      </div>,
    );
    downItems.push(
      <div className="card-battery-item" key={'down' + index}>
        <span>
          电芯1_{currentPage}_{(currentPage - 1) * 24 + index + 13}
        </span>
        <div className="card-battery-value">
          {voltageFormat(bmsData?.['Voltage' + ((currentPage - 1) * 24 + index + 13)] || '_')}
        </div>
      </div>,
    );
  }); // Temperature Voltage
  tempArr.forEach((_, index) => {
    upTempItems.push(
      <div className="card-temp-item" key={'uptemp' + index}>
        <span className="card-temp-dot" />
        <div>
          温度{(currentPage - 1) * 13 + index + 1}:
          <span className="card-temp-value">
            {tempFormat(bmsData?.['Temperature' + ((currentPage - 1) * 13 + index + 1)])}
          </span>
        </div>
      </div>,
    );
    downTempItems.push(
      <div className="card-temp-item" key={'downtemp' + index}>
        <div>
          温度{(currentPage - 1) * 13 + index + 7}:
          <span className="card-temp-value">
            {tempFormat(bmsData?.['Temperature' + ((currentPage - 1) * 13 + index + 7)])}
          </span>
        </div>
        <span className="card-temp-dot" />
      </div>,
    );
  });

  const runItems = [
    {
      label: 'EMS',
      key: 'run-item-0',
      children: (
        <>
          <Label title="系统时钟" />
          <div className="desc-label mb12">
            {emsData?.sysTem ? `${emsData.sysTem} ${weekInfo[emsData?.week]}` : <>无</>}
          </div>
          <Label title="状态信息" />
          <Detail data={emsData || {}} items={statusItems} column={4} />
          <Label title="设置信息" />
          <Detail data={emsData || {}} items={settingItems} column={4} />
        </>
      ),
    },
    {
      label: 'PCS',
      key: 'run-item-1',
      children: (
        <>
          <Label title="状态信息" />
          <Detail data={pcsData || {}} items={pcsStatusItems} column={5} />
          <Label title="测量信息" />
          <Detail data={pcsData || {}} items={measureItems} column={5} />
        </>
      ),
    },
    {
      label: 'BMS',
      key: 'run-item-2',
      children: (
        <>
          <Label title="状态信息" />
          <Detail data={bmsData || {}} items={bmsStatusItems} column={5} />
          <Label title="测量信息" />
          <Detail data={bmsData || {}} items={bmsMeasureItems} column={5} />
          <Label title={`模组（${currentPage}）单体信息`} />
          <div className="flex flex-between">{upItems}</div>
          <div className="flex flex-between my20" style={{ position: 'relative' }}>
            {upTempItems}
            {rightItems}
          </div>
          <div className="flex flex-between ">{downTempItems.reverse()}</div>
          <div className="flex flex-between my20">{downItems.reverse()}</div>
          <div className="flex mt16">
            <div className="flex1" />
            <Pagination
              defaultCurrent={currentPage}
              pageSize={1}
              total={10}
              onChange={onPageChange}
            />
          </div>
        </>
      ),
    },
    {
      label: '空调',
      key: 'run-item-3',
      children: (
        <>
          <Label title="状态信息" />
          <Detail data={airData || {}} items={airStatusItems} column={5} />
          <Label title="测量信息" />
          <Detail data={airData || {}} items={airMeasureItems} column={5} />
        </>
      ),
    },
    {
      label: '电表',
      key: 'run-item-4',
      children: (
        <>
          <Label title="测量信息" />
          <Detail data={meterData || {}} items={electricMeasureItems} column={5} />
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
