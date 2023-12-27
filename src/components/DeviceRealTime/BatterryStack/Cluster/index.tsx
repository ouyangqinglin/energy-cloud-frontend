/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:37:01
 * @LastEditTime: 2023-12-27 19:46:10
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\BatterryStack\Cluster\index.tsx
 */
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Tree, Space, Skeleton, Tabs, TabsProps } from 'antd';
import { useRequest } from 'umi';
import { getClusterByStack, DeviceDataType, getChildEquipment } from '@/services/equipment';
import Detail, { DetailItem } from '@/components/Detail';
import Label from '@/components/Detail/LineLabel';
import { formatMessage, isEmpty } from '@/utils';
import { runItems, statusItems } from './config';
import Chart from '@/components/Chart';
import { defaultLineOption } from '@/components/Chart/config';
import styles from './index.less';
import Button from '@/components/CollectionModal/Button';
import { useSubscribe } from '@/hooks';
import { merge } from 'lodash';
import { MessageEventType } from '@/utils/connection';
import { DeviceTypeEnum } from '@/utils/dictionary';

export type ClusterProps = {
  deviceData?: DeviceDataType;
};

const Cluster: React.FC<ClusterProps> = (props) => {
  const { deviceData } = props;

  const [activeKey, setActiveKey] = useState('0');
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });
  const [selectOrg, setSelectOrg] = useState<DeviceDataType>({ deviceId: 0 as any, key: '0' });
  const [bmuMap, setBmuMap] = useState<Map<string, string>>();
  const realTimeData = useSubscribe(selectOrg?.deviceId || '', true);
  const networkData = useSubscribe(selectOrg?.deviceId || '', true, MessageEventType.NETWORKSTSTUS);
  const bmuData = useSubscribe(
    bmuMap?.get?.('BMU-' + (Number(activeKey) * 1 + 1) || '') || '',
    true,
  );

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
    Array.from({
      length: deviceData?.productId == DeviceTypeEnum.LiquidEnergyBatteryStack ? 48 : 24,
    }).forEach((item, index) => {
      const num = index + 1;
      result.push(formatMessage({ id: 'siteMonitor.cell', defaultMessage: '电芯' }) + num);
      if (num % 2 === 0) {
        result.push(
          formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + num / 2,
        );
      }
    });
    if (deviceData?.productId == DeviceTypeEnum.LiquidEnergyBatteryStack) {
      result.push(formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + '25');
      result.push(formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + '26');
      result.push(formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + '27');
      result.push(formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + '28');
      result.push(formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + '29');
    } else {
      result.push(formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + '13');
    }
    return result;
  }, [deviceData]);

  const chartOption = useMemo(() => {
    const source = [
      [
        'product',
        formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' }),
        formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }),
      ],
    ];
    allLabel.forEach((item) => {
      const num = item
        .replace(formatMessage({ id: 'siteMonitor.cell', defaultMessage: '电芯' }), '')
        .replace(formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }), '');
      let value: any = '',
        resultValue;
      if (item.indexOf(formatMessage({ id: 'siteMonitor.cell', defaultMessage: '电芯' })) > -1) {
        value = bmuData?.['Voltage' + num] || '';
      } else {
        value = bmuData?.['Temperature' + num] || '';
      }
      resultValue = value;
      if (resultValue) {
        resultValue = resultValue * 1;
        if (isNaN(resultValue)) {
          resultValue = value;
        }
      }
      source.push([
        item,
        ...(item.indexOf(formatMessage({ id: 'siteMonitor.cell', defaultMessage: '电芯' })) > -1
          ? [resultValue, '']
          : ['', resultValue]),
      ]);
    });
    const result = {};
    merge(result, defaultLineOption, {
      grid: {
        bottom: 50,
      },
      legend: {
        icon: 'rect',
      },
      tooltip: {
        formatter: (params: any) => {
          const { value, name } = (params || {})[0];
          return name + '：' + (value[1] === '' ? value[2] + '℃' : value[1] + 'V');
        },
      },
      yAxis: {
        name:
          formatMessage({ id: 'siteMonitor.cell', defaultMessage: '电芯' }) +
          '(V)\n\n' +
          formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) +
          '(℃)',
      },
      series: [
        {
          type: 'bar',
          barMaxWidth: 10,
          stack: 'Total',
          itemStyle: {
            color: 'rgba(0, 125, 255, 1)',
          },
        },
        {
          type: 'bar',
          barMaxWidth: 10,
          stack: 'Total',
          itemStyle: {
            color: 'rgba(61, 213, 152, 1)',
          },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
        },
        {
          start: 0,
          end: 100,
          height: 15,
        },
      ],
      dataset: {
        source,
      },
    });
    return result;
  }, [bmuData, allLabel, activeKey]);

  const selectedKeys = useMemo<string[]>(() => {
    return isEmpty(selectOrg?.deviceId) ? [] : [selectOrg?.deviceId ?? ''];
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
    if (item.field) {
      setCollectionInfo({
        title: item.label as any,
        collection: item.field,
      });
    }
  }, []);

  const onTabChange = useCallback((key) => {
    setActiveKey(key);
  }, []);

  useEffect(() => {
    if (deviceData?.deviceId) {
      run({ deviceId: deviceData?.deviceId });
    }
  }, [deviceData]);

  useEffect(() => {
    if (selectOrg?.deviceId) {
      getChildEquipment({ parentId: selectOrg?.deviceId }).then(({ data: childData }) => {
        setBmuMap(new Map(childData?.map?.((item) => [item.aliasSn || '', item.deviceId || ''])));
      });
    }
  }, [selectOrg]);

  const tabItems = useMemo<TabsProps['items']>(() => {
    return Array.from({
      length: deviceData?.productId == DeviceTypeEnum.LiquidEnergyBatteryStack ? 5 : 10,
    }).map((item, index) => {
      return {
        key: index + '',
        label: 'BMU' + (index + 1),
      };
    });
  }, [deviceData]);

  const extral = (
    <Button
      title={collectionInfo.title}
      deviceId={deviceData?.deviceId}
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
          <Detail
            items={runItems}
            data={{ ...selectOrg, ...networkData }}
            colon={false}
            labelStyle={{ width: 170 }}
          />
          {deviceData?.productId != DeviceTypeEnum.LiquidEnergyBatteryStack ? (
            <>
              <Label
                title={formatMessage({
                  id: 'siteMonitor.statusInformation',
                  defaultMessage: '状态信息',
                })}
                className="mt16"
              />
              <Detail
                items={statusItems}
                data={realTimeData}
                extral={extral}
                colon={false}
                labelStyle={{ width: 170 }}
                valueStyle={{ width: '40%' }}
              />
            </>
          ) : (
            <></>
          )}
          <Label
            title={formatMessage({ id: 'siteMonitor.monomerInfo', defaultMessage: '单体信息' })}
            className="mt16"
          />
          <Tabs className={styles.tab} items={tabItems} onChange={onTabChange} />
          <Chart option={chartOption} style={{ height: 300 }} />
        </div>
      </div>
    </>
  );
};

export default Cluster;
