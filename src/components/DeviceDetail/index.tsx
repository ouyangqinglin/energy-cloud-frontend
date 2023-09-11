/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-20 16:17:35
 * @LastEditTime: 2023-09-11 17:59:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Empty, Skeleton, Space, Tabs, TabsProps, Tree } from 'antd';
import { useRequest } from 'umi';
import DeviceMonitor from '@/components/DeviceMonitor';
import { getChildEquipment, DeviceDataType } from '@/services/equipment';
import Search from '@/pages/data-manage/search';
import Alarm from '@/components/Alarm';
import RunLog from '@/pages/site-monitor/RunLog';
import { getLogs, getDeviceInfo } from '@/services/equipment';
import styles from './index.less';
import { isEmpty } from '@/utils';
import { TreeNode, deviceMap } from './config';
import Configuration from './Configuration';
import { DeviceTypeEnum } from '@/utils/dictionary';
import DeviceRealTime from '@/components/DeviceRealTime';
import Overview from '@/components/DeviceInfo/Overview';

const dealTreeData = (data: TreeNode[]) => {
  const result: TreeNode[] = [];
  data?.forEach?.((item) => {
    const node: TreeNode = {
      key: item?.deviceId + '',
      deviceId: item?.deviceId,
      name: item?.name,
      productId: item?.productId,
      icon: deviceMap.get(item.productId as any) || '',
    };
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

  const [selectOrg, setSelectOrg] = useState<DeviceDataType>({ deviceId: id, key: id, productId });
  const [deviceOverviewloading, setDeviceOverviewloading] = useState(false);
  const {
    data: childData,
    loading,
    run: runGetChildDevice,
  } = useRequest(getChildEquipment, {
    manual: true,
  });
  const {
    data: deviceData,
    loading: loadingDevice,
    run: runDevice,
  } = useRequest(getDeviceInfo, {
    manual: true,
  });

  const selectedKeys = useMemo<string[]>(() => {
    return isEmpty(selectOrg?.deviceId) ? [] : [selectOrg?.deviceId as string];
  }, [selectOrg]);

  const treeData = useMemo(() => {
    const result = [
      {
        deviceId: id,
        name: deviceData?.name,
        productId: deviceData?.productId,
        children: childData || [],
        key: id,
      },
    ];
    return dealTreeData(result as any);
  }, [id, deviceData, childData]);

  const onSelect = useCallback(
    (_, { selected, node }: { selected: boolean; node: DeviceDataType }) => {
      if (selected) {
        setSelectOrg(node);
      }
    },
    [],
  );

  const onDeviceChange = useCallback(
    (data) => {
      if ((productId as any) != DeviceTypeEnum.BatteryStack) {
        runGetChildDevice({ parentId: id, maxDepth: 1 });
      }
      runDevice({ deviceId: id });
      setSelectOrg({ ...(data || {}) });
    },
    [id, productId],
  );

  useEffect(() => {
    if (id) {
      if ((productId as any) != DeviceTypeEnum.BatteryStack) {
        runGetChildDevice({ parentId: id, maxDepth: 1 });
      }
      runDevice({ deviceId: id }).then((data) => {
        setSelectOrg({ deviceId: id, key: id, productId, name: data?.name, sn: data?.sn });
      });
    }
  }, [id, productId]);

  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        label: '设备详情',
        key: '1',
        children: (
          <>
            <div className="px24">
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
        label: '历史数据',
        key: '2',
        children: <Search isDeviceChild deviceData={selectOrg} />,
      },
      {
        label: '告警',
        key: '3',
        children: <Alarm isStationChild={true} params={{ deviceId: selectOrg?.deviceId }} />,
      },
      {
        label: '日志',
        key: '4',
        children: <RunLog deviceId={selectOrg?.deviceId || ''} isDeviceChild />,
      },
      {
        label: '配置',
        key: '5',
        children: <Configuration deviceId={selectOrg?.deviceId || ''} />,
      },
    ];
  }, [selectOrg, productId, id, deviceOverviewloading]);

  return (
    <>
      <div
        className={`${styles.contain} ${
          treeData?.[0]?.children && treeData?.[0]?.children?.length ? styles.open : ''
        }`}
      >
        <div className={styles.tree}>
          {loading || loadingDevice ? (
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
              deviceId={id}
              onChange={onDeviceChange}
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
