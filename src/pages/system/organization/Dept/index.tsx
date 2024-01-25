import { useCallback, useRef, useState } from 'react';
import type { ServiceInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { deleteService, getServiceList } from './service';
import { Update } from './Update';
import { FormOperations } from '@/components/YTModalForm/typing';
import { useToggle } from 'ahooks';
import { message } from 'antd';
import { ActionType } from '@ant-design/pro-components';
import { buildTreeData } from '@/utils/utils';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';

const Dept = (props: { actionRef?: React.Ref<ActionType> }) => {
  const [state, { set }] = useToggle<boolean>(false);
  const [operations, setOperations] = useState(FormOperations.CREATE);
  const [initialValues, setInitialValues] = useState<ServiceInfo>({} as ServiceInfo);
  const actionRef = useRef<ActionType>(null);
  const { authorityMap } = useAuthority(['system:org:add', 'system:org:edit', 'system:org:remove']);

  const customConfig: YTProTableCustomProps<ServiceInfo, any> = {
    toolBarRenderOptions: {
      add: {
        show: authorityMap.get('system:org:add'),
        onClick() {
          setInitialValues({} as ServiceInfo);
          setOperations(FormOperations.CREATE);
          set(true);
        },
        text: formatMessage({ id: 'common.newBuilt', defaultMessage: '新建' }),
      },
    },
    option: {
      ...(authorityMap.get('system:org:remove')
        ? {
            onDeleteChange(_, entity) {
              deleteService?.({ orgId: entity?.orgId })?.then?.(({ data }) => {
                if (data) {
                  message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
                  actionRef?.current?.reload?.();
                }
              });
            },
          }
        : {}),
      ...(authorityMap.get('system:org:edit')
        ? {
            onEditChange(_, entity) {
              setInitialValues({ ...entity });
              setOperations(FormOperations.UPDATE);
              set(true);
            },
          }
        : {}),
      renderInterceptor(entity) {
        return entity.parentId !== 0;
      },
      modalDeleteText: formatMessage({
        id: 'system.deleteAdministratorConfirm',
        defaultMessage: '您确认要删除该管理员吗？删除之后无法恢复！',
      }),
    },
  };
  const visibleUpdated = operations !== FormOperations.READ;

  const onSuccess = useCallback(() => {
    actionRef?.current?.reload?.();
  }, [actionRef]);

  const requestList: YTProTableCustomProps<ServiceInfo, ServiceInfo>['request'] = (params) => {
    return getServiceList({ ...params }).then((res) => {
      res.data = {
        list: buildTreeData(res.data, 'orgId', '', '', '', ''),
        total: res.data.length,
      };
      return res;
    });
  };
  return (
    <>
      <YTProTable<ServiceInfo, ServiceInfo>
        columns={columns}
        actionRef={actionRef}
        {...customConfig}
        request={requestList}
        rowKey="orgId"
        resizable
        expandable={{
          defaultExpandedRowKeys: [100],
          expandIcon: ({ expanded, expandable, record, onExpand }) => {
            return (
              <>
                {expandable ? (
                  <>
                    {expanded ? (
                      <CaretDownFilled
                        className="mr8 cursor table-expand-icon"
                        onClick={(e) => onExpand(record, e)}
                      />
                    ) : (
                      <CaretRightFilled
                        className="mr8 cursor table-expand-icon"
                        onClick={(e) => onExpand(record, e)}
                      />
                    )}
                  </>
                ) : (
                  <span className="mr8 table-expand-icon"></span>
                )}
              </>
            );
          },
        }}
        {...props}
      />
      <Update
        {...{
          operations: operations,
          visible: visibleUpdated && state,
          onVisibleChange: set,
          onSuccess: onSuccess,
          orgId: initialValues?.orgId,
        }}
      />
    </>
  );
};

export default Dept;
