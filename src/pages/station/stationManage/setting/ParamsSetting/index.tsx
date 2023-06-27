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
import { dataSaveTime, noticeMethod } from '@/utils/dictionary';

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
        title: '历史数据保存时长',
        dataIndex: 'userName',
        valueType: 'select',
        valueEnum: dataSaveTime,
        formItemProps: {
          rules: [{ required: true, message: '请选择历史数据保存时长' }],
        },
      },
    ];
  }, []);

  const noticeColumns = useMemo<ProFormColumnsType[]>(() => {
    return [
      {
        title: '通知方式',
        dataIndex: 'userName',
        valueType: 'radio',
        valueEnum: noticeMethod,
        formItemProps: {
          rules: [{ required: true, message: '请选择通知方式' }],
        },
      },
      {
        title: '通知人',
        dataIndex: 'a',
        formItemProps: {
          rules: [{ required: true, message: '请选择通知人' }],
        },
      },
    ];
  }, []);

  return (
    <>
      <Card
        className="my16"
        title="历史数据"
        extra={
          <Button type="primary" loading={loading} onClick={setTrue}>
            设置
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
        title="消息通知"
        extra={
          <Button type="primary" loading={loading} onClick={setTrue}>
            设置
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
    </>
  );
};

export default ParamsSetting;
