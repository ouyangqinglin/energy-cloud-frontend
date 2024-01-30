/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-29 10:50:47
 * @LastEditTime: 2024-01-29 17:01:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\Model\Part.tsx
 */

import React, { useCallback, useMemo } from 'react';
import { ConfigType, ProductIdMapType } from '../type';
import { DeviceTypeEnum } from '@/utils/dictionary';
import { EnergySourceEnum } from '../..';
import { useDeviceModel, useSubscribe } from '@/hooks';
import { message } from 'antd';
import { useHistory } from 'umi';
import { formatMessage, formatModelValue } from '@/utils';
import { merge } from 'lodash';
import styles from '../../index.less';
import Detail from '@/components/Detail';

type PartType = {
  config: ConfigType;
  deviceId?: string;
  productId?: DeviceTypeEnum;
  productIdMap?: ProductIdMapType;
  source?: EnergySourceEnum;
};

const Part: React.FC<PartType> = (props) => {
  const { config, deviceId, productId, productIdMap, source } = props;

  const dataDeviceIds = useMemo(() => {
    const result: string[] = [];
    if (deviceId) {
      result.push(deviceId);
    }
    config?.dataProductTypeIds?.forEach?.((item) => {
      const id = productIdMap?.[item]?.deviceId;
      if (id) {
        result.push(id);
      }
    });
    return result;
  }, [deviceId, config, productIdMap]);

  const history = useHistory();
  const realTimeData = useSubscribe(dataDeviceIds, true);
  const { modelMap: modelMap } = useDeviceModel({
    productId,
    isGroup: true,
  });

  const onMoreClick = useCallback(() => {
    if (deviceId) {
      history.push({
        pathname:
          source === EnergySourceEnum.SiteMonitor
            ? '/site-monitor/device-detail'
            : '/equipment/device-detail',
        search: `?id=${deviceId}`,
      });
    } else {
      message.error(formatMessage({ id: 'common.noData', defaultMessage: '暂无数据' }));
    }
  }, [deviceId, source]);

  const mergedConfig = useMemo(() => {
    const result = merge({}, config || {});
    result?.data?.forEach?.((item) => {
      item.format =
        item.customFormat ||
        ((value) => formatModelValue(value, { ...modelMap }?.[item?.field || '']));
    });
    return result;
  }, [config, modelMap]);

  return (
    <>
      <div
        key={mergedConfig.label}
        className={styles.unit}
        style={{
          backgroundImage: `url(${mergedConfig.icon})`,
          ...mergedConfig.position,
        }}
      >
        <img className={styles.line} src={mergedConfig.line} style={mergedConfig.linePosition} />
        {mergedConfig.showLabel === false ? (
          <></>
        ) : (
          <label className={styles.unitTitle}>{mergedConfig.label}</label>
        )}
        <Detail
          className={styles.detail}
          items={mergedConfig.data}
          data={realTimeData}
          column={1}
        />
        {mergedConfig.showLabel === false ? (
          <></>
        ) : (
          <span className={`cl-primary cursor ${styles.field}`} onClick={onMoreClick}>
            {formatMessage({ id: 'common.more', defaultMessage: '更多' })}
            {'>'}
          </span>
        )}
      </div>
    </>
  );
};

export default Part;
