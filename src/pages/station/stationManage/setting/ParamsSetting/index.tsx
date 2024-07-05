/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:41:01
 * @LastEditTime: 2024-06-11 09:30:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\ParamsSetting\index.tsx
 */
import React, { useRef, useCallback } from 'react';
import EmptyPage from '@/components/EmptyPage';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';
import { Card, Button } from 'antd';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import type { ProFormInstance } from '@ant-design/pro-components';
import { columns } from './config';
import { useModel } from 'umi';
import { useBoolean } from 'ahooks';
import { editAlarmPush, getAlarmPush } from './service';

const ParamsSetting: React.FC = () => {
  const { authorityMap } = useAuthority([
    'siteManage:siteConfig:systemParamsSetting:alarmPut',
    'siteManage:siteConfig:systemParamsSetting:alarmPut:done',
  ]);
  const formRef = useRef<ProFormInstance>(null);
  const [loading, { setTrue, setFalse }] = useBoolean(false);
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));

  const onSaveClick = useCallback(() => {
    formRef?.current?.submit?.();
  }, []);

  const beforeSubmit = useCallback(() => {
    setTrue();
  }, [setTrue]);

  return (
    <>
      <div className="px24">
        {authorityMap.get('siteManage:siteConfig:systemParamsSetting:alarmPut') ? (
          <Card
            title={formatMessage({
              id: 'siteManage.1044',
              defaultMessage: '告警推送',
            })}
            extra={
              authorityMap.get('siteManage:siteConfig:systemParamsSetting:alarmPut:done') ? (
                <Button type="primary" loading={loading} onClick={onSaveClick}>
                  {formatMessage({ id: 'common.set', defaultMessage: '设置' })}
                </Button>
              ) : (
                <></>
              )
            }
          >
            <SchemaForm
              formRef={formRef}
              layoutType="Form"
              id={siteId}
              idKey="siteId"
              type={FormTypeEnum.Edit}
              columns={columns}
              submitter={false}
              editData={editAlarmPush}
              afterRequest={(data) => data}
              getData={getAlarmPush}
              beforeSubmit={beforeSubmit}
              onSuccess={setFalse}
              onError={setFalse}
              grid={true}
              colProps={{
                span: 8,
              }}
            />
          </Card>
        ) : (
          <EmptyPage
            description={formatMessage({ id: 'common.noneYet', defaultMessage: '暂无' })}
          />
        )}
      </div>
    </>
  );
};

export default ParamsSetting;
