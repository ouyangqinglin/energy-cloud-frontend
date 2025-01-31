/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-04-24 13:41:28
 * @LastEditTime: 2024-04-24 13:41:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Overview\EnergyFlow\RealTimeData\index copy.tsx
 */

import React, { useEffect, useState } from 'react';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { useToggle } from 'ahooks';
import { Button, Col, Row, Statistic } from 'antd';
import classNames from 'classnames';
import { SiteTypeEnum } from '@/utils/dict';
import { isNil } from 'lodash';
import { useRequest } from 'umi';
import TimeButtonGroup from '../../components/TimeButtonGroup';
import { chartTypeEnum } from '@/components/Chart/config';

import { getPVRevenue } from '../service';
import styles from './index.less';
import Detail from '@/components/Detail';
import { formatMessage } from '@/utils';

const Income = ({ siteId, siteType }: { siteId?: number; siteType: string }) => {
  const { data, run } = useRequest(getPVRevenue, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });
  const [timeType, setTimeType] = useState(chartTypeEnum.Day);

  useEffect(() => {
    if (!isNil(siteId)) {
      run(siteId, timeType);
    }
  }, [run, siteId, timeType]);

  const [show, { toggle }] = useToggle(true);

  const columns = [
    {
      label: formatMessage({ id: 'device.totalRevenue', defaultMessage: '总收益' }),
      unit: formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' }),
      value: data?.totalGains ?? '--',
      show: [
        String(SiteTypeEnum.PV_ES_CS),
        String(SiteTypeEnum.PV_ES),
        String(SiteTypeEnum.ES_CS),
        String(SiteTypeEnum.PV_CS),
        '',
      ].includes(siteType),
    },
    {
      label: formatMessage({ id: 'device.pvRevenue', defaultMessage: '光伏收益' }),
      unit: formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' }),
      value: data?.photovoltaicGains ?? '--',
      show: [
        String(SiteTypeEnum.PV_ES_CS),
        String(SiteTypeEnum.PV_ES),
        String(SiteTypeEnum.PV_CS),
        String(SiteTypeEnum.PV),
        '',
      ].includes(siteType),
    },
    {
      label: formatMessage({ id: 'device.storageRevenue', defaultMessage: '储能收益' }),
      unit: formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' }),
      value: data?.essGains ?? '--',
      show: [
        String(SiteTypeEnum.PV_ES_CS),
        String(SiteTypeEnum.PV_ES),
        String(SiteTypeEnum.ES_CS),
        String(SiteTypeEnum.ES),
        '',
      ].includes(siteType),
    },
    {
      label: formatMessage({ id: 'device.storageCharge', defaultMessage: '储能充电费用' }),
      unit: formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' }),
      value: data?.storageCharge ?? '--',
      show: ['2', String(SiteTypeEnum.ES_CS)].includes(siteType),
    },
    {
      label: formatMessage({ id: 'device.storageDischargeIncome', defaultMessage: '储能放电收入' }),
      unit: formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' }),
      value: data?.storageDischarge ?? '--',
      show: ['2', String(SiteTypeEnum.ES_CS)].includes(siteType),
    },
    {
      label: formatMessage({ id: 'device.chargingRevenue', defaultMessage: '充电桩收益' }),
      unit: formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' }),
      value: data?.chargingPileGains ?? '--',
      show: [
        String(SiteTypeEnum.PV_ES_CS),
        String(SiteTypeEnum.ES_CS),
        String(SiteTypeEnum.PV_CS),
        String(SiteTypeEnum.CS),
        '',
      ].includes(siteType),
    },
    {
      label: formatMessage({ id: 'device.selfUseRate', defaultMessage: '自发自用率' }),
      unit: '(%)',
      value: data?.selfUseRate ?? '--',
      show: [
        String(SiteTypeEnum.PV_ES_CS),
        String(SiteTypeEnum.PV_ES),
        String(SiteTypeEnum.PV_CS),
        String(SiteTypeEnum.PV),
        '',
      ].includes(siteType),
    },
    {
      label: formatMessage({ id: 'device.loadSelfRate', defaultMessage: '负载用电自给率' }),
      unit: '(%)',
      value: data?.selfSufficiencyRate ?? '--',
      show: [
        String(SiteTypeEnum.PV_ES_CS),
        String(SiteTypeEnum.PV_ES),
        String(SiteTypeEnum.PV_CS),
        String(SiteTypeEnum.PV),
        '',
      ].includes(siteType),
    },
  ];

  const toggleButton = show ? (
    <Button className="pr0" type="link" onClick={toggle} size={'small'}>
      {formatMessage({ id: 'common.hide', defaultMessage: '隐藏' })}
    </Button>
  ) : (
    <Button className="pr0" type="link" onClick={toggle} size={'small'}>
      {formatMessage({ id: 'common.displayRealTimeInfo', defaultMessage: '显示实时信息' })}
    </Button>
  );

  return (
    <div className={styles.realTimeData}>
      <div className={classNames(styles.realContent)}>
        <div className="flex flex-justify-end mb16">
          {show && <TimeButtonGroup onChange={setTimeType} />}
          <div className={styles.realBtn}>{toggleButton}</div>
        </div>
        {show && (
          <Row gutter={[16, 16]} justify="end">
            {columns.map((row) => {
              return row.show ? (
                <Col key={row.label} span={4} xxl={12}>
                  <Statistic
                    className={styles.boxContent}
                    precision={2}
                    title={<Detail.DotLabel title={row.label + row.unit} />}
                    value={row.value}
                    valueStyle={{
                      fontWeight: 600,
                      color: '#1D2129',
                      fontSize: 18,
                    }}
                  />
                </Col>
              ) : (
                ''
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Income;
