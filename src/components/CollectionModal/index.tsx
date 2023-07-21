/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-15 14:50:06
 * @LastEditTime: 2023-07-20 19:31:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\CollectionModal\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, ModalProps, Skeleton } from 'antd';
import { ProFormColumnsType } from '@ant-design/pro-form';
import { getCollectionData, CollectionSearchType } from '@/services/data';
import { useRequest } from 'umi';
import LineChart from '@/components/Chart/LineChart';
import { chartTypeEnum } from '@/components/Chart';
import moment, { Moment } from 'moment';
import SchemaForm from '@/components/SchamaForm';
import { ProFormInstance } from '@ant-design/pro-components';
import { Slider } from 'bizcharts';

type Searchtype = CollectionSearchType & {
  date: string[];
};

export type CollectionModalProps = Omit<ModalProps, 'title'> & {
  title: string;
  deviceId: string;
  keys: string[];
};

type ChartDataType = {
  collection: {
    time: string;
    value?: number;
  }[];
};

const CollectionModal: React.FC<CollectionModalProps> = (props) => {
  const { deviceId, keys, title, open, ...restProps } = props;

  const formRef = useRef<ProFormInstance>(null);
  const [chartData, setChartData] = useState<ChartDataType>({
    collection: [],
  });
  const [chartType, setChartType] = useState<chartTypeEnum>(chartTypeEnum.Day);
  const { run } = useRequest(getCollectionData, {
    manual: true,
  });

  const legendMap = useMemo(() => {
    return new Map([['collection', title]]);
  }, [title]);

  const allLabel = useMemo(() => {
    return chartData?.collection?.map?.((item) => item.time);
  }, [chartData]);

  const onFinish = useCallback(
    (formData: Searchtype) => {
      if (keys && keys.length) {
        return run({
          devices: [{ deviceId, keys }],
          startTime: formData.date[0] + ' 00:00:00',
          endTime: formData.date[1] + ' 23:59:59',
          pageNum: 1,
          pageSize: 2147483647,
        }).then((data) => {
          if (
            moment(formData.date[0]).format('YYYY-MM-DD') ==
            moment(formData.date[1]).format('YYYY-MM-DD')
          ) {
            setChartType(chartTypeEnum.Day);
          } else {
            setChartType(chartTypeEnum.Label);
          }
          const result: ChartDataType = {
            collection: [],
          };
          data?.details?.forEach((device) => {
            device?.data?.forEach((row) => {
              row?.collection?.forEach((collection) => {
                result.collection.push({
                  time: collection?.eventTs || '',
                  value: collection?.doubleVal,
                });
              });
            });
          });
          setChartData(result);
          return true;
        });
      } else {
        return Promise.resolve(true);
      }
    },
    [deviceId, keys],
  );

  const labelFormatter = useCallback(
    (value) => {
      if (chartType == chartTypeEnum.Label) {
        return moment(value).format('YYYY-MM-DD HH:mm');
      } else {
        return value;
      }
    },
    [chartType],
  );

  useEffect(() => {
    if (open && deviceId) {
      formRef?.current?.submit?.();
    }
  }, [deviceId, keys, open]);

  const searchColumns = useMemo<ProFormColumnsType<Searchtype>[]>(() => {
    return [
      {
        title: '选择日期',
        dataIndex: 'date',
        valueType: 'dateRange',
        formItemProps: {
          rules: [{ required: true }],
        },
      },
    ];
  }, []);

  return (
    <>
      <Modal width="1000px" footer={false} title={title} open={open} centered {...restProps}>
        <SchemaForm<Searchtype>
          className="p0 mb24"
          formRef={formRef}
          columns={searchColumns}
          layout="inline"
          layoutType="QueryFilter"
          onFinish={onFinish}
          initialValues={{
            date: [moment(), moment()],
          }}
        />
        <LineChart
          valueTitle=""
          height={340}
          type={chartType}
          date={moment()}
          legendMap={legendMap}
          labelKey="time"
          valueKey="value"
          data={chartData}
          allLabel={allLabel}
          labelFormatter={labelFormatter}
        >
          <Slider start={0} end={1} minLimit={0.2} />
        </LineChart>
      </Modal>
    </>
  );
};

export default CollectionModal;
