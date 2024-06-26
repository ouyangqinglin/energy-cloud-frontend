import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { getData, getDeviceData, getAlarmData } from './service';
import { Row, Col, Card } from 'antd';
import { barConfig, siteMap, deviceMap, alarmMap } from './config';
import Chart from '@/components/Chart/index';
import { formatMessage } from '@/utils';

const siteTitle = {
  text: 0,
  subtext: formatMessage({ id: 'dataManage.1020', defaultMessage: '站点总数' }),
};
const deviceTitle = {
  text: 0,
  subtext: formatMessage({ id: 'dataManage.1021', defaultMessage: '设备总数' }),
};
const alarmTitle = {
  text: 0,
  subtext: formatMessage({ id: 'dataManage.1022', defaultMessage: '告警总数' }),
};

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
  });
  const { data: deviceData, run: runFordeviceData } = useRequest(getDeviceData, {
    manual: true,
  });
  const { data: alarmData, run: runForAlarmData } = useRequest(getAlarmData, {
    manual: true,
  });

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
      const currentData: any = [];
      const colors: any = [];
      const { totalSiteCount, siteTypeGroupCount } = data as any;
      siteMap.forEach((i, key) => {
        const currentObj = siteTypeGroupCount[key];
        currentData.push({
          name: i.name,
          value: currentObj?.count,
          color: i.color,
          text1: `${i.name}：${formatMessage({ id: 'dataManage.1032', defaultMessage: '总数' })}：${
            currentObj?.count
          }（${currentObj.percent}%）`,
          text2: `${formatMessage({ id: 'dataManage.1033', defaultMessage: '正常' })}：${
            currentObj.normalCount
          } ${formatMessage({ id: 'dataManage.1034', defaultMessage: '告警' })}：${
            currentObj.normalCount
          }`,
        });
        colors.push(i.color);
      });
      siteTitle.text = totalSiteCount;
      setSiteOption(barConfig(currentData, siteTitle, colors));
    }

    if (deviceData) {
      const currentData: any = [];
      const colors: any = [];
      const { totalCount, map } = deviceData as any;
      deviceMap.forEach((i, key) => {
        const currentObj = map[key];
        currentData.push({
          name: i.name,
          value: currentObj.total,
          text1: `${i.name}：${formatMessage({ id: 'dataManage.1032', defaultMessage: '总数' })}：${
            currentObj?.total
          }（${currentObj.percent}%）`,
          text2: `${formatMessage({ id: 'dataManage.1035', defaultMessage: '在线' })}：${
            currentObj.onlineCount
          } ${formatMessage({ id: 'dataManage.1036', defaultMessage: '离线' })}：${
            currentObj.offlineCount
          }`,
        });
        colors.push(i.color);
      });
      deviceTitle.text = totalCount;
      setDeviception(barConfig(currentData, deviceTitle, colors));
    }

    if (alarmData) {
      const colors: any = [];
      const currentData: any = [];
      const { totalCount, map } = alarmData as any;
      alarmMap.forEach((i, key) => {
        const currentObj = map[key];
        currentData.push({
          name: i.name,
          value: currentObj.total,
          text1: `${i.name}：${formatMessage({ id: 'dataManage.1032', defaultMessage: '总数' })}：${
            currentObj?.total
          }（${currentObj.percent}%）`,
          text2: `${formatMessage({ id: 'common.alarming', defaultMessage: '告警中' })}：${
            currentObj.alarm
          } ${formatMessage({ id: 'common.eliminated', defaultMessage: '已消除' })}：${
            currentObj.eliminated
          }`,
        });
        colors.push(i.color);
      });
      alarmTitle.text = totalCount;
      setAlarmOption(barConfig(currentData, alarmTitle, colors));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, deviceData, alarmData]);
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <div>{`已投运：${data?.commissioningCount || '--'} 建设中：${
              data?.constructCount || '--'
            } 正常：${data?.normalSiteCount || '--'} 告警：${data?.alarmSiteCount || '--'}`}</div>
            <Chart height={250} option={siteOption} calculateMax={false} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div>{`已安装：${deviceData?.installCount || '--'} 未安装：${
              deviceData?.noInstallCount || '--'
            } 在线：${deviceData?.onlineCount || '--'} 离线：${
              deviceData?.offlineCount || '--'
            }`}</div>
            <Chart height={250} option={deviceOption} calculateMax={false} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div>{`告警中：${alarmData?.alarmCount || '--'} 已消除：${
              alarmData?.eliminatedCount || '--'
            }`}</div>
            <Chart height={250} option={alarmOption} calculateMax={false} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default GroupBarChart;
