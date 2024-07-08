import React from 'react';
import { Card, Button } from 'antd';
import { formatMessage, saveFile } from '@/utils';
import { useAuthority } from '@/hooks';
import { exportDataType } from './service';
import { useRequest } from 'umi';

const DataType: React.FC = () => {
  const { authorityMap } = useAuthority(['oss:dataStatistics:refresh:dataType']);
  const isEdit = authorityMap.get('oss:dataStatistics:refresh:dataType');
  const { run, loading } = useRequest(exportDataType, {
    manual: true,
    formatResult: (res) => res,
  });

  const onExportClick = () => {
    run().then((res) => {
      if (res) {
        saveFile(res, formatMessage({ id: 'dataManage.1050', defaultMessage: '数据类型' }));
      }
    });
  };

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
      />
    </>
  );
};

export default DataType;
