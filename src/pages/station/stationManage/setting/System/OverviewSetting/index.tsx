import React, { useCallback, useRef } from 'react';
import { useModel } from 'umi';
import { useBoolean } from 'ahooks';
import { Card, Button } from 'antd';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { columns } from './config';
import { ProFormInstance } from '@ant-design/pro-components';
import { editData } from './service';
import { ConfigDataType, getSiteScreenConfig as getData } from '@/services/station';
import { isEmpty } from '@/utils';

const OverviewSetting: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const formRef = useRef<ProFormInstance>(null);
  const [loading, { setTrue, setFalse }] = useBoolean(true);

  const onSaveClick = useCallback(() => {
    formRef?.current?.submit?.();
  }, []);

  const afterRequest = useCallback((formData) => {
    if (!isEmpty(formData?.status)) {
      formData.status = formData.status + '';
    }
    setFalse();
  }, []);

  return (
    <>
      <Card
        className="mt16 mx24"
        title="大屏架构图"
        extra={
          <Button type="primary" loading={loading} onClick={onSaveClick}>
            保存
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
    </>
  );
};

export default OverviewSetting;
