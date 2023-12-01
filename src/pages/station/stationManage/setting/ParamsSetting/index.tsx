/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:41:01
 * @LastEditTime: 2023-06-27 17:11:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\ParamsSetting\index.tsx
 */
import React, { useEffect, useMemo } from 'react';
import { useRequest, useModel } from 'umi';
import { useBoolean } from 'ahooks';
import { Card, Button, Image, Modal, message } from 'antd';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { getStation } from '@/services/station';
import Detail from '@/components/Detail';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import type { DetailItem } from '@/components/Detail';
import YTModalForm from '@/components/YTModalForm';
import { dataSaveTime, noticeMethod } from '@/utils/dict';
import {formatMessage} from "@/utils";

const ParamsSetting: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [openCustomPage, { set, setTrue }] = useBoolean(false);
  const {
    loading,
    data: pageData,
    run: runGetDefaultPage,
  } = useRequest(getStation, {
    manual: true,
  });

  useEffect(() => {
    if (siteId) {
      runGetDefaultPage(siteId);
    }
  }, [siteId]);

  const columns = useMemo<ProFormColumnsType[]>(() => {
    return [
      {
        title: formatMessage({ id: 'siteManage.set.historyDatSaveDuration', defaultMessage: '历史数据保存时长' }),
        dataIndex: 'userName',
        valueType: 'select',
        valueEnum: dataSaveTime,
        formItemProps: {
          rules: [{ required: true, message: formatMessage({ id: 'siteManage.set.selectHistoryDatSaveDuration', defaultMessage: '请选择历史数据保存时长' }) }],
        },
      },
    ];
  }, []);

  const noticeColumns = useMemo<ProFormColumnsType[]>(() => {
    return [
      {
        title: formatMessage({ id: 'common.notificationMode', defaultMessage: '通知方式' }),
        dataIndex: 'userName',
        valueType: 'radio',
        valueEnum: noticeMethod,
        formItemProps: {
          rules: [{ required: true, message: formatMessage({ id: 'common.selectNotificationMode', defaultMessage: '请选择通知方式' }) }],
        },
      },
      {
        title: formatMessage({ id: 'common.notificationPerson', defaultMessage: '通知人' }),
        dataIndex: 'a',
        formItemProps: {
          rules: [{ required: true, message: formatMessage({ id: 'common.selectNotificationPerson', defaultMessage: '请选择通知人' }) }],
        },
      },
    ];
  }, []);

  return (
    <>
      <div className="px24">
        <Card
          className="my16"
          title={formatMessage({ id: 'common.historyData', defaultMessage: '历史数据' })}
          extra={
            <Button type="primary" loading={loading} onClick={setTrue}>
              {formatMessage({ id: 'common.set', defaultMessage: '设置' })}
            </Button>
          }
        >
          <BetaSchemaForm
            layoutType="Form"
            columns={columns}
            submitter={false}
            grid={true}
            colProps={{
              span: 12,
            }}
          />
        </Card>
        <Card
          title={formatMessage({ id: 'system.Notice.message_notification', defaultMessage: '消息通知' })}
          extra={
            <Button type="primary" loading={loading} onClick={setTrue}>
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
