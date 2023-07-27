/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 16:19:01
 * @LastEditTime: 2023-07-24 11:41:50
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\index.tsx
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Button, Skeleton } from 'antd';
import { useRequest } from 'umi';
import Detail from '../Detail';
import type { DetailItem } from '../Detail';
import Dialog from '../Dialog';
import Label from '../Detail/LineLabel';
import EquipForm from '../EquipForm';
import { FormTypeEnum } from '@/utils/dictionary';
import { getDeviceInfo } from '@/services/equipment';
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
  } = useRequest(getDeviceInfo, {
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

  const onEditClick = () => {
    setOpenEditModal((openValue) => !openValue);
  };

  const equipInfoItems = useMemo<DetailItem[]>(() => {
    return [
      { label: '设备SN', field: 'sn' },
      { label: '所属站点', field: 'siteName' },
      { label: '产品类型', field: 'productTypeName' },
      { label: '产品型号', field: 'model' },
      { label: '产品名称', field: 'name' },
      { label: '软件版本号', field: 'a' },
      { label: '软件包名称', field: 'b' },
      { label: '录入时间', field: 'createTime' },
      { label: '激活时间', field: 'activeTime' },
      { label: '录入人', field: 'updateUserName' },
    ];
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Skeleton active paragraph={{ rows: 4 }} />
        </>
      ) : (
        <>
          <Label title="基础信息">
            <Button className="pr0" type="link" onClick={onEditClick}>
              修改
            </Button>
            {buttons}
          </Label>
          <Detail items={equipInfoItems} data={equipData} bordered size="small" />
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
