/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-20 16:17:35
 * @LastEditTime: 2023-07-21 10:54:46
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
import { getLogs } from '@/services/equipment';
import styles from './index.less';
import { isEmpty } from '@/utils';

export type DeviceDetailProps = {
  id: string;
  productId: number;
};

const DeviceDetail: React.FC<DeviceDetailProps> = (props) => {
  const { id, productId } = props;

  const [deviceName, setDeviceName] = useState<string>('');
  const [selectOrg, setSelectOrg] = useState<DeviceDataType>({ deviceId: id, key: id });
  const {
    data: childData,
    loading,
    run,
  } = useRequest(getChildEquipment, {
    manual: true,
  });

  const selectedKeys = useMemo<string[]>(() => {
    return isEmpty(selectOrg?.deviceId) ? [] : [selectOrg?.deviceId];
  }, [selectOrg]);

  const treeData = useMemo(() => {
    const result = [{ deviceId: id, name: deviceName, children: childData || [], key: id }];
    return result;
  }, [id, deviceName, childData]);

  const onSelect = useCallback(
    (_, { selected, node }: { selected: boolean; node: DeviceDataType }) => {
      if (selected) {
        setSelectOrg(node);
      }
    },
    [],
  );

  const onChange = useCallback((value: DeviceDataType) => {
    setDeviceName(value.name || '');
  }, []);

  useEffect(() => {
    if (id) {
      run({ parentId: id, maxDepth: 1 });
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
              onChange={onChange}
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
  }, [selectOrg, productId, id, loading]);

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
            <Tree
              treeData={treeData}
              defaultExpandAll={true}
              fieldNames={{
                title: 'name',
                key: 'deviceId',
                children: 'children',
              }}
              selectedKeys={selectedKeys}
              onSelect={onSelect}
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
