/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 14:50:00
 * @LastEditTime: 2023-10-19 09:45:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\PvInverter\RealTime.tsx
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Skeleton } from 'antd';
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
import { formatMessage, isEmpty } from '@/utils';
import YTProTable from '@/components/YTProTable';
import { ProColumns } from '@ant-design/pro-components';
import { DeviceTypeEnum } from '@/utils/dictionary';

const RealTime: React.FC<
  RealTimeProps & {
    productId?: DeviceTypeEnum;
    loopNum: number;
  }
> = (props) => {
  const {
    id,
    productId,
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
      {
        label:
          formatMessage({ id: 'siteMonitor.powerGrid', defaultMessage: '电网' }) +
          'A' +
          formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相' }) +
          formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' }),
        field: 'Ua',
        format: voltageFormat,
      },
      {
        label:
          formatMessage({ id: 'siteMonitor.powerGrid', defaultMessage: '电网' }) +
          'A' +
          formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相' }) +
          formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流' }),
        field: 'Ia',
        format: currentFormat,
      },
      {
        label:
          formatMessage({ id: 'siteMonitor.powerGrid', defaultMessage: '电网' }) +
          'B' +
          formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相' }) +
          formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' }),
        field: 'Ub',
        format: voltageFormat,
      },
      {
        label:
          formatMessage({ id: 'siteMonitor.powerGrid', defaultMessage: '电网' }) +
          'B' +
          formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相' }) +
          formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流' }),
        field: 'Ib',
        format: currentFormat,
      },
      {
        label:
          formatMessage({ id: 'siteMonitor.powerGrid', defaultMessage: '电网' }) +
          'C' +
          formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相' }) +
          formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' }),
        field: 'Uc',
        format: voltageFormat,
      },
      {
        label:
          formatMessage({ id: 'siteMonitor.powerGrid', defaultMessage: '电网' }) +
          'C' +
          formatMessage({ id: 'siteMonitor.phase', defaultMessage: '相' }) +
          formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流' }),
        field: 'Ic',
        format: currentFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.activePower', defaultMessage: '有功功率' }),
        field: 'P',
        format: powerFormat,
      },
      {
        label: formatMessage({
          id: 'siteMonitor.dayPowerGeneration',
          defaultMessage: '今日发电量',
        }),
        field: 'dayCap',
        format: powerHourFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.reactivePower', defaultMessage: '无功功率' }),
        field: 'reactivePower',
        format: noPowerFormat,
      },
      {
        label: formatMessage({
          id: 'siteMonitor.cumulativePowerGeneration',
          defaultMessage: '累计发电量',
        }),
        field: 'totalCap',
        format: powerHourFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.powerFactor', defaultMessage: '功率因数' }),
        field: 'powerFactor',
      },
      {
        label: formatMessage({
          id: 'siteMonitor.inverterRatedPower',
          defaultMessage: '逆变器额定功率',
        }),
        field: 'ratedPowerOfInverter',
        format: powerFormat,
        show: (productId as DeviceTypeEnum) != DeviceTypeEnum.GRWTPvInverter,
      },
      {
        label: formatMessage({ id: 'siteMonitor.outputMode', defaultMessage: '输出方式' }),
        field: 'outputMethod',
        showExtra: false,
      },
      {
        label: formatMessage({ id: 'siteMonitor.gridFrequency', defaultMessage: '电网频率' }),
        field: 'elecFreq',
        format: frequencyFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.internalTemperature', defaultMessage: '内部温度' }),
        field: 'temperature',
        format: tempFormat,
      },
      {
        label: formatMessage({
          id: 'siteMonitor.inverterStartupTime',
          defaultMessage: '逆变器开机时间',
        }),
        field: 'openTime',
        format: timeFormat,
        showExtra: false,
        show: (productId as DeviceTypeEnum) != DeviceTypeEnum.GRWTPvInverter,
      },
      {
        label: formatMessage({
          id: 'siteMonitor.insulationImpedanceValue',
          defaultMessage: '绝缘阻抗值',
        }),
        field: 'insulationImpedanceValue',
        format: mohmFormat,
        show: (productId as DeviceTypeEnum) != DeviceTypeEnum.GRWTPvInverter,
      },
      {
        label: formatMessage({
          id: 'siteMonitor.inverterShutdownTime',
          defaultMessage: '逆变器关机时间',
        }),
        field: 'closeTime',
        format: timeFormat,
        showExtra: false,
        show: (productId as DeviceTypeEnum) != DeviceTypeEnum.GRWTPvInverter,
      },
    ];
  }, [productId]);

  const tableData = useMemo(() => {
    const data: PvInverterType[] = [
      {
        title: formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' }) + '（V）',
        field: 'Upv',
      },
      {
        title: formatMessage({ id: 'siteMonitor.current', defaultMessage: '电流' }) + '（A）',
        field: 'Ipv',
      },
    ];
    return data;
  }, []);

  useEffect(() => {
    const columns: ProColumns<PvInverterType>[] = [
      {
        title: formatMessage({ id: 'siteMonitor.loop', defaultMessage: '回路' }),
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
            <Label title={formatMessage({ id: 'siteMonitor.dcSide', defaultMessage: '直流侧' })} />
          ) : (
            <Detail.Label
              title={formatMessage({ id: 'siteMonitor.dcSide', defaultMessage: '直流侧' })}
            />
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
            <Label title={formatMessage({ id: 'siteMonitor.acSide', defaultMessage: '交流侧' })} />
          ) : (
            <Detail.Label
              title={formatMessage({ id: 'siteMonitor.acSide', defaultMessage: '交流侧' })}
            />
          )}
          <Detail data={equipmentData} items={runItems} {...(detailProps || {})} />
        </>
      )}
    </>
  );
};

export default RealTime;
