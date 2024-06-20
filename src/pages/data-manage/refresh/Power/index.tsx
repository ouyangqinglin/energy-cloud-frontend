import React, { useCallback, useRef } from 'react';
import { Card, Button, message } from 'antd';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useBoolean } from 'ahooks';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { columns } from './helper';
import { editData } from './service';

const Power: React.FC = () => {
  const { authorityMap } = useAuthority(['oss:dataStatistics:refresh:power:done']);
  const isEdit = authorityMap.get('oss:dataStatistics:refresh:power:done');
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
        className="my16 mx24"
        title={formatMessage({ id: 'dataManage.1007', defaultMessage: '刷新' })}
        extra={
          isEdit ? (
            <Button type="primary" loading={loading} onClick={onSaveClick}>
              {formatMessage({ id: 'device.1016', defaultMessage: '执行' })}
            </Button>
          ) : (
            <></>
          )
        }
      >
        <SchemaForm
          formRef={formRef}
          layoutType="Form"
          type={FormTypeEnum.Add}
          columns={columns}
          addData={editData}
          beforeSubmit={beforeSubmit}
          onSuccess={setFalse}
          onError={setFalse}
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

export default Power;
