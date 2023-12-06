/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-27 09:55:28
 * @LastEditTime: 2023-10-27 11:00:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\YTEnergyEms\Control\index.tsx
 */

import React, { useCallback, useEffect } from 'react';
import { Button, Space, message, Modal, Radio } from 'antd';
import { DeviceTypeEnum } from '@/utils/dictionary';
import { default as LineLabel } from '@/components/Detail/LineLabel';
import styles from '../index.less';
import { controlItems } from './config';
import { useRequest } from 'umi';
import { editSetting } from '@/services/equipment';
import { formatMessage } from '@/utils';
type SettingProps = {
  id: string;
  settingData?: Record<string, any>;
  isLineLabel?: boolean;
  isDeviceChild?: boolean;
  type?: DeviceTypeEnum;
};

const Setting: React.FC<SettingProps> = (props) => {
  const { id, isLineLabel = false, isDeviceChild, type } = props;
  const settingData = props.settingData || {}; //实时数据
  const btnDisabled = settingData?.systemOperatingMode == 2 ? false : true;
  const { loading, run } = useRequest(editSetting, {
    manual: true,
  });
  const btnClick = useCallback((item, btnItem) => {
    Modal.confirm({
      title: item.label || formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
      content: formatMessage({
        id: 'device.whetherExecuteCurrentParameter',
        defaultMessage: '是否执行当前参数下发',
      }),
      okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
      cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
      onOk: () =>
        run({
          deviceId: id,
          input: { paramList: [{ [item.field]: btnItem.value }] },
          serviceId: item?.field,
        }).then((data: any) => {
          if (data) {
            message.success(
              formatMessage({ id: 'device.issueSuccess', defaultMessage: '下发成功' }),
            );
          }
        }),
    });
  }, []);
  return (
    <>
      <LineLabel
        title={formatMessage({ id: 'device.systemStateControl', defaultMessage: '系统状态控制' })}
      />
      <div className={styles.control}>
        {controlItems.map((item: any) => {
          return (
            <div className={styles.labelBox}>
              <Space wrap>
                <div>{item.label + ':'}</div>
                {item.btnParam.map((btnItem: any) => {
                  return (
                    <>
                      <Button
                        type={settingData[item.field] == btnItem.value ? 'primary' : 'default'}
                        disabled={btnDisabled}
                        onClick={() => {
                          btnClick(item, btnItem);
                        }}
                        loading={loading}
                      >
                        {<Radio> {btnItem.text}</Radio>}
                      </Button>
                    </>
                  );
                })}
              </Space>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Setting;
