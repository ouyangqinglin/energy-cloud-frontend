import React, { useRef, useCallback } from 'react';
import { Card, Button } from 'antd';
import { formatMessage, saveFile } from '@/utils';
import { useAuthority } from '@/hooks';
import { exportDataType } from './service';
import type { ProFormInstance } from '@ant-design/pro-components';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { columns } from './helper';
import { useBoolean } from 'ahooks';

const DataType: React.FC = () => {
  const { authorityMap } = useAuthority(['oss:dataStatistics:refresh:dataType']);
  const isEdit = authorityMap.get('oss:dataStatistics:refresh:dataType');
  const formRef = useRef<ProFormInstance>(null);
  const [loading, { setTrue, setFalse }] = useBoolean(false);

  const onExportClick = () => {
    formRef?.current?.submit?.();
  };

  const exportData = (params: any) => {
    return exportDataType(params).then((res) => {
      if (res) {
        saveFile(res, formatMessage({ id: 'dataManage.1050', defaultMessage: '数据类型' }));
      }
    });
  };
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
        title={formatMessage({ id: 'dataManage.1058', defaultMessage: '数据类型导出' })}
        extra={
          isEdit ? (
            <Button type="primary" loading={loading} onClick={onExportClick}>
              {formatMessage({ id: 'common.export', defaultMessage: '导出' })}
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
          editData={exportData}
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

export default DataType;
