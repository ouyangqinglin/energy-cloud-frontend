/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 16:19:01
 * @LastEditTime: 2023-05-25 19:29:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipInfo\index.tsx
 */

import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Skeleton } from 'antd';
import { useRequest } from 'umi';
import Detail from '../Detail';
import type { DetailItem } from '../Detail';
import Dialog from '../Dialog';
import Label from '../Detail/label';
import EquipForm from '../EquipForm';
import { FormTypeEnum } from '@/utils/dictionary';
import { getEquipInfo } from './service';
import { onlineFormat } from '@/utils/format';

export type EquipInfoProps = {
  id: string;
  model?: string;
  buttons?: React.ReactNode;
  equipmentImg?: string;
  productImg?: string;
  setLoading?: (loading: boolean) => void;
};

const EquipInfo: React.FC<EquipInfoProps> = (props) => {
  const { id, model, buttons, equipmentImg, productImg, setLoading } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const {
    loading,
    data = {},
    run,
  } = useRequest(getEquipInfo, {
    manual: true,
  });

  useEffect(() => {
    setLoading?.(true);
    run({ deviceId: id }).finally(() => {
      setLoading?.(false);
    });
  }, [id]);

  const onCancel = () => {
    setOpenDialog(false);
  };

  const onClick = () => {
    setOpenDialog(true);
  };

  const onEditClick = () => {
    setOpenEditModal(!openEditModal);
  };

  const equipInfoItems: DetailItem[] = [
    {
      label: '在线状态',
      field: 'status',
      span: 3,
      format: onlineFormat,
    },
    { label: '设备编码', field: 'deviceId' },
    { label: '产品型号', field: 'model' },
    { label: '设备SN', field: 'sn' },
    { label: '设备名称', field: 'name' },
    { label: '产品类型', field: 'productTypeName' },
    { label: '子系统', field: 'subsystemName' },
    { label: '录入时间', field: 'createTime' },
    { label: '激活时间', field: 'activeTime' },
    { label: '最近上线时间', field: 'sessionStartTime', show: data?.status !== 0 },
    { label: '最近离线时间', field: 'offlineTime', show: data?.status === 0 },
    { label: '录入人', field: 'updateUserName' },
    { label: '在线时长', field: 'onlineTime' },
    { label: '所属站点', field: 'siteName' },
  ];

  return (
    <>
      <Row>
        <Col flex={model === 'screen' ? '0 0 9.41vw' : '0 0 180px'}>
          <div className="dialog-product-logo-wrap">
            {loading ? (
              <Skeleton.Image active />
            ) : (
              <div
                className="dialog-product-logo"
                style={{ backgroundImage: `url(${data?.url || equipmentImg})` }}
              />
            )}
          </div>
        </Col>
        <Col className="productInfo" flex="1">
          <Label title="基本信息" />
          {loading ? (
            <>
              <Skeleton active paragraph={{ rows: 4 }} />
              <div className="flex">
                <div className="flex1">
                  <Skeleton.Button active />
                </div>
                <Skeleton.Button active />
              </div>
            </>
          ) : (
            <>
              <Detail items={equipInfoItems} data={data} />
              <div className="flex">
                <div className="flex1">
                  {productImg && (
                    <Button className="ant-btn-primary" type="primary" onClick={onClick}>
                      产品介绍
                    </Button>
                  )}
                </div>
                {buttons}
                <Button type="link" onClick={onEditClick}>
                  修改基本信息
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
      <Dialog model={model} title="产品介绍" open={openDialog} onCancel={onCancel} footer={null}>
        <img className="w-full" src={productImg} />
      </Dialog>
      <EquipForm
        id={id}
        open={openEditModal}
        onCancel={onEditClick}
        model={model}
        type={FormTypeEnum.Edit}
        onSuccess={() => run({ deviceId: id })}
      />
    </>
  );
};

export default EquipInfo;
