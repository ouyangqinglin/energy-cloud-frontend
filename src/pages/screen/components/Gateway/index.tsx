import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Button } from 'antd';
import { useRequest } from 'umi';
import ScreenDialog from '@/components/ScreenDialog';
import { getDeviceInfo } from '@/components/ScreenDialog/service';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import ImgCharge from '@/assets/image/screen/dialog/charge.png';
import Detail from '@/components/Detail';
import type { fieldType } from '@/utils/dictionary';
import { valueFormat } from '@/utils';
import Community from './community';

const Gateway: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const {
    data = {},
    loading,
    run,
  } = useRequest(getDeviceInfo, {
    manual: true,
  });
  data.img = data.img || ImgCharge;

  const onSettingClick = () => {
    setOpenSettingModal(!openSettingModal);
  };

  useEffect(() => {
    if (open) {
      run(id);
    }
  }, [open]);

  const Component = model === 'screen' ? ScreenDialog : Modal;

  const runItems = (data?.run?.gateway?.field || []).map((item: fieldType) => {
    return { ...item, format: valueFormat };
  });

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
          <Detail data={data?.run?.gateway?.value || {}} items={runItems} column={5} />
        </>
      ),
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: <></>,
    },
    {
      label: '报警/故障',
      key: 'item-2',
      children: <></>,
    },
    {
      label: '设备日志',
      key: 'item-3',
      children: <></>,
    },
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
        destroyOnClose
      >
        <EquipInfo
          id={id}
          model={model}
          buttons={
            <Button type="link" onClick={onSettingClick}>
              设置通信信息
            </Button>
          }
        />
        <Tabs items={tabItems} />
      </Component>
      <Community id={id} open={openSettingModal} onCancel={onSettingClick} model={model} />
    </>
  );
};

export default Gateway;
