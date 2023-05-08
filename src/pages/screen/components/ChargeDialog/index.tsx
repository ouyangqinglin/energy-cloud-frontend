/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 19:17:46
 * @LastEditTime: 2023-05-06 18:05:00
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\ChargeDialog\index.tsx
 */

import React, { useEffect } from 'react';
import { Row, Col, Button, Modal, Tabs } from 'antd';
import { useRequest } from 'umi';
import ScreenDialog from '@/components/ScreenDialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import ImgCharge from '@/assets/image/screen/dialog/charge.png';
import { getDeviceInfo } from '../../../../components/ScreenDialog/service';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { arrayToMap } from '@/utils';
import { useInfo } from '@/utils/dictionary';
import EquipInfo from '@/components/EquipInfo';

const useInfoMap = arrayToMap(useInfo);

const ChargeDialog: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const {
    data = {},
    loading,
    run,
  } = useRequest(getDeviceInfo, {
    manual: true,
  });
  data.img = data.img || ImgCharge;

  useEffect(() => {
    run(id);
  }, [id]);

  const Component = model === 'screen' ? ScreenDialog : Modal;

  const tabItems = [
    { label: '运行监测', key: 'item-0', children: '' },
    { label: '远程设置', key: 'item-1', children: '' },
    { label: '报警/故障', key: 'item-2', children: '' },
    { label: '设备日志', key: 'item-3', children: '' },
  ];

  return (
    <>
      <Component
        title="设备详情"
        open={open}
        onCancel={onCancel}
        loading={loading}
        width={model === 'screen' ? '62.5vw' : '1200px'}
        wrapClassName={model === 'screen' ? '' : 'dialog-equipment'}
        footer={null}
      >
        <EquipInfo data={data} product={data.product} model={model} />
        <Tabs items={tabItems} />
      </Component>
    </>
  );
};

export default ChargeDialog;
