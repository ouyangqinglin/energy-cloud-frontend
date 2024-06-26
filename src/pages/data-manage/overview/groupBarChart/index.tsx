import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getData, getDeviceData, getAlarmData } from './service';
import { Row, Col, Card, Descriptions, Badge } from 'antd';
import {
  barConfig,
  siteMap,
  deviceMap,
  alarmMap,
  siteTitle,
  deviceTitle,
  alarmTitle,
} from './config';
import Chart from '@/components/Chart/index';
import { formatMessage } from '@/utils';
import type { SiteDataType, DeviceDataType, AlarmDataType, PieDataType } from './config';
import styles from './index.less';

type GroupBarChartProps = {
  date: string[];
};

const GroupBarChart: React.FC<GroupBarChartProps> = (props) => {
  const { date } = props;
  const [siteOption, setSiteOption] = useState(barConfig([], siteTitle));
  const [deviceOption, setDeviception] = useState(barConfig([], deviceTitle));
  const [alarmOption, setAlarmOption] = useState(barConfig([], alarmTitle));

  const { data, run } = useRequest(getData, {
    manual: true,
  }) as { data: SiteDataType; run: (params: any) => Promise<unknown> };

  const { data: deviceData, run: runFordeviceData } = useRequest(getDeviceData, {
    manual: true,
  }) as { data: DeviceDataType; run: (params: any) => Promise<unknown> };

  const { data: alarmData, run: runForAlarmData } = useRequest(getAlarmData, {
    manual: true,
  }) as { data: AlarmDataType; run: (params: any) => Promise<unknown> };

  useEffect(() => {
    const [startTime, endTime] = date;
    if (!startTime || !endTime) return;
    run({ startTime, endTime });
    runFordeviceData({ startTime, endTime });
    runForAlarmData({ startTime, endTime });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    if (data) {
      const pieData: PieDataType[] = [];
      const colors: string[] = [];
      const { totalSiteCount, siteTypeGroupCount } = data;
      siteMap.forEach((i, key) => {
        const currentObj = siteTypeGroupCount[key];
        pieData.push({
          name: i.name,
          value: currentObj?.count,
          percent: currentObj.percent + '%',
          text: `${formatMessage({ id: 'dataManage.1034', defaultMessage: '告警' })}：${
            currentObj.alarmCount
          }`,
        });
        colors.push(i.color);
      });
      siteTitle.text = totalSiteCount || 0;
      setSiteOption(barConfig(pieData, siteTitle, colors));
    }
  }, [data]);
  useEffect(() => {
    if (deviceData) {
      const pieData: PieDataType[] = [];
      const colors: string[] = [];
      const { totalCount, map } = deviceData;
      deviceMap.forEach((i, key) => {
        const currentObj = map[key];
        pieData.push({
          name: i.name,
          value: currentObj.total,
          percent: currentObj.percent + '%',
          text: `${formatMessage({ id: 'dataManage.1036', defaultMessage: '离线' })}：${
            currentObj.offlineCount
          }`,
        });
        colors.push(i.color);
      });
      deviceTitle.text = totalCount || 0;
      setDeviception(barConfig(pieData, deviceTitle, colors));
    }
  }, [deviceData]);

  useEffect(() => {
    if (alarmData) {
      const pieData: PieDataType[] = [];
      const colors: string[] = [];
      const { totalCount, map } = alarmData;
      alarmMap.forEach((i, key) => {
        const currentObj = map[key];
        pieData.push({
          name: i.name,
          value: currentObj.total,
          percent: currentObj.percent + '%',
          text: `${formatMessage({ id: 'common.alarming', defaultMessage: '告警中' })}：${
            currentObj.alarm
          }`,
        });
        colors.push(i.color);
      });
      alarmTitle.text = totalCount || 0;
      setAlarmOption(barConfig(pieData, alarmTitle, colors));
    }
  }, [alarmData]);

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <div className={styles.head}>
              <Descriptions column={4}>
                <Descriptions.Item
                  label={formatMessage({ id: 'dataManage.1041', defaultMessage: '已投运' })}
                >
                  {data?.commissioningCount || '--'}
                </Descriptions.Item>
                <Descriptions.Item
                  label={formatMessage({ id: 'dataManage.1042', defaultMessage: '建设中' })}
                >
                  {data?.constructCount || '--'}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Badge
                      status="success"
                      text={formatMessage({ id: 'dataManage.1033', defaultMessage: '正常' })}
                    />
                  }
                >
                  {data?.normalSiteCount || '--'}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Badge
                      status="error"
                      text={formatMessage({ id: 'dataManage.1034', defaultMessage: '告警' })}
                    />
                  }
                >
                  {data?.alarmSiteCount || '--'}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <Chart height={250} option={siteOption} calculateMax={false} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div className={styles.head}>
              <Descriptions column={4}>
                <Descriptions.Item
                  label={formatMessage({ id: 'dataManage.1043', defaultMessage: '已安装' })}
                >
                  {deviceData?.installCount || '--'}
                </Descriptions.Item>
                <Descriptions.Item
                  label={formatMessage({ id: 'dataManage.1044', defaultMessage: '未安装' })}
                >
                  {deviceData?.noInstallCount || '--'}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Badge
                      status="success"
                      text={formatMessage({ id: 'dataManage.1035', defaultMessage: '在线' })}
                    />
                  }
                >
                  {deviceData?.onlineCount || '--'}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Badge
                      status="error"
                      text={formatMessage({ id: 'dataManage.1036', defaultMessage: '离线' })}
                    />
                  }
                >
                  {deviceData?.offlineCount || '--'}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <Chart height={250} option={deviceOption} calculateMax={false} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div className={styles.head} style={{ width: '40%' }}>
              <Descriptions column={2}>
                <Descriptions.Item
                  label={formatMessage({ id: 'dataManage.generate', defaultMessage: '告警中' })}
                >
                  {alarmData?.alarmCount || '--'}
                </Descriptions.Item>
                <Descriptions.Item
                  label={formatMessage({ id: 'dataManage.eliminate', defaultMessage: '已消除' })}
                >
                  {alarmData?.eliminatedCount || '--'}
                </Descriptions.Item>
              </Descriptions>
            </div>
            <Chart height={250} option={alarmOption} calculateMax={false} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default GroupBarChart;
