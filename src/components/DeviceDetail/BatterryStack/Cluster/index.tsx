/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:37:01
 * @LastEditTime: 2023-07-15 20:04:52
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\BatterryStack\Cluster\index.tsx
 */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Row, Col, Tree, Space, Skeleton, Tabs, TabsProps } from 'antd';
import { useRequest } from 'umi';
import { getClusterByStack, DeviceDataType, getChildEquipment } from '@/services/equipment';
import Detail, { DetailItem } from '@/components/Detail';
import Label from '@/components/DeviceInfo/Label';
import { isEmpty } from '@/utils';
import { runItems, statusItems } from './config';
import LineChart from '@/components/Chart/LineChart';
import { chartTypeEnum } from '@/components/Chart';
import moment from 'moment';
import styles from './index.less';
import Button from '@/components/CollectionModal/Button';
import { useSubscribe } from '@/hooks';
import { Slider } from 'bizcharts';

export type ClusterProps = {
  id: string;
  data?: DeviceDataType;
};

const legendMap = new Map([['voltage', '']]);

const Cluster: React.FC<ClusterProps> = (props) => {
  const { id, data: deviceData } = props;

  const [activeKey, setActiveKey] = useState('0');
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });
  const [selectOrg, setSelectOrg] = useState<DeviceDataType>({ deviceId: 0 as any, key: '0' });
  const [bmuMap, setBmuMap] = useState<Map<string, string>>();
  const realTimeData = useSubscribe(selectOrg?.deviceId || '', true);
  const bmuData = useSubscribe(bmuMap?.get?.('BMU-' + (activeKey * 1 + 1) || ''), true);

  const {
    data: clusterData,
    loading,
    run,
  } = useRequest(getClusterByStack, {
    manual: true,
    formatResult: ({ data }) => {
      const result = [
        { ...deviceData, deviceName: deviceData?.name, children: data || [], selectable: false },
      ];
      setSelectOrg(data[0]);
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
    result.push('温度13');
    return result;
  }, []);

  const chartData = useMemo(() => {
    const result = {
      voltage: allLabel.map((item) => {
        const num = item.replace('电芯', '').replace('温度', '');
        if (item.indexOf('电芯') > -1) {
          return {
            label: item,
            value: bmuData?.['Voltage' + num],
          };
        } else {
          return {
            label: item,
            value: bmuData?.['Temperature' + num],
          };
        }
      }),
    };
    return result;
  }, [bmuData, allLabel, activeKey]);

  const selectedKeys = useMemo<string[]>(() => {
    return isEmpty(selectOrg?.deviceId) ? [] : [selectOrg?.deviceId];
  }, [selectOrg]);

  const onSelect = useCallback(
    (_, { selected, node }: { selected: boolean; node: DeviceDataType }) => {
      if (selected) {
        setSelectOrg(node);
      }
    },
    [],
  );

  const onClick = useCallback((item: DetailItem) => {
    setCollectionInfo({
      title: item.label as any,
      collection: item.field,
    });
  }, []);

  const onTabChange = useCallback((key) => {
    setActiveKey(key);
  }, []);

  useEffect(() => {
    if (id) {
      run({ deviceId: id });
    }
  }, [id]);

  useEffect(() => {
    if (selectOrg?.deviceId) {
      getChildEquipment({ parentId: selectOrg?.deviceId }).then(({ data: childData }) => {
        setBmuMap(new Map(childData?.map?.((item) => [item.aliasSn || '', item.deviceId || ''])));
      });
    }
  }, [selectOrg]);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return Array.from({ length: 10 }).map((item, index) => {
      return {
        key: index + '',
        label: 'BMU' + (index + 1),
      };
    });
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
          <Label className="mb26" title={selectOrg?.deviceName} showLine={false} />
          <Detail items={runItems} data={selectOrg} extral={extral} />
          <Label title="状态信息" />
          <Detail items={statusItems} data={realTimeData} extral={extral} />
          <Label title="单体信息" />
          <Tabs className={styles.tab} items={tabItems} onChange={onTabChange} />
          <LineChart
            type={chartTypeEnum.Label}
            date={moment()}
            valueTitle="电压(V) 温度(℃)"
            legendMap={legendMap}
            labelKey="label"
            valueKey="value"
            data={chartData}
            allLabel={allLabel}
            showLine={false}
          >
            <Slider start={0} end={1} minLimit={0.2} />
          </LineChart>
        </div>
      </div>
    </>
  );
};

export default Cluster;
