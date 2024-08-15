import React, { useCallback, useRef, useState } from 'react';
import { columns, exportTaskColumns } from './config';
import YTProTable from '@/components/YTProTable';
import { getData, createTask, reExecuteExport, getFileUrl } from './service';
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
import { dealParams } from '../search/config';
import { aLinkDownLoad } from '@/utils/downloadfile';
import { useBoolean } from 'ahooks';

const Export: React.FC = () => {
  // @ts-ignore
  const [initVal, setInitVal] = useState<TaskInfo>({} as TaskInfo);
  const actionRef = useRef<ActionType>(null);
  const formRef = useRef<ProFormInstance<TableSearchType>>();
  const [openForm, { set, setTrue: setOpenFormTrue, setFalse }] = useBoolean(false);

  const requestList = useCallback((params) => {
    return getData({
      ...params,
    });
  }, []);

  const downloadLog = (url: string) => {
    aLinkDownLoad(url, '');
  };

  const onSuccess = useCallback(() => {
    setFalse();
    actionRef?.current?.reload?.();
  }, [actionRef]);

  const requestExport = useCallback((record) => {
    if (record.status === 1) {
      return getFileUrl({ platform: 1, url: record.url }).then((result) => {
        if (result.data !== '') {
          downloadLog(result.data as string);
        }
      });
    } else {
      // @ts-ignore
      return reExecuteExport({ id: record.id, type: 0 }).then((data) => {
        if (data) {
          message.success(formatMessage({ id: 'dataManage.1017', defaultMessage: '执行成功' }));
          onSuccess?.();
        }
      });
    }
  }, []);

  const operation: ProColumns = {
    title: formatMessage({ id: 'dataManage.1075', defaultMessage: '操作' }),
    valueType: 'option',
    width: 100,
    fixed: 'right',
    align: 'center',
    render: (_: any, record: any) => {
      let statusId = '';
      let defaultMessage = '';
      // 0执行中 1成功 2失败
      switch (record.status) {
        case 0:
          return <span>-</span>;
        case 1:
          statusId = 'common.download';
          defaultMessage = '下载';
          break;
        case 2:
          statusId = 'dataManage.1086';
          defaultMessage = '重新执行';
          break;
      }

      return (
        <>
          <Button type="link" size="small" key="taskDownload" onClick={() => requestExport(record)}>
            <FormattedMessage id={statusId} defaultMessage={defaultMessage} />
          </Button>
        </>
      );
    },
  };

  const toolBar: YTProTableCustomProps<TaskInfo, any> = {
    toolBarRenderOptions: {
      add: {
        text: formatMessage({ id: 'pages.searchTable.new', defaultMessage: '新建' }),
        onClick() {
          setInitVal({} as TaskInfo);
          // setOpen(true);
          setOpenFormTrue();
        },
      },
    },
  };

  const onValuesChange = useCallback((_, params) => {
    dealParams(params);
  }, []);

  const collectParams = (formData: {
    collection: any[];
    startTime: any;
    endTime: any;
    name: any;
  }) => {
    const config = { keyValue: [] as any };

    formData.collection.forEach((item: any) => {
      config.keyValue.push({
        deviceName: item.node.deviceName,
        key: item.node.paramCode,
        deviceId: item.node.deviceId,
        name: item.node.deviceName,
      });
    });

    return {
      config: config,
      startTime: formData.startTime,
      endTime: formData.endTime,
      name: formData.name,
      type: 0,
    };
  };

  const onFinish = useCallback(
    (formData) => {
      // @ts-ignore
      return createTask(collectParams(formData))
        .then(({ data }) => {
          if (data) {
            message.success(
              formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }),
            );
            onSuccess?.();
          }
        })
        .finally(() => {
          // setOpen(false);
          setFalse();
          return true;
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
          actionRef={actionRef}
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
          width={900}
          formRef={formRef}
          open={openForm}
          className={styles.form}
          columns={exportTaskColumns}
          onValuesChange={onValuesChange}
          onSuccess={onSuccess}
          onOpenChange={set}
          // @ts-ignore
          onFinish={onFinish}
          grid={true}
        />
      </ProConfigProvider>
    </>
  );
};

export default Export;
