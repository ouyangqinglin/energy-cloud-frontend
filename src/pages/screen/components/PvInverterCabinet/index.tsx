/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-12 14:22:46
 * @LastEditTime: 2023-05-13 13:49:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\PvInverterCabinet\index.tsx
 */

import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Tabs } from 'antd';
import ScreenDialog from '@/components/ScreenDialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import Detail from '@/components/Detail';
import Empty from '@/components/Empty';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import PvInverterCabinetImg from '@/assets/image/product/pvInverter-cabinet.png';
import PvInverterCabinetIntroImg from '@/assets/image/product/pvInverter-intro.jpg';
import type { DetailItem } from '@/components/Detail';
import useWebsocket from '@/pages/screen/useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import {
  powerFormat,
  powerHourFormat,
  voltageFormat,
  currentFormat,
  noPowerHourFormat,
} from '@/utils/format';
import { EquipPropType } from '@/utils/dictionary';

const PvInverterCabinet: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [equipmentData, setEquipmentData] = useState({});

  const Component = model === 'screen' ? ScreenDialog : Modal;

  const runItems: DetailItem[] = [
    { label: 'A相电压', field: 'Ua', format: voltageFormat },
    { label: 'AB线电压', field: 'Uab', format: voltageFormat },
    { label: 'A相电流', field: 'Ia', format: currentFormat, span: 2 },
    { label: 'B相电压', field: 'Ub', format: voltageFormat },
    { label: 'BC线电压', field: 'Ubc', format: voltageFormat },
    { label: 'B相电流', field: 'Ib', format: currentFormat, span: 2 },
    { label: 'C相电压', field: 'Uc', format: voltageFormat },
    { label: 'CA线电压', field: 'Uca', format: voltageFormat },
    { label: 'C相电流', field: 'Ic', format: currentFormat, span: 2 },

    { label: 'A相有功功率', field: 'Pa', format: powerFormat },
    { label: 'A相无功功率', field: 'Qa', format: powerHourFormat },
    { label: 'A相视在功率', field: 'Sa', format: powerHourFormat },
    { label: 'A相功率因数', field: 'COSa' },
    { label: 'B相有功功率', field: 'Pb', format: powerFormat },
    { label: 'B相无功功率', field: 'Qb', format: powerHourFormat },
    { label: 'B相视在功率', field: 'Sb', format: powerHourFormat },
    { label: 'B相功率因数', field: 'COSb' },
    { label: 'C相有功功率', field: 'Pc', format: powerFormat },
    { label: 'C相无功功率', field: 'Qc', format: powerHourFormat },
    { label: 'C相视在功率', field: 'Sc', format: powerHourFormat },
    { label: 'C相功率因数', field: 'COSc' },
    { label: '总有功功率', field: 'P', format: powerFormat },
    { label: '总无功功率', field: 'Q', format: powerHourFormat },
    { label: '总视在功率', field: 'S', format: powerHourFormat },
    { label: '总功率因数', field: 'COS' },

    { label: '正向有功电能', field: 'Pimp', format: powerHourFormat },
    { label: '反向有功电能', field: 'Qimp', format: powerHourFormat },
    { label: '正向无功电能', field: 'Pexp', format: noPowerHourFormat },
    { label: '反向无功电能', field: 'Qexp', format: noPowerHourFormat },
  ];

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
          <Detail data={equipmentData || {}} items={runItems} column={4} />
        </>
      ),
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: <Empty />,
    },
    {
      label: '报警/故障',
      key: 'item-2',
      children: <AlarmTable />,
    },
    {
      label: '设备日志',
      key: 'item-3',
      children: <LogTable />,
    },
  ];

  const onReceivedMessage = useCallback((res: any) => {
    if (MessageEventType.DEVICE_REAL_TIME_DATA === res?.type && id == res?.data?.deviceId) {
      const { data } = res;
      try {
        const obj = {};
        data?.keyValues?.forEach((item: EquipPropType) => {
          obj[item.key] = item.value;
        });
        if (Object.keys(obj).length) {
          setEquipmentData({ ...equipmentData, ...obj });
        }
      } catch (e) {}
    }
    // const key = Math.random() > 0.5 ? 'b' : 'c';
    // setEquipmentData({ ...equipmentData, a: 1, [key]: 2 });
  }, []);

  const { connection } = useWebsocket();
  useEffect(() => {
    if (open) {
      connection.sendMessage({
        data: {
          command: RequestCommandEnum.SUBSCRIBE,
          device: id,
        },
        type: MessageEventType.DEVICE_REAL_TIME_DATA,
      });
    }
    connection.addReceivedMessageCallback(onReceivedMessage);
    return () => {
      connection.removeReceivedMessageCallback(onReceivedMessage);
    };
  }, [open]);

  return (
    <>
      <Component
        title="设备详情"
        open={open}
        onCancel={onCancel}
        width={model === 'screen' ? '62.5vw' : '1200px'}
        wrapClassName={model === 'screen' ? '' : 'dialog-equipment'}
        footer={null}
        destroyOnClose
      >
        <EquipInfo
          id={id}
          model={model}
          equipmentImg={PvInverterCabinetImg}
          productImg={PvInverterCabinetIntroImg}
        />
        <Tabs items={tabItems} />
      </Component>
    </>
  );
};

export default PvInverterCabinet;
