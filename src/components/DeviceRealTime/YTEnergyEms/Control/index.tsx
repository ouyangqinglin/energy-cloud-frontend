/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-27 09:55:28
 * @LastEditTime: 2023-11-26 09:55:00
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
      title: item.label || '确认',
      content: '是否执行当前参数下发',
      okText: '确认',
      cancelText: '取消',
      onOk: () =>
        run({
          deviceId: id,
          input: { paramList: [{ [item.field]: btnItem.value }] },
          serviceId: item?.field,
        }).then((data: any) => {
          if (data) {
            message.success('下发成功');
          }
        }),
    });
  }, []);
  return (
    <>
      <LineLabel title="系统状态控制" />
      <div className={styles.control}>
        {controlItems.map((item: any) => {
          return (
            <div className={styles.labelBox}>
              <Space wrap>
                <div className={styles.label}>{item.label}</div>
                {item.btnParam.map((btnItem: any) => {
                  return (
                    <>
                      <Button
                        type={settingData[item.field] == btnItem.value ? 'primary' : 'default'}
                        ghost={settingData[item.field] == btnItem.value}
                        loading={loading}
                        onClick={() => {
                          btnClick(item, btnItem);
                        }}
                        disabled={item.disabled && settingData?.systemOperatingMode != 2}
                      >
                        <Radio
                          name={item.field}
                          className="mr8"
                          checked={settingData[item.field] == btnItem.value}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                        {btnItem.text}
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
