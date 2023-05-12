/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 16:19:01
 * @LastEditTime: 2023-05-10 10:44:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipInfo\index.tsx
 */

import React, { useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import Detail from '../Detail';
import type { DetailItem } from '../Detail';
import ScreenDialog from '../ScreenDialog';
import Label from '../Detail/label';
import EquipForm from '../EquipForm';
import { EquipFormType } from '../EquipForm/data.d';
import { FormTypeEnum } from '@/utils/dictionary';

export type EquipInfoProps = {
  data: EquipFormType;
  product: {
    desc: string;
    link: string;
  };
  model?: string;
  onSetting?: () => void;
};

const EquipInfo: React.FC<EquipInfoProps> = (props) => {
  const { data, product, model, onSetting } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

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
      field: 'online',
      span: 3,
      format: (value) => {
        if (value == 1) {
          return <span style={{ color: '#28F0EE' }}>在线</span>;
        } else {
          return <span style={{ color: '#FF5656' }}>离线</span>;
        }
      },
    },
    { label: '设备编码', field: 'code' },
    { label: '产品型号', field: 'model' },
    { label: '设备SN', field: 'sn' },
    { label: '设备名称', field: 'name' },
    { label: '产品类型', field: 'type' },
    { label: '子系统', field: 'childSystem' },
    { label: '录入时间', field: 'createdTime' },
    { label: '激活时间', field: 'activeTime' },
    { label: '最近上线时间', field: 'onlineTime' },
    { label: '录入人', field: 'creator' },
    { label: '在线时长', field: 'onlineHour' },
    { label: '所属站点', field: 'station' },
  ];
  const productInfoItem: DetailItem[] = [
    { label: '产品型号', field: 'model' },
    { label: '产品类型', field: 'type' },
    { label: '产品厂商', field: 'company' },
  ];

  const Component = model === 'screen' ? ScreenDialog : Modal;

  return (
    <>
      <Row>
        <Col flex={model === 'screen' ? '0 0 10.41vw' : '0 0 200px'}>
          <img className="dialog-product-logo" src={data.img} />
        </Col>
        <Col className="productInfo" flex="1">
          <Label title="基本信息" />
          <Detail items={equipInfoItems} data={data} />
          <div className="flex">
            <div className="flex1">
              <Button className="ant-btn-primary" type="primary" onClick={onClick}>
                产品介绍
              </Button>
            </div>
            {onSetting && (
              <Button type="link" onClick={onSetting}>
                设置通信信息
              </Button>
            )}
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
        width={model === 'screen' ? '33.33vw' : '640px'}
        wrapClassName={model === 'screen' ? '' : 'dialog-equipment'}
        footer={null}
      >
        <Row>
          <Col flex={model === 'screen' ? '0 0 10.41vw' : '0 0 200px'}>
            <img className="dialog-product-logo" src={data?.img} />
          </Col>
          <Col className="productInfo" flex="1">
            <Detail items={productInfoItem} data={product || {}} column={2} />
            <Label title="产品介绍" />
            <div className="desc">{product?.desc}</div>
            <Button
              className="btnMore"
              type="link"
              href={product?.link}
              target="_blank"
            >{`了解更多>`}</Button>
          </Col>
        </Row>
      </Component>
      <EquipForm
        id={data?.id}
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
