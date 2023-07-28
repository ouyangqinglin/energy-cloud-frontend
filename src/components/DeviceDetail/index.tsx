/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-20 16:17:35
 * @LastEditTime: 2023-07-28 11:12:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Empty, Skeleton, Space, Tabs, TabsProps, Tree } from 'antd';
import { useRequest } from 'umi';
import DeviceMonitor from '@/components/DeviceMonitor';
import { getChildEquipment, DeviceDataType } from '@/services/equipment';
import HistoryData from '@/components/DeviceMonitor/HistoryData';
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
  data?.forEach?.((item) => {
    item.icon = deviceMap.get(item.productId as number) || null;
    if (item.children && item.children.length) {
      dealTreeData(item.children);
    }
  });
};

export type DeviceDetailProps = {
  id: string;
  productId: number;
};

const DeviceDetail: React.FC<DeviceDetailProps> = (props) => {
  const { id, productId } = props;

  const [selectOrg, setSelectOrg] = useState<DeviceDataType>({ deviceId: id, key: id });
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
    return isEmpty(selectOrg?.deviceId) ? [] : [selectOrg?.deviceId];
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
    dealTreeData(result);
    return result;
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
      runDevice({ deviceId: id });
    }
  }, [id]);

  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        label: '设备详情',
        key: '1',
        children: (
          <>
            <DeviceMonitor
              id={selectOrg?.deviceId || ''}
              productId={selectOrg?.productId || productId}
            />
          </>
        ),
      },
      {
        label: '历史数据',
        key: '2',
        children: <HistoryData />,
      },
      {
        label: '告警',
        key: '3',
        children: <Alarm isStationChild={true} params={{ deviceId: id }} />,
      },
      {
        label: '日志',
        key: '4',
        children: <LogTable params={{ id }} request={getLogs} />,
      },
      {
        label: '配置',
        key: '5',
        children: <Empty />,
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
