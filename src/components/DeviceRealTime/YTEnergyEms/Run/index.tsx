/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:36:42
 * @LastEditTime: 2023-09-11 19:12:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Ems\Run\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRequest, useHistory } from 'umi';
import Label from '@/components/Detail/LineLabel';
import Detail, { DetailItem } from '@/components/Detail';
import YTProTable from '@/components/YTProTable';
import { controlItems, protectItems } from './config';
import { DeviceDataType, getEmsAssociationDevice } from '@/services/equipment';
import { ProColumns } from '@ant-design/pro-components';
import { ProField } from '@ant-design/pro-components';
import { onlineStatus } from '@/utils/dictionary';
import Button from '@/components/CollectionModal/Button';
import useDeviceModel from '../../useDeviceModel';

export type StackProps = {
  id: string;
  productId: string;
  realTimeData?: Record<string, any>;
};

const Stack: React.FC<StackProps> = (props) => {
  const { realTimeData, id, productId } = props;

  const { modelMap } = useDeviceModel({ productId });
  const history = useHistory();
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

  const onDeviceClick = useCallback((record) => {
    history.push({
      pathname: '/site-monitor/device-detail',
      search: `?id=${record.deviceId}&productId=${record.productId}`,
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
        title: '设备通信状态',
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
        title: '设备名称',
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, record) => {
          return <a onClick={() => onDeviceClick(record)}>{record.name}</a>;
        },
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
      model={modelMap?.[collectionInfo.collection]}
      onClick={onClick}
    />
  );

  return (
    <>
      <Detail.Label title="控制信息" className="mt16" />
      <Detail
        data={realTimeData}
        items={controlItems}
        extral={extral}
        colon={false}
        labelStyle={{ width: 140 }}
        valueStyle={{ width: '40%' }}
      />
      <Detail.Label title="保护信息" className="mt16" />
      <Detail
        data={realTimeData}
        items={protectItems}
        colon={false}
        labelStyle={{ width: 140 }}
        valueStyle={{ width: '40%' }}
      />
      <Label title="接入设备列表" className="mt16" />
      <YTProTable<DeviceDataType>
        loading={loading}
        search={false}
        options={false}
        columns={columns}
        toolBarRender={false}
        dataSource={associationData}
        scroll={{ y: 'auto' }}
      />
    </>
  );
};

export default Stack;
