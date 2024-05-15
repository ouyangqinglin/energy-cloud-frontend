/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-05-14 09:55:59
 * @LastEditTime: 2024-05-15 15:28:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\VideoMonitor\index.tsx
 */

import React, { memo, useCallback, useRef } from 'react';
import { Card, Button } from 'antd';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';
import { useModel } from 'umi';
import { useBoolean } from 'ahooks';
import { editData } from './service';
import { getVideoMonitorData } from '@/services/station';
import { ProFormInstance } from '@ant-design/pro-components';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { columns } from './helper';

const VideoMonitor: React.FC = () => {
  const formRef = useRef<ProFormInstance>(null);
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [loading, { setTrue, setFalse }] = useBoolean(true);
  const { authorityMap } = useAuthority(['siteManage:siteConfig:runManage:videoMonitor.edit']);
  const isEdit = authorityMap.get('siteManage:siteConfig:runManage:videoMonitor.edit');

  const onSaveClick = useCallback((ref) => {
    formRef?.current?.submit?.();
  }, []);

  const afterRequest = useCallback((data) => {
    data.monitorStatus = data.monitorStatus + '';
    data.jumpMethod = data.jumpMethod + '';
    data.androidAppId = data.androidAppId + '';
    data.iosAppId = data.iosAppId + '';
    try {
      data.config = JSON.parse(data?.config);
    } catch {
      data.config = {};
    }
    setFalse();
  }, []);

  const beforeSubmit = useCallback((data) => {
    data.config = JSON.stringify(data.config);
    setTrue();
  }, []);

  return (
    <>
      <Card
        className="my16 mx24"
        title={formatMessage({ id: 'siteManage.1001', defaultMessage: '视频监控' })}
        extra={
          isEdit ? (
            <Button type="primary" loading={loading} onClick={onSaveClick}>
              {formatMessage({ id: 'common.save', defaultMessage: '保存' })}
            </Button>
          ) : (
            <></>
          )
        }
      >
        <SchemaForm
          formRef={formRef}
          layoutType="Form"
          type={FormTypeEnum.Edit}
          columns={columns}
          submitter={false}
          id={siteId}
          idKey="siteId"
          editData={editData}
          getData={getVideoMonitorData}
          afterRequest={afterRequest}
          beforeSubmit={beforeSubmit}
          onSuccess={setFalse}
          onError={setFalse}
          grid={true}
          colProps={{
            span: 8,
          }}
        />
      </Card>
    </>
  );
};

export default memo(VideoMonitor);
