/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:22:37
 * @LastEditTime: 2023-07-05 11:02:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\stat\Fault\index.tsx
 */
import React, { useCallback, useMemo, useRef } from 'react';
import { StepsProps } from 'antd';
import { useRequest, useModel } from 'umi';
import { useBoolean } from 'ahooks';
import { ProFormColumnsType } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FaultType } from './type';
import { serviceProgressMap } from '@/utils/dictionary';
import { getPage, getData, addData } from './service';
import YTProTable from '@/components/YTProTable';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import Steps from '@/components/Steps';
import SchemaForm from '@/components/SchemaForm';
import { getLocale } from '@/utils';
import moment from 'moment';

const Fault: React.FC = () => {
  const [openDetail, { setTrue, setFalse }] = useBoolean(false);
  const [openForm, { set, setTrue: setOpenFormTrue }] = useBoolean(false);
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const actionRef = useRef<ActionType>();
  const {
    data: detailData,
    loading,
    run,
  } = useRequest(getData, {
    manual: true,
  });

  const onAddClick = useCallback(() => {
    setOpenFormTrue();
  }, []);

  const onDetailChange = useCallback((_, row: FaultType) => {
    run(row.id);
    setTrue();
  }, []);

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, []);

  const columns: ProColumns<FaultType>[] = useMemo(() => {
    return [
      {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 50,
      },
      {
        title: '故障标题',
        dataIndex: 'faultTitle',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '故障描述',
        dataIndex: 'faultDescription',
        width: 200,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '当前进度',
        dataIndex: 'currentProgress',
        valueType: 'select',
        valueEnum: serviceProgressMap,
        width: 120,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateRange',
        render: (_, record) => <span>{record.createTime}</span>,
        search: {
          transform: (value) => {
            return {
              startTime: moment(value[0]).format('YYYY-MM-DD'),
              endTime: moment(value[1]).format('YYYY-MM-DD'),
            };
          },
        },
        fieldProps: {
          format: getLocale().dateFormat,
        },
        width: 150,
      },
      {
        title: '完成时间',
        dataIndex: 'endTime',
        valueType: 'dateTime',
        width: 150,
        hideInSearch: true,
      },
    ];
  }, []);

  const stepsItem = useMemo<StepsProps['items']>(() => {
    return [
      {
        title: '申请（已受理）',
        description: detailData?.createTime,
      },
      {
        title: '处理中',
        description: detailData?.processingTime,
      },
      {
        title: '完成',
        description: detailData?.endTime,
      },
    ];
  }, [detailData]);

  const detailItems = useMemo<DetailItem[]>(() => {
    return [
      { label: '故障标题', field: 'faultTitle' },
      { label: '故障描述', field: 'faultDescription' },
      { label: '申请时间', field: 'createTime' },
    ];
  }, []);

  const formColumns = useMemo<ProFormColumnsType<FaultType>[]>(() => {
    return [
      {
        title: '故障标题',
        dataIndex: 'faultTitle',
        formItemProps: {
          rules: [{ required: true, message: '请填写故障标题' }],
        },
      },
      {
        title: '故障描述',
        dataIndex: 'faultDescription',
        valueType: 'textarea',
        formItemProps: {
          rules: [{ required: true, message: '请填写故障描述' }],
        },
      },
    ];
  }, []);

  return (
    <>
      <YTProTable<FaultType, Pick<FaultType, 'siteId'>>
        actionRef={actionRef}
        columns={columns}
        toolbar={{
          onChange: onAddClick,
          buttonText: '故障申报',
        }}
        option={{
          onDetailChange: onDetailChange,
        }}
        params={{
          siteId,
        }}
        request={getPage}
      />
      <DetailDialog
        title="故障申报详情"
        width="700px"
        open={openDetail}
        onCancel={setFalse}
        confirmLoading={loading}
        detailProps={{
          items: detailItems,
          data: detailData,
          column: 1,
          labelStyle: {
            width: '50%',
            justifyContent: 'flex-end',
          },
        }}
        prepend={
          <Steps
            className="mb30"
            current={detailData?.currentProgress == 3 ? 2 : detailData?.currentProgress}
            items={stepsItem}
          />
        }
      />
      <SchemaForm
        title="故障申报"
        columns={formColumns}
        open={openForm}
        onOpenChange={set}
        addData={addData}
        onSuccess={onSuccess}
        extraData={{
          siteId,
        }}
      />
    </>
  );
};

export default Fault;
