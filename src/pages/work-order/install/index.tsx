import { useCallback, useRef, useState } from 'react';
import type { ObstacleReportInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { getObstacleReport, getObstacleReportList, updateObstacleReportStatus } from './service';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import { ActionType } from '@ant-design/pro-components';
import { useSiteColumn } from '@/hooks';
import { FormRead } from '../components/FormRead';
import { columnsRead } from './configRead';
import { Button } from 'antd';
import YTModalForm from '@/components/YTModalForm';

const Install = (props: { actionRef?: React.Ref<ActionType> }) => {
  const [state, { set }] = useToggle<boolean>(false);
  const [statusModal, { set: setStatusModal }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.READ);
  const [initialValues, setInitialValues] = useState<ObstacleReportInfo>({} as ObstacleReportInfo);
  const actionRef = useRef<ActionType>(null);

  const customConfig: YTProTableCustomProps<ObstacleReportInfo, any> = {
    option: {
      onDetailChange(_, entity) {
        setInitialValues({ ...entity });
        setOperations(FormOperations.READ);
        set(true);
      },
    },
  };

  // const onSuccess = useCallback(() => {
  //   actionRef?.current?.reload?.();
  // }, [actionRef]);

  const [siteSearchColumn] = useSiteColumn({
    hideInTable: true,
    formItemProps: {
      rules: [{ required: true }],
      name: 'siteId',
    },
  });

  const requestList: YTProTableCustomProps<ObstacleReportInfo, ObstacleReportInfo>['request'] = (
    params,
  ) => {
    return getObstacleReportList(params);
  };

  return (
    <>
      <YTProTable<ObstacleReportInfo, ObstacleReportInfo>
        columns={[siteSearchColumn, ...columns]}
        toolBarRender={() => []}
        actionRef={actionRef}
        request={requestList}
        rowKey="id"
        {...customConfig}
        {...props}
      />
      <FormRead<ObstacleReportInfo>
        titleRead="查看故障修复工单"
        columns={columnsRead}
        submitter={{
          render: (_props) => {
            return [
              <Button
                key="ok"
                type="primary"
                onClick={() => {
                  setStatusModal(true);
                }}
              >
                完成
              </Button>,
              <Button
                key="ok"
                type="primary"
                onClick={() => {
                  // props.submit();
                }}
              >
                创建维修工单
              </Button>,
            ];
          },
        }}
        request={getObstacleReport}
        {...{
          operations: operations,
          visible: state,
          onVisibleChange: set,
          id: initialValues?.id,
          keyForId: 'faultId',
        }}
      />
      <YTModalForm<any, any>
        title={'完成原因'}
        visible={statusModal}
        onVisibleChange={setStatusModal}
        layoutType={'ModalForm'}
        onFinish={updateObstacleReportStatus}
        columns={[
          {
            title: '原因',
            valueType: 'textarea',
            colProps: {
              span: 24,
            },
          },
        ]}
      />
    </>
  );
};

export default Install;
