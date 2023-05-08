/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-06 16:19:01
 * @LastEditTime: 2023-05-06 17:58:49
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EquipInfo\index.tsx
 */

import React, { useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import Detail from '../Detail';
import type { DetailItem } from '../Detail';
import ScreenDialog from '../ScreenDialog';

export type EquipInfoProps = {
  data: {
    img: string;
  };
  product: {
    desc: string;
    link: string;
  };
  model?: string;
};

const EquipInfo: React.FC<EquipInfoProps> = (props) => {
  const { data, product, model } = props;
  const [openDialog, setOpenDialog] = useState(false);

  const onCancel = () => {
    setOpenDialog(false);
  };

  const onClick = () => {
    setOpenDialog(true);
  };

  const equipInfoItems: DetailItem[] = [
    { label: '在线状态', field: 'online', span: 3 },
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
          <div className="flex label">
            <span className="labelLine" />
            基本信息
          </div>
          <Detail
            items={equipInfoItems}
            data={data}
            labelStyle={
              model === 'screen'
                ? { width: '4.5vw', color: '#A7B7CA', fontSize: '1.11vh' }
                : { width: '88px', fontSize: '12px' }
            }
            contentStyle={
              model === 'screen' ? { color: 'white', fontSize: '1.11vh' } : { fontSize: '12px' }
            }
          />
          <Button className="btnMore" type="link" onClick={onClick}>{`产品介绍>`}</Button>
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
            <img className="dialog-product-logo" src={data.img} />
          </Col>
          <Col className="productInfo" flex="1">
            <Detail
              items={productInfoItem}
              data={product || {}}
              column={2}
              labelStyle={
                model === 'screen'
                  ? { width: '4.5vw', color: '#A7B7CA', fontSize: '1.11vh' }
                  : { width: '65px', fontSize: '12px' }
              }
              contentStyle={
                model === 'screen' ? { color: 'white', fontSize: '1.11vh' } : { fontSize: '12px' }
              }
            />
            <div className="label">
              <span className="flex labelLine" />
              产品介绍
            </div>
            <div className="desc">{product.desc}</div>
            <Button
              className="btnMore"
              type="link"
              href={product.link}
              target="_blank"
            >{`了解更多>`}</Button>
          </Col>
        </Row>
      </Component>
    </>
  );
};

export default EquipInfo;
