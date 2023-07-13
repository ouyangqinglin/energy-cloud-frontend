import { useCallback, useRef, useState } from 'react';
import type { ObstacleReportInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { getObstacleReportList } from './service';
import { Update } from './Update';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import { ActionType } from '@ant-design/pro-components';

const Customer = (props: { actionRef?: React.Ref<ActionType> }) => {
  const [state, { set }] = useToggle<boolean>(false);
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
  const visibleUpdated = operations !== FormOperations.READ;

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  const requestList: YTProTableCustomProps<ObstacleReportInfo, ObstacleReportInfo>['request'] = (
    params,
  ) => {
    return getObstacleReportList(params);
  };
  return (
    <>
      <YTProTable<ObstacleReportInfo, ObstacleReportInfo>
        columns={columns}
        actionRef={actionRef}
        request={requestList}
        rowKey="id"
        {...customConfig}
        {...props}
      />
      {/* <Update
        {...{
          operations: operations,
          visible: visibleUpdated && state,
          onVisibleChange: set,
          onSuccess: onSuccess,
          id: initialValues?.orgId,
        }}
      /> */}
    </>
  );
};

export default Customer;
