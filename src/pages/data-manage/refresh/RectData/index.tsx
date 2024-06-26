import React, { useCallback, useRef } from 'react';
import { Card, Button } from 'antd';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useBoolean } from 'ahooks';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { columns } from './helper';
import { editSiteData } from './service';

const RectData: React.FC = () => {
  const { authorityMap } = useAuthority(['oss:dataStatistics:refresh:rect:done']);
  const isEdit = authorityMap.get('oss:dataStatistics:refresh:rect:done');
  const formRef = useRef<ProFormInstance>(null);
  const [loading, { setTrue, setFalse }] = useBoolean(false);
  const onSaveClick = useCallback(() => {
    formRef?.current?.submit?.();
  }, []);

  const beforeSubmit = useCallback(
    (data) => {
      data.startTime = data.time[0];
      data.endTime = data.time[1];
      delete data.time;
      setTrue();
    },
    [setTrue],
  );

  return (
    <>
      <Card
        title={formatMessage({ id: 'dataManage.1006', defaultMessage: '同步' })}
        extra={
          isEdit ? (
            <Button type="primary" loading={loading} onClick={onSaveClick}>
              {formatMessage({ id: 'dataManage.1016', defaultMessage: '执行' })}
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
          editData={editSiteData}
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

export default RectData;
