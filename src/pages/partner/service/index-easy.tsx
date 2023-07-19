import { YTFormList } from '@/components/YTCrud';
import { useState } from 'react';
import { columns } from './config';
import { createService, deleteService, getService, getServiceList, updateService } from './service';
import { ServiceInfo } from './type';

export const Customer = () => {
  const [orgId, setOrgId] = useState<number>();
  const convertRequestData = async (param: { orgId: number }) => {
    const res = await getService(param);
    if (res) {
      const { orgId: rawOrgId } = res.data;
      setOrgId(rawOrgId);
    }
    return res;
  };

  // 创建时，获取orgId
  useEffect(() => {
    if (props.visible && isCreate(props.operations)) {
      getServiceId()?.then(({ data }) => {
        setOrgId(data);
      });
    }
  }, [props.visible]);

  const getConfig = useCallback(() => Columns(props.operations, orgId), [props.operations, orgId]);

  return (
    <YTFormList<ServiceInfo, ServiceInfo>
      formListField={{
        buttonText: '新增安装商',
        requestDelete(entity) {
          return deleteService({ orgId: entity?.orgId });
        },
        requestList: getServiceList,
        rowKey: 'orgId',
        columns: columns,
        modalDeleteText: '安装商',
      }}
      formUpdateField={{
        titleCreate: '新增安装商',
        titleUpdate: '编辑安装商',
        requestUpdate: updateService,
        requestCrate: createService,
        requestRead: getService,
      }}
    />
  );
};
