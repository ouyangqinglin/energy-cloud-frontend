/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:22:37
 * @LastEditTime: 2023-06-29 17:48:50
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\stat\Fault\index.tsx
 */
import React, { useCallback, useMemo } from 'react';
import { StepsProps } from 'antd';
import { useRequest } from 'umi';
import { useBoolean } from 'ahooks';
import type { ProColumns } from '@ant-design/pro-table';
import type { FaultType } from './type';
import { serviceProgressType } from '@/utils/dictionary';
import { getPage, getData } from './service';
import YTProTable from '@/components/YTProTable';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import Steps from '@/components/Steps';

const Fault: React.FC = () => {
  const [openDetail, { setTrue, setFalse }] = useBoolean(false);
  const {
    data: detailData,
    loading,
    run,
  } = useRequest(getData, {
    manual: true,
  });

  const onAddClick = useCallback(() => {}, []);

  const onDetailChange = useCallback((_, row: FaultType) => {
    run(row.id);
    setTrue();
  }, []);

  const columns: ProColumns<FaultType>[] = useMemo(() => {
    return [
      {
        title: '序号',
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
        valueEnum: serviceProgressType,
        width: 120,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateRange',
        render: (_, record) => <span>{record.endTime}</span>,
        search: {
          transform: (value) => {
            return {
              startTime: value[0],
              endTime: value[1],
            };
          },
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

  const detailItems = useMemo<DetailItem[]>(() => {
    return [
      { label: '故障标题', field: 'faultTitle' },
      { label: '故障描述', field: 'faultDescription' },
      { label: '申请时间', field: 'createTime' },
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

  return (
    <>
      <YTProTable<FaultType, FaultType>
        columns={columns}
        toolbar={{
          onChange: onAddClick,
          buttonText: '故障申报',
        }}
        option={{
          onDetailChange: onDetailChange,
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
    </>
  );
};

export default Fault;
