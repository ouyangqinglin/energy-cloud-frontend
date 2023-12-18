import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { useToggle } from 'ahooks';
import { Button, Col, Radio, Row, Statistic } from 'antd';
import classNames from 'classnames';
import { isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import TimeButtonGroup, { TimeType } from '../../components/TimeButtonGroup';
import { getPVRevenue } from '../service';
import styles from './index.less';
import Detail from '@/components/Detail';
import { formatMessage } from '@/utils';

const RealTimeData = ({ siteId }: { siteId?: number }) => {
  const { data, run } = useRequest(getPVRevenue, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });
  const [timeType, setTimeType] = useState(TimeType.DAY);

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
    },
    {
      label: formatMessage({ id: 'device.pvRevenue', defaultMessage: '光伏收益' }),
      unit: formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' }),
      value: data?.photovoltaicGains ?? '--',
    },
    {
      label: formatMessage({ id: 'device.storageRevenue', defaultMessage: '储能收益' }),
      unit: formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' }),
      value: data?.essGains ?? '--',
    },
    {
      label: formatMessage({ id: 'device.chargingRevenue', defaultMessage: '充电桩收益' }),
      unit: formatMessage({ id: 'device.unitRevenue', defaultMessage: '(元)' }),
      value: data?.chargingPileGains ?? '--',
    },
    {
      label: formatMessage({ id: 'device.selfUseRate', defaultMessage: '自发自用率' }),
      unit: '(%)',
      value: data?.selfUseRate ?? '--',
    },
    {
      label: formatMessage({ id: 'device.loadSelfRate', defaultMessage: '负载用电自给率' }),
      unit: '(%)',
      value: data?.selfSufficiencyRate ?? '--',
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
          <Row gutter={[16, 16]}>
            {columns.map((row) => {
              return (
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
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
};

export default RealTimeData;
