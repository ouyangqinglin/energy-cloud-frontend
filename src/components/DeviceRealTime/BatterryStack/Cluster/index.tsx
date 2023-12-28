/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 23:37:01
 * @LastEditTime: 2023-12-28 15:44:52
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
import { chartOptions, getFieldByLabel, runItems, statusItems } from './config';
import Chart from '@/components/Chart';
import { defaultLineOption } from '@/components/Chart/config';
import styles from './index.less';
import Button from '@/components/CollectionModal/Button';
import { useDeviceModel, useSubscribe } from '@/hooks';
import { merge } from 'lodash';
import { MessageEventType } from '@/utils/connection';
import { DeviceTypeEnum } from '@/utils/dictionary';
import CollectionModal from '@/components/CollectionModal';
import { useBoolean } from 'ahooks';

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
  const [bmuProductId, setBmuProductId] = useState<DeviceTypeEnum>();
  const [bmuMap, setBmuMap] = useState<Map<string, string>>();
  const realTimeData = useSubscribe(selectOrg?.deviceId || '', true);
  const [openBmuChart, { setFalse, setTrue }] = useBoolean(false);
  const networkData = useSubscribe(selectOrg?.deviceId || '', true, MessageEventType.NETWORKSTSTUS);
  const bmuData = useSubscribe(
    bmuMap?.get?.('BMU-' + (Number(activeKey) * 1 + 1) || '') || '',
    true,
  );
  const { modelMap } = useDeviceModel({ productId: bmuProductId });

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
    let tempNum = 2;
    Array.from({
      length: deviceData?.productId == DeviceTypeEnum.LiquidEnergyBatteryStack ? 48 : 24,
    }).forEach((item, index) => {
      const num = index + 1;
      result.push(formatMessage({ id: 'siteMonitor.cell', defaultMessage: '电芯' }) + num);
      if (deviceData?.productId == DeviceTypeEnum.LiquidEnergyBatteryStack) {
        if (num % 2 === 1) {
          result.push(
            formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + tempNum,
          );
          tempNum++;
        }
        if (num % 12 === 0) {
          result.push(
            formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + tempNum,
          );
          tempNum++;
        }
      } else {
        if (num % 2 === 0) {
          result.push(
            formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + num / 2,
          );
        }
      }
    });
    if (deviceData?.productId == DeviceTypeEnum.LiquidEnergyBatteryStack) {
      result.unshift(
        formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + '1',
      );
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
      const field = getFieldByLabel(item);
      let value: any = '',
        resultValue;
      if (item.indexOf(formatMessage({ id: 'siteMonitor.cell', defaultMessage: '电芯' })) > -1) {
        value = bmuData?.[field] || '';
      } else {
        value = bmuData?.[field] || '';
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
    merge(result, defaultLineOption, chartOptions, {
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

  const onChartClick = useCallback(
    (params) => {
      let name = '';
      if (params?.componentType == 'xAxis') {
        name = params?.value;
      } else if (params?.componentType == 'series') {
        name = params?.name;
      }
      const field = getFieldByLabel(name);
      setCollectionInfo({
        title: `BMU${Number(activeKey) * 1 + 1}-${name}`,
        collection: field,
      });
      setTrue();
    },
    [activeKey],
  );

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
        setBmuProductId(childData?.[0]?.productId);
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
          <Chart
            option={chartOption}
            style={{ height: 300 }}
            onEvents={{
              click: onChartClick,
            }}
          />
        </div>
      </div>
      <CollectionModal
        title={collectionInfo.title}
        open={openBmuChart}
        onCancel={setFalse}
        deviceId={bmuMap?.get?.('BMU-' + (Number(activeKey) * 1 + 1) || '')}
        collection={collectionInfo.collection}
        model={modelMap?.[collectionInfo.collection]}
      />
    </>
  );
};

export default Cluster;
