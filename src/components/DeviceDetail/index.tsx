/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-20 16:17:35
 * @LastEditTime: 2023-08-16 08:49:53
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
import LogTable from '@/components/LogTable';
import { getLogs, getDeviceInfo } from '@/services/equipment';
import styles from './index.less';
import { isEmpty } from '@/utils';
import {
  YTPVInverterOutlined,
  YTEnergyOutlined,
  YTEmsOutlined,
  YTBmsOutlined,
  YTAirOutlined,
  YTMeterOutlined,
  YTChargeOutlined,
  YTChargeStackOutlined,
  YTCabinetOutlined,
} from '@/components/YTIcons';
import { TreeNode } from './config';
import Configuration from './Configuration';

const deviceMap = new Map([
  [1, YTEmsOutlined],
  [2, YTBmsOutlined],
  [3, YTCabinetOutlined],
  [6, YTMeterOutlined],
  [7, YTAirOutlined],
  [11, YTPVInverterOutlined],
  [13, YTChargeOutlined],
  [14, YTChargeOutlined],
  [16, YTEnergyOutlined],
  [17, YTMeterOutlined],
  [18, YTMeterOutlined],
  [19, YTChargeStackOutlined],
  [20, YTChargeOutlined],
  [21, YTChargeOutlined],
  [22, YTChargeOutlined],
  [24, YTChargeOutlined],
  [25, YTChargeOutlined],
  [26, YTMeterOutlined],
  [28, YTPVInverterOutlined],
  [30, YTMeterOutlined],
  [31, YTMeterOutlined],
  [32, YTCabinetOutlined],
  [33, YTChargeStackOutlined],
]);

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
  const {
    data: childData,
    loading,
    run,
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

  useEffect(() => {
    if (id) {
      run({ parentId: id, maxDepth: 1 });
      runDevice({ deviceId: id }).then((data) => {
        setSelectOrg({ deviceId: id, key: id, productId, name: data?.name });
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
            <DeviceMonitor id={selectOrg?.deviceId || ''} productId={selectOrg?.productId || '0'} />
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
        children: <LogTable params={{ id: selectOrg?.deviceId || '' }} request={getLogs} />,
      },
      {
        label: '配置',
        key: '5',
        children: <Configuration deviceId={id} />,
      },
    ];
  }, [selectOrg, productId, id]);

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
          <Tabs className={styles.tabs} items={items} />
        </div>
      </div>
    </>
  );
};

export default DeviceDetail;
