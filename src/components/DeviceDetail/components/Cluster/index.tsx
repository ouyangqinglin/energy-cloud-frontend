/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:37:01
 * @LastEditTime: 2023-07-14 11:31:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\components\Cluster\index.tsx
 */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Row, Col, Tree, Space, Skeleton, Tabs, TabsProps } from 'antd';
import { useRequest } from 'umi';
import { getClusterByStack } from '@/services/equipment';
import { DeviceInfoType } from '@/components/DeviceInfo/type';
import Detail from '@/components/Detail';
import Label from '@/components/DeviceInfo/Label';
import { isEmpty } from '@/utils';
import { runItems, statusItems } from './config';
import LineChart from '@/components/Chart/LineChart';
import { chartTypeEnum } from '@/components/Chart';
import moment from 'moment';
import styles from './index.less';

export type ClusterProps = {
  data?: DeviceInfoType;
  realTimeData?: Record<string, any>;
};

const legendMap = new Map([
  ['voltage', '电压(V)'],
  ['temp', '温度(℃)'],
]);

const Cluster: React.FC<ClusterProps> = (props) => {
  const { data: deviceData, realTimeData } = props;

  const [chartData, setChartData] = useState({
    voltage: [],
    temp: [],
  });
  const [selectOrg, setSelectOrg] = useState<DeviceInfoType>({ deviceId: 0, key: '0' });
  const {
    data: clusterData,
    loading,
    run,
  } = useRequest(getClusterByStack, {
    manual: true,
    formatResult: ({ data }) => {
      const result = [{ ...deviceData, deviceName: deviceData?.name, children: data || [] }];
      setSelectOrg({ deviceId: data?.[0]?.deviceId, deviceName: deviceData?.name });
      return result;
    },
  });

  const allLabel = useMemo(() => {
    const result: string[] = [];
    Array.from({ length: 24 }).forEach((item, index) => {
      const num = index + 1;
      result.push('电芯' + num);
      if (num % 2 === 0) {
        result.push('温度' + num / 2);
      }
    });
    return result;
  }, []);

  const selectedKeys = useMemo<string[]>(() => {
    return isEmpty(selectOrg?.deviceId) ? [] : [selectOrg?.deviceId + ''];
  }, [selectOrg]);

  const onSelect = useCallback(
    (_, { selected, node }: { selected: boolean; node: DeviceInfoType }) => {
      if (selected) {
        setSelectOrg(node);
      }
    },
    [],
  );

  useEffect(() => {
    if (deviceData && deviceData?.deviceId) {
      run({ deviceId: deviceData?.deviceId });
    }
  }, [deviceData]);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return Array.from({ length: 10 }).map((item, index) => {
      return {
        key: index + '',
        label: 'BMU' + (index + 1),
      };
    });
  }, []);

  return (
    <>
      <div className={styles.contain}>
        <div className={styles.tree}>
          {loading ? (
            <Space direction="vertical">
              <Skeleton.Input size="small" active />
              <Skeleton.Input size="small" active />
              <Skeleton.Input size="small" active />
            </Space>
          ) : (
            <Tree
              treeData={clusterData}
              defaultExpandAll={true}
              fieldNames={{
                title: 'deviceName',
                key: 'deviceId',
                children: 'children',
              }}
              selectedKeys={selectedKeys}
              onSelect={onSelect}
            />
          )}
        </div>
        <div className={styles.content}>
          <Label title={deviceData?.deviceName} showLine={false} />
          <Detail items={runItems} data={realTimeData} />
          <Label title="状态信息" showLine={false} />
          <Detail items={statusItems} data={realTimeData} />
          <Label title="单体信息" showLine={false} />
          <Tabs items={tabItems} />
          <LineChart
            type={chartTypeEnum.Label}
            date={moment()}
            valueTitle="电压(V) 温度(℃)"
            legendMap={legendMap}
            labelKey="eventTs"
            valueKey="doubleVal"
            data={chartData}
            allLabel={allLabel}
          />
        </div>
      </div>
    </>
  );
};

export default Cluster;
