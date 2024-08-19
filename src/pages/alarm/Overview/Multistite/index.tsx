import React, { useCallback, useState } from 'react';
import { columns } from './config';
import YTProTable from '@/components/YTProTable';
import { getData } from './service';
import styles from './index.less';
import { formatMessage, tabelDataToExcel } from '@/utils';

const Multistite: React.FC = () => {
  const [exportData, setExportData] = useState<any[]>([]);
  const requestExport = () => {
    return tabelDataToExcel(exportData, columns);
  };

  const handlerData = (data: any[], params: any) => {
    console.log('params>>', params);
    console.log('data>>', data);
    setExportData(data);
    return data;
  };

  const requestData = useCallback((params: any) => {
    return getData(params).then((res) => {
      const data = res.data;
      data.list = handlerData(data.list, params);
      return {
        data,
        total: res.total,
        success: true,
      };
    });
  }, []);
  return (
    <>
      <YTProTable
        className={styles.Multi_table}
        scroll={{ y: 400 }}
        columns={columns}
        toolBarRenderOptions={{
          add: {
            show: false,
          },
          export: {
            show: true,
            requestExport: requestExport,
            getExportName: () =>
              formatMessage({ id: 'alarmManage.1003', defaultMessage: '多站点统计' }),
          },
        }}
        bordered
        request={requestData as any}
        form={{
          ignoreRules: false,
        }}
      />
    </>
  );
};

export default Multistite;
