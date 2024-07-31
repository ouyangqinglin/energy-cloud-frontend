/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:41:01
 * @LastEditTime: 2024-06-11 09:30:47
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\ParamsSetting\index.tsx
 */
import React, { useRef, useCallback } from 'react';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';
import { Card, Button } from 'antd';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import type { ProFormInstance } from '@ant-design/pro-components';
import { columns, currencyUnitColumns } from './config';
import { useModel } from 'umi';
import { useBoolean } from 'ahooks';
import { editAlarmPush, getAlarmPush, getParameterSetting, setParameterSetting } from './service';

const ParamsSetting: React.FC = () => {
  const { authorityMap } = useAuthority([
    'siteManage:siteConfig:systemParamsSetting:alarmPut',
    'siteManage:siteConfig:systemParamsSetting:alarmPut:done',
    'siteManage:siteConfig:systemParamsSetting:currencyUnit',
    'siteManage:siteConfig:systemParamsSetting:currencyUnit:done',
  ]);
  const formRef = useRef<ProFormInstance>(null);
  const unitFormRef = useRef<ProFormInstance>(null);

  const [loading, { setTrue, setFalse }] = useBoolean(false);
  const [unitLoading, { setTrue: unitSetTrue, setFalse: unitSetFalse }] = useBoolean(false);

  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));

  const onSaveClick = useCallback(() => {
    formRef?.current?.submit?.();
  }, []);

  const onUnitSaveClick = useCallback(() => {
    unitFormRef?.current?.submit?.();
  }, []);

  const beforeSubmit = useCallback(() => {
    setTrue();
  }, [setTrue]);

  const unitBeforeSubmit = useCallback(() => {
    unitSetTrue();
  }, [unitSetTrue]);

  return (
    <>
      <div className="px24">
        {authorityMap.get('siteManage:siteConfig:systemParamsSetting:alarmPut') && (
          <Card
            className="mt16"
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
        )}
        {authorityMap.get('siteManage:siteConfig:systemParamsSetting:currencyUnit') && (
          <Card
            className="mt16"
            title={formatMessage({
              id: 'siteManage.1045',
              defaultMessage: '货币单位',
            })}
            extra={
              authorityMap.get('siteManage:siteConfig:systemParamsSetting:currencyUnit:done') ? (
                <Button type="primary" loading={unitLoading} onClick={onUnitSaveClick}>
                  {formatMessage({ id: 'common.set', defaultMessage: '设置' })}
                </Button>
              ) : (
                <></>
              )
            }
          >
            <SchemaForm
              formRef={unitFormRef}
              layoutType="Form"
              id={siteId}
              idKey="siteId"
              type={FormTypeEnum.Edit}
              columns={currencyUnitColumns}
              submitter={false}
              editData={setParameterSetting}
              afterRequest={(data) => data}
              getData={getParameterSetting}
              beforeSubmit={unitBeforeSubmit}
              onSuccess={unitSetFalse}
              onError={unitSetFalse}
              grid={true}
              colProps={{
                span: 8,
              }}
            />
          </Card>
        )}
      </div>
    </>
  );
};

export default ParamsSetting;
