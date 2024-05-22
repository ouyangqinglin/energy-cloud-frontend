import { Columns } from './config';
import type { ServiceParam, ServiceUpdateInfo } from '../type';
import { createService, getService, getServiceId, updateService } from '../service';
import { useCallback, useEffect, useState, memo } from 'react';
import { isCreate } from '@/components/YTModalForm/helper';
import { set, unset } from 'lodash';
import type { PositionSelectType } from '@/components/PositionSelect';
import { FormUpdate } from '../../components/FormUpdate';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { formatMessage } from '@/utils';
import { useModel } from 'umi';
import { getServiceList } from '../service';
import { buildTreeData } from '@/utils/utils';

export const Update = memo((props: FormUpdateBaseProps) => {
  const { initialState } = useModel('@@initialState');
  const [orgId, setOrgId] = useState<number>();
  const [treeData, setTreeData] = useState<any[]>([]);

  const getTreeData = async (id: number, name: string) => {
    const { data: serviceList } = await getServiceList();
    if (serviceList.length == 0) {
      setTreeData([
        {
          id: 0,
          title: formatMessage({ id: 'system.noSuperior', defaultMessage: '无上级' }),
          children: undefined,
          key: 0,
          value: 0,
        },
      ]);
      return;
    }
    if (id) {
      const index = serviceList.findIndex((i) => i.orgId == id);
      if (index <= 0) {
        serviceList.push({ orgId: id, orgName: name } as any);
      }
    }
    setTreeData(buildTreeData(serviceList, 'orgId', 'orgName', '', '', ''));
  };
  const convertRequestData = useCallback(async (param: { orgId: number }) => {
    const res = await getService(param);
    if (res?.data) {
      const {
        address,
        longitude,
        latitude,
        orgId: rawOrgId,
        parentId: id,
        parentName: name,
      } = res.data;
      const addressInfo: PositionSelectType = {
        address,
        point: {
          lng: longitude,
          lat: latitude,
        } as unknown,
      };
      set(res.data, 'addressInfo', addressInfo);
      setOrgId(rawOrgId);
      getTreeData(id, name);
    }
    return res;
  }, []);

  const convertUpdateData = (inputInfo: ServiceUpdateInfo): ServiceParam => {
    const params: ServiceParam = {
      ...inputInfo,
    };
    params.address = inputInfo.addressInfo.address ?? '';
    params.longitude = inputInfo.addressInfo?.point?.lng;
    params.latitude = inputInfo.addressInfo?.point?.lat;
    unset(params, 'addressInfo');
    return params;
  };

  useEffect(() => {
    if (props.visible && isCreate(props.operations)) {
      getServiceId()?.then(({ data }) => {
        setOrgId(data);
      });
    }
  }, [props.visible]);

  const getConfig = useCallback(() => Columns(orgId, treeData), [orgId, treeData]);

  return (
    <FormUpdate<ServiceUpdateInfo, ServiceParam>
      titleCreate={formatMessage({ id: 'common.newBuilt', defaultMessage: '新建' })}
      titleUpdate={formatMessage({ id: 'common.edit', defaultMessage: '编辑' })}
      columns={getConfig()}
      onFinishUpdate={(params) => {
        return updateService(convertUpdateData(params));
      }}
      initialValues={{ orgIcon: initialState?.currentUser?.systemInfo }}
      orgId={orgId}
      onFinishCreate={(params) => {
        return createService(convertUpdateData(params));
      }}
      request={convertRequestData}
      {...props}
    />
  );
});
export default Update;
