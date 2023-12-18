/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:36:42
 * @LastEditTime: 2023-12-07 15:36:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\YTEnergyEms\Run\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRequest, useHistory } from 'umi';
import Label from '@/components/Detail/LineLabel';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import YTProTable from '@/components/YTProTable';
import { emsOperationItems } from './config';
import { DeviceDataType, getEmsAssociationDevice } from '@/services/equipment';
import { ProColumns } from '@ant-design/pro-components';
import { ProField } from '@ant-design/pro-components';
import { onlineStatus } from '@/utils/dict';
import Button from '@/components/CollectionModal/Button';
import useDeviceModel from '../../useDeviceModel';
import { useSubscribe } from '@/hooks';
import { MessageEventType } from '@/utils/connection';
import { formatMessage } from '@/utils';

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

  const associationDeviceIds = useMemo(() => {
    return associationData?.map?.((item) => item?.deviceId || '');
  }, [associationData]);

  const associationRealtimeData = useSubscribe(
    associationDeviceIds,
    true,
    MessageEventType.NETWORKSTSTUS,
  );

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
        title: formatMessage({
          id: 'siteMonitor.deviceCommunicationStatus',
          defaultMessage: '设备通信状态',
        }),
        dataIndex: 'connectStatus',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, { deviceId, connectStatus }) => {
          return (
            <ProField
              text={associationRealtimeData?.[deviceId ?? '']?.status ?? connectStatus}
              mode="read"
              valueEnum={onlineStatus}
            />
          );
        },
      },
      {
        title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
        dataIndex: 'productTypeName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }),
        dataIndex: 'model',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
        dataIndex: 'name',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, record) => {
          return <a onClick={() => onDeviceClick(record)}>{record.name}</a>;
        },
      },
      {
        title: formatMessage({ id: 'common.deviceSn', defaultMessage: '设备sn' }),
        dataIndex: 'sn',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
    ];
  }, [associationRealtimeData]);

  const extral = (
    <Button
      title={collectionInfo.title}
      deviceId={id}
      collection={collectionInfo.collection}
      model={modelMap?.[collectionInfo.collection]}
      onClick={onClick}
    />
  );

  const detailGroup = useMemo<GroupItem[]>(() => {
    return [
      {
        label: (
          <Detail.Label
            title={formatMessage({
              id: 'siteMonitor.operationalInformation',
              defaultMessage: '运行信息',
            })}
          />
        ),
        items: emsOperationItems,
      },
    ];
  }, []);

  return (
    <>
      <Detail.Group
        data={realTimeData}
        items={detailGroup}
        detailProps={{
          extral,
          colon: false,
          labelStyle: { width: 140 },
          valueStyle: { width: '40%' },
        }}
      />
      <Label
        title={formatMessage({
          id: 'siteMonitor.accessDeviceList',
          defaultMessage: '接入设备列表',
        })}
        className="mt16"
      />
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
