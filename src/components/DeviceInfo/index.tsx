/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 16:19:01
 * @LastEditTime: 2023-06-27 13:40:19
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
import { getEquipInfo } from '@/services/equipment';
import { onlineFormat } from '@/utils/format';
import './index.less';

export type DeviceInfoProps = {
  id: string;
  model?: string;
  buttons?: React.ReactNode;
  equipmentImg?: string;
  productImg?: string;
  setLoading?: (loading: boolean) => void;
  onChange?: (value: Record<string, any>) => void;
  className?: string;
};

const DeviceInfo: React.FC<DeviceInfoProps> = (props) => {
  const {
    id,
    model,
    buttons,
    equipmentImg,
    productImg,
    setLoading,
    onChange,
    className = '',
  } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const {
    loading,
    data: equipData = {},
    run,
  } = useRequest(getEquipInfo, {
    manual: true,
  });

  useEffect(() => {
    setLoading?.(true);
    run({ deviceId: id })
      .then((data) => {
        onChange?.(data);
      })
      .finally(() => {
        setLoading?.(false);
      });
  }, [id, onChange]);

  const onCancel = () => {
    setOpenDialog(false);
  };

  const onClick = () => {
    setOpenDialog(true);
  };

  const onEditClick = () => {
    setOpenEditModal((openValue) => !openValue);
  };

  const equipInfoItems: DetailItem[] = [
    { label: '设备SN', field: 'sn' },
    { label: '所属站点', field: 'siteName' },
    { label: '产品类型', field: 'productTypeName' },
    { label: '产品型号', field: 'model' },
    { label: '产品名称', field: 'name' },
    { label: '软件版本号', field: 'a' },
    { label: '录入时间', field: 'createTime' },
    { label: '录入人', field: 'updateUserName' },
    { label: '软件包名称', field: 'b' },
    { label: '激活时间', field: 'activeTime' },
  ];

  return (
    <>
      {loading ? (
        <>
          <Skeleton active paragraph={{ rows: 4 }} />
        </>
      ) : (
        <>
          <Detail items={equipInfoItems} data={equipData} />
        </>
      )}
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

export default DeviceInfo;
