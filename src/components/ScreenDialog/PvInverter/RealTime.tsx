/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 14:50:00
 * @LastEditTime: 2023-08-02 10:21:59
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\PvInverter\RealTime.tsx
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Skeleton } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { RealTimeProps } from '@/components/ScreenDialog';
import Label from '@/components/Detail/DotLabel';
import useSubscribe from '@/pages/screen/useSubscribe';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { LabelTypeEnum } from '@/components/ScreenDialog';
import {
  voltageFormat,
  currentFormat,
  powerFormat,
  noPowerFormat,
  powerHourFormat,
  frequencyFormat,
  tempFormat,
  mohmFormat,
  timeFormat,
} from '@/utils/format';
import type { PvInverterType } from './data';
import { isEmpty } from '@/utils';
import YTProTable from '@/components/YTProTable';

const RealTime: React.FC<
  RealTimeProps & {
    loopNum: number;
  }
> = (props) => {
  const {
    id,
    loading,
    open = true,
    detailProps,
    labelType = LabelTypeEnum.DotLabel,
    loopNum,
  } = props;

  const equipmentData = useSubscribe(id, open);
  const [tableColumns, setTableColumns] = useState<ProColumns<PvInverterType>[]>();

  const runItems = useMemo<DetailItem[]>(() => {
    return [
      { label: '电网A相电压', field: 'Ua', format: voltageFormat },
      { label: '电网A相电流', field: 'Ia', format: currentFormat },
      { label: '电网B相电压', field: 'Ub', format: voltageFormat },
      { label: '电网B相电流', field: 'Ib', format: currentFormat },
      { label: '电网C相电压', field: 'Uc', format: voltageFormat },
      { label: '电网C相电流', field: 'Ic', format: currentFormat },
      { label: '有功功率', field: 'P', format: powerFormat },
      { label: '当日发电量', field: 'dayCap', format: powerHourFormat },
      { label: '无功功率', field: 'reactivePower', format: noPowerFormat },
      { label: '累计发电量', field: 'totalCap', format: powerHourFormat },
      { label: '功率因数', field: 'powerFactor' },
      { label: '逆变器额定功率', field: 'ratedPowerOfInverter', format: powerFormat },
      { label: '输出方式', field: 'outputMethod' },
      { label: '电网频率', field: 'elecFreq', format: frequencyFormat },
      { label: '内部温度', field: 'temperature', format: tempFormat },
      { label: '逆变器开机时间', field: 'openTime', format: timeFormat, showExtra: false },
      { label: '绝缘阻抗值', field: 'insulationImpedanceValue', format: mohmFormat },
      { label: '逆变器关机时间', field: 'closeTime', format: timeFormat, showExtra: false },
    ];
  }, []);

  const tableData = useMemo(() => {
    const data: PvInverterType[] = [
      {
        title: '电压（V）',
        field: 'Upv',
      },
      {
        title: '电流（A）',
        field: 'Ipv',
      },
    ];
    return data;
  }, []);

  useEffect(() => {
    const columns: ProColumns<PvInverterType>[] = [
      {
        title: '回路',
        dataIndex: 'title',
        width: 90,
      },
    ];
    Array.from({ length: loopNum }).forEach((item, index) => {
      const num = index + 1;
      const column: ProColumns<PvInverterType> = {
        title: 'PV' + num,
        width: 50,
        align: 'center',
        render: (_, record) =>
          isEmpty(equipmentData?.[record.field + num]) ? '--' : equipmentData?.[record.field + num],
      };
      columns.push(column);
    });
    setTableColumns(columns);
  }, [loopNum, equipmentData]);

  return (
    <>
      {loading ? (
        <>
          <Skeleton className="mb24" paragraph={{ rows: 3 }} active />
          <Skeleton paragraph={{ rows: 6 }} active />
        </>
      ) : (
        <>
          {labelType == LabelTypeEnum.DotLabel ? (
            <Label title="直流侧" />
          ) : (
            <Detail.Label title="直流侧" />
          )}
          <YTProTable
            className="mb32"
            search={false}
            toolBarRender={false}
            columns={tableColumns}
            dataSource={tableData}
            pagination={false}
            rowKey="field"
            scroll={{ y: 'auto' }}
          />
          {labelType == LabelTypeEnum.DotLabel ? (
            <Label title="交流侧" />
          ) : (
            <Detail.Label title="交流侧" />
          )}
          <Detail data={equipmentData} items={runItems} {...(detailProps || {})} />
        </>
      )}
    </>
  );
};

export default RealTime;
