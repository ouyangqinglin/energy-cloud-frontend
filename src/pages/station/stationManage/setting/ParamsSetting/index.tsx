/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:41:01
 * @LastEditTime: 2024-04-28 09:07:48
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\ParamsSetting\index.tsx
 */
import React, { useMemo } from 'react';
import { Card, Button } from 'antd';
import { BetaSchemaForm } from '@ant-design/pro-components';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import { noticeMethod } from '@/utils/dict';
import { formatMessage } from '@/utils';

const ParamsSetting: React.FC = () => {
  const noticeColumns = useMemo<ProFormColumnsType[]>(() => {
    return [
      {
        title: formatMessage({ id: 'common.notificationMode', defaultMessage: '通知方式' }),
        dataIndex: 'userName',
        valueType: 'radio',
        valueEnum: noticeMethod,
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({
                id: 'common.selectNotificationMode',
                defaultMessage: '请选择通知方式',
              }),
            },
          ],
        },
      },
      {
        title: formatMessage({ id: 'common.notificationPerson', defaultMessage: '通知人' }),
        dataIndex: 'a',
        formItemProps: {
          rules: [
            {
              required: true,
              message: formatMessage({
                id: 'common.selectNotificationPerson',
                defaultMessage: '请选择通知人',
              }),
            },
          ],
        },
      },
    ];
  }, []);

  return (
    <>
      <div className="px24">
        <Card
          className="mt16"
          title={formatMessage({
            id: 'system.Notice.message_notification',
            defaultMessage: '消息通知',
          })}
          extra={
            <Button type="primary">
              {formatMessage({ id: 'common.set', defaultMessage: '设置' })}
            </Button>
          }
        >
          <BetaSchemaForm
            layoutType="Form"
            columns={noticeColumns}
            submitter={false}
            grid={true}
            colProps={{
              span: 12,
            }}
          />
        </Card>
      </div>
    </>
  );
};

export default ParamsSetting;
