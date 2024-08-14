import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getData, exportList } from './service';
import { Row, Col, Card, Button } from 'antd';
import {
  pieConfig,
  alarmTitle,
  filterColumns,
  columns,
  alarmMap,
  barConfig,
  statisticsVOHandler,
} from './config';
import Chart from '@/components/Chart/index';
import TypeChart from '@/components/Chart/TypeChart';
import { useSiteColumn } from '@/hooks';
import { formatMessage } from '@/utils';
import { chartTypeEnum } from '@/components/Chart/config';
import type { ProFormInstance } from '@ant-design/pro-components';
import type { PieDataType, SiteDataType, FrequencyVOList } from './config';
import styles from './index.less';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import YTProTable from '@/components/YTProTable';
import type { TypeChartDataType } from '@/components/Chart/TypeChart';
import { saveFile } from '@/utils';

const SingleSite: React.FC = () => {
  const formRef = useRef<ProFormInstance>(null);
  const [allLabel, setAllLabel] = useState<string[]>([]);
  const [barData, setBarData] = useState<TypeChartDataType[]>();
  const [overviewOption, setOverviewOption] = useState(pieConfig([], alarmTitle));
  const [deviceOption, setDeviceOption] = useState(barConfig());
  const [rankeData, setRankData] = useState<FrequencyVOList[]>([]);
  const [data, setData] = useState<SiteDataType>();

  const [siteSearchColumn] = useSiteColumn({
    hideInTable: true,
    formItemProps: {
      name: 'siteId',
      rules: [{ required: true }],
    },
  });

  useEffect(() => {
    if (data) {
      const pieData: PieDataType[] = [];
      const piecolors: string[] = [];

      const alarmingData: { label: string; value: number }[] = [];
      const eliminatedData: { label: string; value: number }[] = [];

      const { alarmStatisticsVO, alarmDistributionVOList, alarmFrequencyVOList } = data;
      const curAlarmStatisticsVO = statisticsVOHandler(alarmStatisticsVO);
      //告警统计
      alarmMap.forEach((i, key) => {
        const currentObj = curAlarmStatisticsVO[key];
        pieData.push({
          name: i.name,
          value: currentObj?.num,
          percent: currentObj.proportion + '%',
          text: `${formatMessage({ id: 'common.alarming', defaultMessage: '告警中' })}：${
            currentObj.inProgressNum
          }`,
        });
        piecolors.push(i.color);
      });
      alarmTitle.text = alarmStatisticsVO.total || 0;
      setOverviewOption(pieConfig(pieData, alarmTitle, piecolors));
      //设备分布
      alarmDistributionVOList.forEach((i) => {
        alarmingData.push({
          label: i.productTypeName,
          value: i.notEliminatedNum,
        });
        eliminatedData.push({
          label: i.productTypeName,
          value: i.eliminatedNum,
        });
      });

      const curBarData: TypeChartDataType[] = [
        {
          name: formatMessage({ id: 'common.alarming', defaultMessage: '告警中' }),
          type: 'bar',
          color: '#3DD598',
          data: alarmingData,
        },
        {
          name: formatMessage({ id: 'common.eliminated', defaultMessage: '已消除' }),
          type: 'bar',
          color: '#007DFF',
          data: eliminatedData,
        },
      ];
      setBarData(curBarData);
      setDeviceOption(barConfig(curBarData));
      setAllLabel(alarmingData.map((i) => i.label));

      //告警次数

      setRankData(alarmFrequencyVOList);
    }
  }, [data]);

  const beforeSubmit = useCallback((params) => {
    params.startDate = params.time[0];
    params.endDate = params.time[1];
    delete params.time;
  }, []);

  const requestExport = useCallback(() => {
    formRef.current
      ?.validateFields()
      ?.then((params) => {
        exportList({
          startDate: params.time?.[0]?.format?.('YYYY-MM-DD'),
          endDate: params.time?.[1]?.format?.('YYYY-MM-DD'),
          siteId: params.siteId,
        }).then((res: any) => {
          console.log('res>>', res);
          saveFile(res, formatMessage({ id: 'alarmManage.1008', defaultMessage: '告警次数' }));
        });
      })
      .catch();
  }, []);

  return (
    <>
      <SchemaForm
        formRef={formRef}
        className={styles.form}
        type={FormTypeEnum.Add}
        addData={getData}
        beforeSubmit={beforeSubmit}
        afterRequest={setData}
        layoutType="QueryFilter"
        columns={filterColumns(siteSearchColumn as any)}
      />
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <div className={styles.head}>
              {formatMessage({ id: 'alarmManage.1005', defaultMessage: '告警统计' })}
            </div>
            <Chart height={310} option={overviewOption} calculateMax={false} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <div className={styles.head}>
              {formatMessage({ id: 'alarmManage.1006', defaultMessage: '设备分布' })}
            </div>
            <TypeChart
              style={{ height: '310px' }}
              option={deviceOption}
              type={chartTypeEnum.Label}
              allLabel={allLabel}
              data={barData}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ height: '100%' }}>
            <div className={styles.head}>
              <div>
                {formatMessage({ id: 'alarmManage.1008', defaultMessage: '告警次数' })}（TOP5）
              </div>
              <Button type="link" onClick={requestExport}>
                {formatMessage({ id: 'common.download', defaultMessage: '下载' })}
              </Button>
            </div>
            <YTProTable
              className={styles.rank_table}
              dataSource={rankeData}
              columns={columns}
              search={false}
              scroll={{ x: true, y: undefined }}
              toolBarRender={false}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SingleSite;
