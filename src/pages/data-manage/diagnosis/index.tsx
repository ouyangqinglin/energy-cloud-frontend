import { tableTreeSelectValueTypeMap } from "@/components/TableSelect";
import { YTDateRangeValueTypeMap } from "@/components/YTDateRange";
import YTProTable from "@/components/YTProTable";
import { ActionType, ProColumns, ProConfigProvider, ProFormInstance } from "@ant-design/pro-components";
import { TaskInfo } from "./type";
import SchemaForm from "@/components/SchemaForm";
import { exportTaskColumns } from "../search/workbench/helper";
import { useCallback, useRef, useState } from "react";
import { Button, message } from "antd";
import { formatMessage, FormattedMessage } from "umi";
import { dealParams } from "../search/config";
import { YTProTableCustomProps } from "@/components/YTProTable/typing";
import { getData, getFileUrl } from "./service";
import { aLinkDownLoad } from "@/utils/downloadfile";
import { TableSearchType } from "../search/type";
import styles from '../search/workbench/index.less';
import { columns, formColumns } from "./config";


const Export: React.FC = () => {
  const [initVal, setInitVal] = useState<TaskInfo>({} as TaskInfo);
  const actionRef = useRef<ActionType>(null);
  const formRef = useRef<ProFormInstance<TableSearchType>>();
  const [open, setOpen] = useState(false);

  const requestList = useCallback((params) => {
    return getData({
      ...params,
    });
  }, []);

  const downloadLog = (url: string) => {
    aLinkDownLoad(url, '');
  };

  const requestExport = useCallback(
    (record) => {
      if (record.status === 1) {
        return getFileUrl({ platform: 1, url: record.url }).then((result) => {
          if (result.data !== '') {
            downloadLog(result.data as string);
          }

        })
      } else {
        // @ts-ignore
        return reExecuteExport({ id: record.id, type: 0 }).then((data) => {
          if (data) {
            message.success(formatMessage({ id: 'dataManage.1017', defaultMessage: '执行成功' }));
            onSuccess?.();
          }
        });
      }
    },
    [],
  );

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
          return (<span>-</span>);
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
            <FormattedMessage
              id={statusId}
              defaultMessage={defaultMessage}
            />
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
          formRef={formRef}
          open={open}
          className={styles.form}
          // @ts-ignore
          columns={formColumns}
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
