/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 19:17:46
 * @LastEditTime: 2023-05-13 18:15:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\operationMonitor.tsx
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, Pagination } from 'antd';
import Detail from '@/components/Detail';
import { weekInfo, EnergyEquipmentEnum, OptionType } from '@/utils/dictionary';
import Label from '@/components/Detail/label';
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
  equipmentIds: {
    [key: string]: any;
  };
};

const OperationMonitor: React.FC<OperationMonitorProps> = (props) => {
  const { equipmentIds = {}, open } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [emsData, setEmsData] = useState<any>({});
  const [pcsData, setPcsData] = useState({});
  const [bmsData, setBmsData] = useState({});
  const [airData, setAirData] = useState({});
  const [meterData, setMeterData] = useState({});
  const items = useMemo(() => Array.from({ length: 12 }), []);
  const tempArr = useMemo(() => Array.from({ length: 6 }), []);

  useSubscribe(equipmentIds[EnergyEquipmentEnum.EMS], open, (res) => {
    setEmsData({ ...emsData, ...res });
  });
  useSubscribe(equipmentIds[EnergyEquipmentEnum.PCS], open, (res) => {
    setPcsData({ ...pcsData, ...res });
  });
  useSubscribe(equipmentIds[EnergyEquipmentEnum.BMS], open, (res) => {
    setBmsData({ ...bmsData, ...res });
  });
  useSubscribe(equipmentIds[EnergyEquipmentEnum.AIR], open, (res) => {
    setAirData({ ...airData, ...res });
  });
  useSubscribe(equipmentIds[EnergyEquipmentEnum.METER], open, (res) => {
    setMeterData({ ...meterData, ...res });
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const upItems: React.ReactNode[] = [];
  const downItems: React.ReactNode[] = [];
  const upTempItems: React.ReactNode[] = [];
  const downTempItems: React.ReactNode[] = [];
  const rightItems = (
    <>
      <div className="card-temp-item temp-right-item">
        <span className="card-temp-dot"></span>
        <div>
          温度{currentPage + 6}:
          <span className="card-temp-value">
            {tempFormat(emsData['Temperature' + (currentPage + 7)])}
          </span>
        </div>
      </div>
    </>
  );
  items.forEach((_, index) => {
    upItems.push(
      <div className="card-battery-item" key={'up' + index}>
        <span>
          电芯1_{currentPage}_{(index + 1) * currentPage}
        </span>
        <div className="card-battery-value">
          {voltageFormat(emsData['Voltage' + (index + 1) * currentPage] || '_')}
        </div>
      </div>,
    );
    downItems.push(
      <div className="card-battery-item" key={'down' + index}>
        <span>
          电芯1_{currentPage}_{(index + 13) * currentPage}
        </span>
        <div className="card-battery-value">
          {voltageFormat(emsData['Voltage' + (index + 13) * currentPage] || '_')}
        </div>
      </div>,
    );
  }); // Temperature Voltage
  tempArr.forEach((_, index) => {
    upTempItems.push(
      <div className="card-temp-item" key={'uptemp' + index}>
        <span className="card-temp-dot"></span>
        <div>
          温度{(index + 1) * currentPage}:
          <span className="card-temp-value">
            {tempFormat(emsData['Temperature' + (index + 1) * currentPage])}
          </span>
        </div>
      </div>,
    );
    downTempItems.push(
      <div className="card-temp-item" key={'downtemp' + index}>
        <div>
          温度{(index + 8) * currentPage}:
          <span className="card-temp-value">
            {tempFormat(emsData['Temperature' + (index + 8) * currentPage])}
          </span>
        </div>
        <span className="card-temp-dot"></span>
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
          <div className="desc-label">
            {emsData.SystemYear ? (
              `${emsData?.SystemYear}年${emsData?.SystemMonth}月${emsData?.SystemDay}日 星期${
                weekInfo[emsData?.SystemWeek]
              } ${emsData?.SystemTime}:${emsData?.SystemDivision}:${emsData?.SystemSeconds}`
            ) : (
              <>无</>
            )}
          </div>
          <Label className="mt24" title="状态信息" />
          <Detail data={emsData || {}} items={statusItems} column={5} />
          <Label className="mt24" title="设置信息" />
          <Detail data={emsData || {}} items={settingItems} column={5} />
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
          <Label className="mt24" title="测量信息" />
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
            <div className="flex1"></div>
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
