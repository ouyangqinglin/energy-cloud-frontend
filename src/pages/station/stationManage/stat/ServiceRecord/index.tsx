/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:11:48
 * @LastEditTime: 2023-06-30 17:02:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\stat\ServiceRecord\index.tsx
 */
import React, { useCallback, useMemo } from 'react';
import { StepsProps } from 'antd';
import { useRequest, useModel } from 'umi';
import { useBoolean } from 'ahooks';
import type { ProColumns } from '@ant-design/pro-table';
import type { ServiceRecordType } from './data';
import { serviceProgressMap, serviceTypeMap } from '@/utils/dictionary';
import { getPage, getData } from './service';
import YTProTable from '@/components/YTProTable';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import Steps from '@/components/Steps';
import { useMaintenance } from '@/hooks';

export enum PageTypeEnum {
  Install,
  Maintenance,
}

type ServiceRecordProps = {
  type?: PageTypeEnum;
};

const ServiceRecord: React.FC<ServiceRecordProps> = (props) => {
  const { type = PageTypeEnum.Maintenance } = props;

  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));
  const [openDetail, { setTrue, setFalse }] = useBoolean(false);
  const [maintenanceColumn] = useMaintenance();
  const {
    data: detailData,
    loading,
    run,
  } = useRequest(getData, {
    manual: true,
  });

  const requestList = useCallback(
    (params: ServiceRecordType) => {
      return getPage({ ...params, serviceType: type, siteId });
    },
    [siteId, type],
  );

  const onDetailChange = useCallback((_, row: ServiceRecordType) => {
    run(row.taskId);
    setTrue();
  }, []);

  const columns = useMemo<ProColumns[]>(() => {
    return [
      {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 50,
      },
      {
        title: '服务类型',
        dataIndex: 'serviceType',
        valueType: 'select',
        valueEnum: serviceTypeMap,
        width: 120,
        hideInSearch: true,
      },
      {
        title: '任务编号',
        dataIndex: 'taskId',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      maintenanceColumn,
      {
        title: '当前进度',
        dataIndex: 'currentProgress',
        valueType: 'select',
        valueEnum: serviceProgressMap,
        width: 120,
        hideInSearch: true,
      },
      {
        title: '预约时间',
        dataIndex: 'appointmentTime',
        valueType: 'dateTime',
        hideInSearch: true,
        width: 150,
      },
      {
        title: '完成时间',
        dataIndex: 'endTime',
        valueType: 'dateRange',
        render: (_, record) => record.endTime,
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
    ];
  }, [maintenanceColumn]);

  const stepsItem = useMemo<StepsProps['items']>(() => {
    return [
      {
        title: '任务创建',
        description: detailData?.createTime,
      },
      {
        title: type === PageTypeEnum.Install ? '任务接收' : '工单接收',
        description: detailData?.processingTime,
      },
      {
        title: type === PageTypeEnum.Install ? '任务完成' : '工单完成',
        description: detailData?.endTime,
      },
    ];
  }, [detailData, type]);

  const detailItems = useMemo<DetailItem[]>(() => {
    return [
      { label: '服务类型', field: 'serviceType', format: (value) => serviceTypeMap.get(value) },
      { label: '服务编号', field: 'taskId' },
      {
        label: '服务状态',
        field: 'currentProgress',
        format: (value) => serviceProgressMap.get(value),
      },
      { label: '预约时间', field: 'appointmentTime' },
      { label: '完成时间', field: 'endTime' },
      { label: '维护人员', field: 'maintenanceStaff' },
      { label: '故障标题', field: 'faultTitle', show: type === PageTypeEnum.Maintenance },
      { label: '故障描述', field: 'faultDescription', show: type === PageTypeEnum.Maintenance },
    ];
  }, [type]);

  return (
    <>
      <YTProTable
        columns={columns}
        option={{
          onDetailChange: onDetailChange,
        }}
        toolBarRender={() => [<></>]}
        request={requestList}
      />
      <DetailDialog
        title="详情"
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

export default ServiceRecord;
