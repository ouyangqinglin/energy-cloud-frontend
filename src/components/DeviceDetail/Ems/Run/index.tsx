/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:36:42
 * @LastEditTime: 2023-07-15 11:31:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Ems\Run\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRequest } from 'umi';
import Label from '@/components/DeviceInfo/Label';
import Detail, { DetailItem } from '@/components/Detail';
import YTProTable from '@/components/YTProTable';
import { controlItems } from './config';
import { DeviceDataType, getEmsAssociationDevice } from '@/services/equipment';
import { ProColumns } from '@ant-design/pro-table';
import { ProField } from '@ant-design/pro-components';
import { onlineStatus } from '@/utils/dictionary';
import Button from '@/components/CollectionModal/Button';

export type StackProps = {
  id: string;
  realTimeData?: Record<string, any>;
};

const Stack: React.FC<StackProps> = (props) => {
  const { realTimeData, id } = props;

  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });
  const {
    data: associationData,
    run,
    loading,
  } = useRequest(getEmsAssociationDevice, {
    manual: true,
  });

  const onClick = useCallback((item: DetailItem) => {
    setCollectionInfo({
      title: item.label as any,
      collection: item.field,
    });
  }, []);

  useEffect(() => {
    if (id) {
      run({ deviceId: id });
    }
  }, [id]);

  const columns = useMemo<ProColumns<DeviceDataType>[]>(() => {
    return [
      {
        title: '设备状态',
        dataIndex: 'connectStatus',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, { connectStatus }) => {
          return <ProField text={connectStatus} mode="read" valueEnum={onlineStatus} />;
        },
      },
      {
        title: '产品类型',
        dataIndex: 'productTypeName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '产品型号',
        dataIndex: 'model',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: '软件版本号',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: 'SN号',
        dataIndex: 'sn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
    ];
  }, []);

  const extral = (
    <Button
      title={collectionInfo.title}
      deviceId={id}
      collection={collectionInfo.collection}
      onClick={onClick}
    />
  );

  return (
    <>
      <Label title="控制信息" />
      <Detail items={controlItems} data={realTimeData} extral={extral} />
      <Label title="接入设备列表" className="mt16" />
      <YTProTable<DeviceDataType>
        loading={loading}
        search={false}
        options={false}
        columns={columns}
        toolBarRender={false}
        dataSource={associationData}
        scroll={{ y: 200 }}
      />
    </>
  );
};

export default Stack;
