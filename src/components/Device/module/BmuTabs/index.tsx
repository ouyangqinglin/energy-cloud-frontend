/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-06 15:21:47
 * @LastEditTime: 2024-06-18 17:37:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\BmuTabs\index.tsx
 */

import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Chart from '@/components/Chart';
import Detail from '@/components/Detail';
import { formatMessage, isEmpty } from '@/utils';
import { Tabs, TabsProps } from 'antd';
import styles from './index.less';
import CollectionModal from '@/components/CollectionModal';
import DeviceContext from '@/components/Device/Context/DeviceContext';
import { DeviceProductTypeEnum, DeviceTypeEnum } from '@/utils/dictionary';
import { useDeviceModel, useSubscribe } from '@/hooks';
import { getChildEquipment } from '@/services/equipment';
import { chartOptions, getFieldByLabel, labelMap } from './helper';
import { merge } from 'lodash';
import { defaultLineOption } from '@/components/Chart/config';
import { useBoolean } from 'ahooks';

type BmuTabsType = {
  isStackChild?: boolean;
  clusterDeviceId?: string;
};

const LiquidEnergyBatteryProductIds = [
  DeviceTypeEnum.LiquidEnergyBatteryStack,
  DeviceTypeEnum.Liquid2EnergyBatteryCluster,
  DeviceTypeEnum.LiquidEnergy232BatteryPack,
  DeviceTypeEnum.LiquidEnergy232ABatteryPack,
  DeviceTypeEnum.Liquid2Battery16,
];

const BmuTabs: React.FC<BmuTabsType> = memo((props) => {
  const { isStackChild = false, clusterDeviceId } = props;

  const { data: deviceData } = useContext(DeviceContext);
  const [bmuMap, setBmuMap] = useState<Map<string, string>>();
  const [bmuProductId, setBmuProductId] = useState<DeviceTypeEnum>();
  const [activeKey, setActiveKey] = useState('0');
  const [openBmuChart, { setFalse, setTrue }] = useBoolean(false);
  const { modelMap } = useDeviceModel({ productId: bmuProductId });
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });
  const bmuData = useSubscribe(
    bmuMap?.get?.('BMU-' + (Number(activeKey) * 1 + 1) || '') || '',
    true,
  );

  const isLiquid = useMemo(() => {
    return deviceData?.productId && LiquidEnergyBatteryProductIds.includes(deviceData?.productId);
  }, [deviceData]);

  const isPvEnergy = useMemo(() => {
    return deviceData?.productId == DeviceTypeEnum.PvEnergyBms;
  }, [deviceData]);

  const isWindPvWood = useMemo(() => {
    return deviceData?.productId == DeviceTypeEnum.FGCCEnergyBatteryCluster;
  }, [deviceData]);

  const onTabChange = useCallback((key) => {
    setActiveKey(key);
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

  const allLabel = useMemo(() => {
    const result: string[] = labelMap.get(deviceData?.productId) || [];
    if (result.length) {
      return result;
    }
    let tempNum = 2;
    Array.from({ length: isLiquid ? 48 : 24 }).forEach((_, index) => {
      const num = index + 1;
      result.push(formatMessage({ id: 'siteMonitor.cell', defaultMessage: '电芯' }) + num);
      if (isLiquid) {
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
    if (isLiquid) {
      result.unshift(
        formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + '1',
      );
    } else {
      if (
        deviceData?.productId != DeviceTypeEnum.SmallEnergyBatteryCluster &&
        deviceData?.productId != DeviceTypeEnum.PvEnergyBms
      ) {
        result.push(
          formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + '13',
        );
      }
    }
    return result;
  }, [isLiquid, deviceData?.productId]);

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
        value = bmuData?.[field] ?? '';
      } else {
        value = bmuData?.[field] ?? '';
      }
      resultValue = value;
      if (!isEmpty(resultValue)) {
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
    const result = merge({}, defaultLineOption, chartOptions, {
      dataset: {
        source,
      },
    });
    if (
      deviceData?.productId &&
      (deviceData?.productId as any) >= DeviceTypeEnum.Wind2BatteryStack
    ) {
      result.yAxis[0].name =
        formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' }) + '(mV)';
      result.tooltip.formatter = (params: any) => {
        const { value, name } = (params || {})[0];
        return (
          name +
          '：' +
          (value[1] === '' ? (value[2] === '' ? '' : value[2] + '℃') : value[1] + 'mV')
        );
      };
    }
    return result;
  }, [bmuData, deviceData, allLabel, activeKey]);

  const tabItems = useMemo<TabsProps['items']>(() => {
    let bmuTabNum = 10;
    if (isLiquid) {
      bmuTabNum = 5;
    } else if (isPvEnergy) {
      bmuTabNum = 9;
    } else if (isWindPvWood) {
      bmuTabNum = 7;
    }
    return Array.from({
      length: bmuTabNum,
    }).map((_, index) => {
      return {
        key: index + '',
        label: 'BMU' + (index + 1),
      };
    });
  }, [isLiquid, isPvEnergy]);

  useEffect(() => {
    if (clusterDeviceId || deviceData?.deviceId) {
      getChildEquipment({ parentId: isStackChild ? clusterDeviceId : deviceData?.deviceId }).then(
        ({ data: childData }) => {
          setBmuMap(new Map(childData?.map?.((item) => [item.aliasSn || '', item.deviceId || ''])));
          setBmuProductId(childData?.[0]?.productId);
        },
      );
    }
  }, [deviceData, clusterDeviceId]);

  return (
    <>
      <Detail.Label
        title={
          isStackChild
            ? formatMessage({ id: 'siteMonitor.monomerInfo', defaultMessage: '单体信息' })
            : formatMessage({
                id: 'device.batteryModuleIndividualInformation',
                defaultMessage: '电池模块单体信息',
              })
        }
        className="mt16"
      />
      <Tabs className={styles.tab} items={tabItems} onChange={onTabChange} />
      <Chart
        className="mb16"
        option={chartOption}
        style={{ height: 300 }}
        onEvents={{
          click: onChartClick,
        }}
      />
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
});

export default BmuTabs;
