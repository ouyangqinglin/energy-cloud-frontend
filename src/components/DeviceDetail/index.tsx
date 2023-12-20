/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-20 16:17:35
 * @LastEditTime: 2023-12-20 13:56:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Skeleton, Space, Tabs, TabsProps, Tree } from 'antd';
import { useRequest } from 'umi';
import { DeviceDataType, getWholeDeviceTree } from '@/services/equipment';
import Search from '@/pages/data-manage/search';
import Alarm from '@/components/Alarm';
import RunLog from '@/pages/site-monitor/RunLog';
import styles from './index.less';
import { formatMessage, isEmpty } from '@/utils';
import { TreeNode } from './config';
import Configuration from '@/components/Device/Configuration';
import DeviceRealTime from '@/components/DeviceRealTime';
import Overview from '@/components/DeviceInfo/Overview';
import { OnlineStatusEnum } from '@/utils/dictionary';
import { productTypeIconMap } from '@/utils/IconUtil';

const dealTreeData = (data: TreeNode[]) => {
  const result: TreeNode[] = [];
  data?.forEach?.((item) => {
    const node: TreeNode = {
      key: item?.id + '',
      deviceId: item?.id,
      name: item?.name,
      productId: item?.productId,
    };
    if (item?.productTypeId) {
      node.icon = productTypeIconMap.get(item?.productTypeId);
    }
    if (item.children && item.children.length) {
      node.children = dealTreeData(item.children as any);
    }
    result.push(node);
  });
  return result;
};

export type DeviceDetailProps = {
  id: string;
  productId: string;
};

const DeviceDetail: React.FC<DeviceDetailProps> = (props) => {
  const { id, productId } = props;

  const [selectOrg, setSelectOrg] = useState<DeviceDataType>({
    deviceId: parseInt(id) as any,
    key: id,
    productId,
  });
  const [deviceOverviewloading, setDeviceOverviewloading] = useState(false);
  const {
    data: treeData,
    loading,
    run: runGetDeviceTree,
  } = useRequest(getWholeDeviceTree, {
    manual: true,
    formatResult: (res) => {
      return dealTreeData([res.data] as any);
    },
  });

  const selectedKeys = useMemo<string[]>(() => {
    return isEmpty(selectOrg?.deviceId) ? [] : [selectOrg?.deviceId as string];
  }, [selectOrg]);

  const onSelect = useCallback(
    (_, { selected, node }: { selected: boolean; node: DeviceDataType }) => {
      if (selected) {
        setSelectOrg(node);
      }
    },
    [],
  );

  const onDeviceChange = useCallback((data) => {
    setSelectOrg({ ...data });
  }, []);

  const onEditSuccess = useCallback(() => {
    runGetDeviceTree({
      deviceId: id,
      component: 0,
      containTopParentDevice: 1,
    });
  }, [id]);

  useEffect(() => {
    runGetDeviceTree({
      deviceId: id,
      component: 0,
      containTopParentDevice: 1,
    });
  }, [id]);

  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        label: formatMessage({ id: 'siteMonitor.deviceDetails', defaultMessage: '设备详情' }),
        key: '1',
        children: (
          <>
            <div
              className={`px24 ${
                selectOrg?.status === OnlineStatusEnum.Offline ? 'device-offline' : ''
              }`}
            >
              <DeviceRealTime
                id={selectOrg?.deviceId || ''}
                productId={selectOrg?.productId || '0'}
                deviceData={selectOrg}
                loading={deviceOverviewloading}
              />
            </div>
          </>
        ),
      },
      {
        label: formatMessage({ id: 'common.historyData', defaultMessage: '历史数据' }),
        key: '2',
        children: <Search isDeviceChild deviceData={selectOrg} />,
      },
      {
        label: formatMessage({ id: 'common.warning', defaultMessage: '告警' }),
        key: '3',
        children: (
          <Alarm
            isStationChild={true}
            params={{ deviceId: selectOrg?.deviceId, deviceName: selectOrg?.name }}
          />
        ),
      },
      {
        label: formatMessage({ id: 'common.logs', defaultMessage: '日志' }),
        key: '4',
        children: <RunLog deviceId={selectOrg?.deviceId || ''} isDeviceChild />,
      },
      {
        label: formatMessage({ id: 'common.configured', defaultMessage: '配置' }),
        key: '5',
        children: (
          <Configuration
            productId={selectOrg?.productId || '0'}
            deviceId={selectOrg?.deviceId || ''}
            deviceData={selectOrg}
          />
        ),
      },
    ];
  }, [selectOrg, deviceOverviewloading]);

  return (
    <>
      <div
        className={`${styles.contain} ${
          treeData?.[0]?.children && treeData?.[0]?.children?.length ? styles.open : ''
        }`}
      >
        <div className={styles.tree}>
          {loading ? (
            <Space direction="vertical">
              <Skeleton.Input size="small" active />
              <Skeleton.Input size="small" active />
              <Skeleton.Input size="small" active />
            </Space>
          ) : (
            <Tree<TreeNode>
              treeData={treeData}
              defaultExpandAll={true}
              fieldNames={{
                title: 'name',
                key: 'deviceId',
                children: 'children',
              }}
              selectedKeys={selectedKeys}
              onSelect={onSelect}
              showIcon
            />
          )}
        </div>
        <div className={styles.content}>
          <div className="px24 pt24">
            <Overview
              deviceId={selectOrg?.deviceId || ''}
              onChange={onDeviceChange}
              onEditSuccess={onEditSuccess}
              setLoading={setDeviceOverviewloading}
            />
          </div>
          <Tabs className={styles.tabs} items={items} />
        </div>
      </div>
    </>
  );
};

export default DeviceDetail;
