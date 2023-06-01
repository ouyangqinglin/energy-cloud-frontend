/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 19:17:46
 * @LastEditTime: 2023-06-01 16:00:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\EnergyDialog\index.tsx
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Tabs, Button, Skeleton, Row, Col, Space } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import OperationMonitor from './operationMonitor';
import Alarm from './alarm';
import Log from './log';
import Setting from './setting';
import { getChildEquipment } from './service';
import EnergyImg from '@/assets/image/product/energy.png';
import EnergyIntroImg from '@/assets/image/product/energy-intro.jpg';
import AccountCommunity from '@/components/ScreenDialog/Community/AccountCommunity';

const EnergyDialog: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [equipmentIds, setEquipmentIds] = useState({});
  const [loading, setLoading] = useState(false);
  const [openCommunity, setOpenCommunity] = useState(false);

  const switchOpenCommunity = useCallback(() => {
    setOpenCommunity((openData) => !openData);
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
                <Skeleton.Button size="small" />
                <Skeleton.Button size="small" />
                <Skeleton.Button size="small" />
                <Skeleton.Button size="small" />
                <Skeleton.Button size="small" />
              </Space>
            </Col>
            <Col flex="1">
              <Space className="mb12" direction="vertical">
                <Skeleton.Button size="small" />
                <Skeleton.Button size="small" />
              </Space>
              <Skeleton paragraph={{ rows: 2 }} />
              <Skeleton.Button className="mb12" size="small" />
              <Skeleton paragraph={{ rows: 4 }} />
            </Col>
          </Row>
        </>
      ) : (
        <OperationMonitor open={open} equipmentIds={equipmentIds} />
      ),
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: <Setting id={id} />,
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
          buttons={
            <Button type="link" onClick={switchOpenCommunity}>
              设置通信参数
            </Button>
          }
          setLoading={setLoading}
        />
        <Tabs items={tabItems} />
      </Dialog>
      <AccountCommunity
        model={model}
        open={openCommunity}
        onOpenChange={setOpenCommunity}
        id={id}
        userLabel="EMS  mqtt用户名"
        passwordLabel="EMS mqtt密码"
      />
    </>
  );
};

export default EnergyDialog;
