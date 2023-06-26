/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 19:17:46
 * @LastEditTime: 2023-06-26 11:02:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\EnergyDialog\index.tsx
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Tabs, Button, Skeleton, Row, Col, Space } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import type { DeviceType } from '@/components/EquipInfo/type';
import OperationMonitor from './operationMonitor';
import Alarm from './alarm';
import Log from './log';
import Setting from './setting';
import { getChildEquipment } from './service';
import EnergyImg from '@/assets/image/product/energy.png';
import EnergyIntroImg from '@/assets/image/product/energy-intro.jpg';
import AccountCommunity from '@/components/ScreenDialog/Community/Account';
import Community from '../Community';

const EnergyDialog: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [equipmentIds, setEquipmentIds] = useState({});
  const [loading, setLoading] = useState(true);
  const [settingData, setSettingData] = useState<Record<string, any>>();
  const [deviceData, setDeviceData] = useState<DeviceType>();

  const onDataChange = useCallback((data) => {
    setDeviceData(data);
  }, []);

  useEffect(() => {
    if (open) {
      getChildEquipment({ parentId: id }).then((res) => {
        const obj = {};
        res?.data?.forEach?.((item: any) => {
          obj[item.productId] = item.deviceId;
        });
        setEquipmentIds(obj);
      });
    }
  }, [open]);

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: loading ? (
        <>
          <Row gutter={20}>
            <Col flex="100px">
              <Space direction="vertical">
                <Skeleton.Button size="small" active />
                <Skeleton.Button size="small" active />
                <Skeleton.Button size="small" active />
                <Skeleton.Button size="small" active />
                <Skeleton.Button size="small" active />
              </Space>
            </Col>
            <Col flex="1">
              <Space className="mb12" direction="vertical">
                <Skeleton.Button size="small" active />
                <Skeleton.Button size="small" active />
              </Space>
              <Skeleton paragraph={{ rows: 2 }} active />
              <Skeleton.Button className="mb12" size="small" active />
              <Skeleton paragraph={{ rows: 4 }} active />
            </Col>
          </Row>
        </>
      ) : (
        <OperationMonitor
          open={open}
          equipmentIds={equipmentIds}
          onEmsDataChange={setSettingData}
        />
      ),
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: <Setting id={id} settingData={settingData} />,
    },
    {
      label: '告警/故障',
      key: 'item-2',
      children: <Alarm equipmentIds={equipmentIds} />,
    },
    {
      label: '日志',
      key: 'item-3',
      children: <Log equipmentIds={equipmentIds} />,
    },
  ];

  return (
    <>
      <Dialog
        model={model}
        title="设备详情"
        open={open}
        onCancel={onCancel}
        footer={null}
        destroyOnClose
      >
        <EquipInfo
          id={id}
          model={model}
          equipmentImg={EnergyImg}
          productImg={EnergyIntroImg}
          setLoading={setLoading}
          buttons={
            <Community
              id={id}
              model={model}
              siteId={deviceData?.siteId}
              type={deviceData?.paramConfigType}
              userLabel="EMS mqtt用户名"
              passwordLabel="EMS mqtt密码"
            />
          }
          onChange={onDataChange}
        />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default EnergyDialog;
