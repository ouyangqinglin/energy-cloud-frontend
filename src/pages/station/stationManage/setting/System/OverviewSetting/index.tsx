import React, { useCallback, useRef } from 'react';
import { useModel } from 'umi';
import { useBoolean } from 'ahooks';
import { Card, Button } from 'antd';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { columns, alarmcolumns } from './config';
import { ProFormInstance } from '@ant-design/pro-components';
import { editData } from './service';
import {
  ConfigDataType,
  AlarmConfigDataType,
  getSiteScreenConfig as getData,
} from '@/services/station';
import { formatMessage, isEmpty } from '@/utils';

const OverviewSetting: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const formRef = useRef<ProFormInstance>(null);
  const alarmFormRef = useRef<ProFormInstance>(null);
  const [loading, { setTrue, setFalse }] = useBoolean(true);
  const [alarmLoading, { setTrue: setAlarmTrue, setFalse: setAlarmFalse }] = useBoolean(true);

  const onSaveClick = useCallback((ref) => {
    ref?.current?.submit?.();
  }, []);

  const afterRequest = useCallback((formData) => {
    if (!isEmpty(formData?.status)) {
      formData.status = formData.status + '';
    }
    if (!isEmpty(formData?.alarmShow)) {
      formData.alarmShow = formData.alarmShow + '';
    }
    if (formData && isEmpty(formData?.energyFlowDiagramIds)) {
      delete formData?.energyFlowDiagramIds;
    }
    setFalse();
    setAlarmFalse();
  }, []);

  return (
    <>
      <Card
        className="mt16 mx24"
        title={formatMessage({ id: 'common.screenArchitecture', defaultMessage: '大屏架构图' })}
        extra={
          <Button type="primary" loading={loading} onClick={() => onSaveClick(formRef)}>
            {formatMessage({ id: 'common.save', defaultMessage: '保存' })}
          </Button>
        }
      >
        <SchemaForm<ConfigDataType>
          formRef={formRef}
          layoutType="Form"
          type={FormTypeEnum.Edit}
          columns={columns}
          submitter={false}
          id={siteId}
          idKey="siteId"
          editData={editData}
          getData={getData}
          afterRequest={afterRequest}
          beforeSubmit={setTrue}
          onSuccess={setFalse}
          onError={setFalse}
          grid={true}
          colProps={{
            span: 12,
          }}
        />
      </Card>
      <Card
        className="mt16 mx24"
        title={formatMessage({
          id: 'common.alarmDisplayConfiguration',
          defaultMessage: '告警显示配置',
        })}
        extra={
          <Button type="primary" loading={alarmLoading} onClick={() => onSaveClick(alarmFormRef)}>
            {formatMessage({ id: 'common.save', defaultMessage: '保存' })}
          </Button>
        }
      >
        <SchemaForm<AlarmConfigDataType>
          formRef={alarmFormRef}
          layoutType="Form"
          type={FormTypeEnum.Edit}
          columns={alarmcolumns}
          submitter={false}
          id={siteId}
          idKey="siteId"
          editData={editData}
          getData={getData}
          afterRequest={afterRequest}
          beforeSubmit={setAlarmTrue}
          onSuccess={setAlarmFalse}
          onError={setAlarmFalse}
          grid={true}
          colProps={{
            span: 12,
          }}
        />
      </Card>
    </>
  );
};

export default OverviewSetting;
