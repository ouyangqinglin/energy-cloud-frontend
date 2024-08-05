import React, { useCallback, useRef, useState } from 'react';
import { columns } from './config';
import YTProTable from '@/components/YTProTable';
import { getData, exportList, createTask } from './service';
import { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { TaskInfo } from './type';
import { formatMessage } from '@/utils';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';
import {
  ActionType,
  ProColumns,
  ProConfigProvider,
  ProFormInstance,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { FormattedMessage } from 'umi';
import { tableTreeSelectValueTypeMap } from '@/components/TableSelect';
import SchemaForm from '@/components/SchemaForm';
import { TableSearchType } from '../search/type';
import styles from '../search/workbench/index.less';
import { exportTaskColumns } from '../search/workbench/helper';
import { dealParams } from '../search/config';
import config from 'config/config';

const Export: React.FC = () => {
  const [initVal, setInitVal] = useState<TaskInfo>({} as TaskInfo);
  const [firstFailure, setReDownload] = useState(false);
  const actionRef = useRef<ActionType>(null);
  const formRef = useRef<ProFormInstance<TableSearchType>>();
  const [open, setOpen] = useState(false);

  const requestList = useCallback((params) => {
    if (params.time) {
      params.startTime = params.time[0];
      params.endTime = params.time[1];
      delete params.time;
    }
    return getData({
      ...params,
    });
  }, []);

  const requestExport = useCallback(
    (params) => {
      setReDownload(!firstFailure);
      return exportList({
        startTime: params?.time?.[0]?.format?.('YYYY-MM-DD'),
        endTime: params?.time?.[1]?.format?.('YYYY-MM-DD'),
      });
    },
    [firstFailure],
  );

  const operation: ProColumns = {
    title: formatMessage({ id: 'dataManage.1075', defaultMessage: '操作' }),
    valueType: 'option',
    width: 100,
    fixed: 'right',
    align: 'center',
    render: (_: any, record: any) => (
      <>
        <Button type="link" size="small" key="taskDownload" onClick={requestExport}>
          <FormattedMessage
            id={firstFailure ? 'dataManage.1086' : 'common.download'}
            defaultMessage={'重新执行/下载'}
          />
        </Button>
      </>
    ),
  };

  const toolBar: YTProTableCustomProps<TaskInfo, any> = {
    toolBarRenderOptions: {
      add: {
        text: formatMessage({ id: 'pages.searchTable.new', defaultMessage: '新建' }),
        onClick() {
          setInitVal({} as TaskInfo);
          ('');
          setOpen(true);
        },
      },
    },
  };

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  const onValuesChange = useCallback((_, params) => {
    dealParams(params);
  }, []);

  // const getExportName = useCallback((params: TableSearchType) => {
  //   const date = params?.time || [];
  //   return (
  //     formatMessage({ id: 'dataManage.samplingDetail', defaultMessage: '采样明细' }) +
  //     '-' +
  //     moment(date[0]).format('YYYY-MM-DD') +
  //     '~' +
  //     moment(date[1]).format('YYYY-MM-DD')
  //   );
  // }, []);

  const collectParams = (formData: { collection: any[]; startTime: any; endTime: any; name: any; }) => {
    let config = { keyValue: [] as any }

    formData.collection.forEach((item: any, index: number) => {
      config.keyValue.push({
        deviceName: item.node.deviceName,
        key: item.node.paramCode,
        deviceId: item.node.deviceId,
        name: item.node.deviceName
      })
    });

    return {
      config: config,
      startTime: formData.startTime,
      endTime: formData.endTime,
      name: formData.name,
      type: 0,
    }
  }

  const onFinish = useCallback(
    (formData) => {
      // @ts-ignore
      return createTask(collectParams(formData)).then(({ data }) => {
        if (data) {
          message.success(formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }));
          onSuccess?.();
          return true;
        }
      });
    },
    [formRef.current],
  );

  return (
    <>
      <ProConfigProvider
        valueTypeMap={{
          ...YTDateRangeValueTypeMap,
          ...tableTreeSelectValueTypeMap,
        }}
      >
        <YTProTable<TaskInfo, TaskInfo>
          rowKey="exportTaskId"
          scroll={{ y: 471 }}
          pagination={{ defaultPageSize: 10 }}
          // @ts-ignore
          columns={[...columns, operation]}
          request={requestList}
          {...toolBar}
          form={{
            ignoreRules: false,
          }}
        />

        <SchemaForm
          formRef={formRef}
          open={open}
          className={styles.form}
          columns={exportTaskColumns}
          onValuesChange={onValuesChange}
          onSuccess={onSuccess}
          // @ts-ignore
          onFinish={onFinish}
        />
      </ProConfigProvider>
    </>
  );
};

export default Export;
