/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-25 15:22:57
 * @LastEditTime: 2023-09-25 16:15:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteUpgrade\UpgradeRecord\index.tsx
 */
import YTProTable from '@/components/YTProTable';
import React, { useCallback, useEffect, useRef } from 'react';
import { columns } from './helper';
import { RemoteUpgradeType } from '../typing';
import { getUpgradeRecord } from '@/services/equipment';
import { Button, Modal } from 'antd';
import { useBoolean } from 'ahooks';
import { ActionType } from '@ant-design/pro-components';
import { formatMessage } from '@/utils';

const UpgradeRecord: React.FC<RemoteUpgradeType> = (props) => {
  const { deviceId } = props;

  const actionRef = useRef<ActionType>();
  const [open, { setTrue, setFalse }] = useBoolean(false);

  const requestList = useCallback(
    (params) => {
      return getUpgradeRecord({ ...params, deviceId });
    },
    [deviceId],
  );

  useEffect(() => {
    if (open && deviceId) {
      actionRef?.current?.reloadAndRest?.();
    }
  }, [open, deviceId]);

  return (
    <>
      <Button className="pr0" type="link" onClick={setTrue}>
        {formatMessage({ id: 'device.upgradeRecord', defaultMessage: '升级记录' })}
      </Button>
      <Modal title={formatMessage({ id: 'device.upgradeRecord', defaultMessage: '升级记录' })} width={900} open={open} onCancel={setFalse} onOk={setFalse}>
        <YTProTable
          actionRef={actionRef}
          columns={columns}
          request={requestList}
          toolBarRender={false}
          search={false}
        />
      </Modal>
    </>
  );
};

export default UpgradeRecord;
