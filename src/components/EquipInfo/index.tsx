/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 16:19:01
 * @LastEditTime: 2023-05-12 10:01:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipInfo\index.tsx
 */

import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import Detail from '../Detail';
import type { DetailItem } from '../Detail';
import ScreenDialog from '../ScreenDialog';
import Label from '../Detail/label';
import EquipForm from '../EquipForm';
import { EquipFormType } from '../EquipForm/data.d';
import { FormTypeEnum } from '@/utils/dictionary';
import ImgCharge from '@/assets/image/screen/dialog/charge.png';
import { getEquipInfo } from './service';

export type EquipInfoProps = {
  // data: EquipFormType;
  id: string;
  model?: string;
  buttons?: React.ReactNode;
  equipmentImg?: string;
  productImg?: string;
};

const EquipInfo: React.FC<EquipInfoProps> = (props) => {
  const { id, model, buttons, equipmentImg, productImg } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [data, setData] = useState<EquipFormType>({});

  useEffect(() => {
    getEquipInfo({ deviceId: id }).then((res) => {
      setData(res.data);
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
      format: (value) => {
        if (value == 1) {
          return <span style={{ color: '#28F0EE' }}>在线</span>;
        } else {
          return <span style={{ color: '#FF5656' }}>离线</span>;
        }
      },
    },
    { label: '设备编码', field: 'deviceId' },
    { label: '产品型号', field: 'model' },
    { label: '设备SN', field: 'sn' },
    { label: '设备名称', field: 'name' },
    { label: '产品类型', field: 'productTypeName' },
    { label: '子系统', field: 'subsystemName' },
    { label: '录入时间', field: 'createTime' },
    { label: '激活时间', field: 'activeTime' },
    { label: '最近上线时间', field: 'updateTime' },
    { label: '录入人', field: 'updateUserName' },
    { label: '在线时长', field: 'onlineTime' },
    { label: '所属站点', field: 'siteName' },
  ];

  const Component = model === 'screen' ? ScreenDialog : Modal;

  return (
    <>
      <Row>
        <Col flex={model === 'screen' ? '0 0 10.41vw' : '0 0 200px'}>
          <div className="dialog-product-logo-wrap">
            <div
              className="dialog-product-logo"
              style={{ backgroundImage: `url(${data?.url || equipmentImg})` }}
            />
          </div>
        </Col>
        <Col className="productInfo" flex="1">
          <Label title="基本信息" />
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
        </Col>
      </Row>
      <Component
        title="产品介绍"
        open={openDialog}
        onCancel={onCancel}
        width={model === 'screen' ? '62.5vw' : '1200px'}
        wrapClassName={model === 'screen' ? '' : 'dialog-equipment'}
        footer={null}
      >
        <img className="w-full" src={productImg} />
      </Component>
      <EquipForm
        id={id}
        data={data}
        open={openEditModal}
        onCancel={onEditClick}
        model={model}
        type={FormTypeEnum.Edit}
      />
    </>
  );
};

export default EquipInfo;
