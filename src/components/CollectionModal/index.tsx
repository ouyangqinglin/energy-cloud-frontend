/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-15 14:50:06
 * @LastEditTime: 2023-08-04 15:32:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\CollectionModal\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, ModalProps } from 'antd';
import { ProFormColumnsType } from '@ant-design/pro-components';
import { getCollectionData, CollectionSearchType } from '@/services/data';
import { useRequest } from 'umi';
import TypeChart, { TypeChartDataType } from '../Chart/TypeChart';
import { chartTypeEnum } from '@/components/Chart/config';
import moment from 'moment';
import SchemaForm from '@/components/SchamaForm';
import { ProFormInstance } from '@ant-design/pro-components';
import EChartsReact from 'echarts-for-react';
import { DeviceModelType } from '@/types/device';
import { DeviceModelTypeEnum } from '@/utils/dictionary';

type Searchtype = CollectionSearchType & {
  date: string[];
};

export type CollectionModalProps = Omit<ModalProps, 'title'> & {
  title: string;
  deviceId: string;
  keys: string[];
  model?: DeviceModelType;
};

const CollectionModal: React.FC<CollectionModalProps> = (props) => {
  const { deviceId, keys, model, title, open, ...restProps } = props;

  const formRef = useRef<ProFormInstance>(null);
  const chartRef = useRef<EChartsReact>(null);
  const [chartData, setChartData] = useState<TypeChartDataType[]>();
  const [chartType, setChartType] = useState<chartTypeEnum>(chartTypeEnum.Day);
  const { run } = useRequest(getCollectionData, {
    manual: true,
  });

  const modelData = useMemo(() => {
    let enumObj = {},
      enumKeys: string[] = [];
    if (model?.type === DeviceModelTypeEnum.Enum) {
      try {
        enumObj = JSON.parse(model?.specs);
        if (typeof enumObj !== 'object') {
          enumObj = {};
        }
      } catch {
        enumObj = {};
      }
      enumKeys = ['wahaha'].concat(Object.keys(enumObj));
    }
    return {
      type: model?.type,
      keys: enumKeys,
      data: enumObj,
    };
  }, [model]);

  const chartOption = useMemo(() => {
    return {
      grid: {
        top: 10,
        bottom: 50,
        right: 35,
      },
      legend: {
        show: false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const { value, name } = (params || [{}])[0];
          const result = [name];
          result.push(title + '：' + (modelData.data[modelData.keys[value[1]]] || '-'));
          return result.join('<br/>');
        },
      },
      xAxis: {
        axisLabel: {
          formatter: (value: string) => {
            return value.replace(' ', '\n');
          },
        },
      },
      yAxis:
        modelData.type === DeviceModelTypeEnum.Enum
          ? {
              interval: 1,
              axisLabel: {
                formatter: (value: string) => {
                  return modelData.data?.[modelData.keys[value]] || '';
                },
              },
            }
          : {},
      dataZoom: [
        {
          type: 'inside',
          realtime: false,
        },
        {
          start: 0,
          end: 100,
          height: 15,
          realtime: false,
        },
      ],
      series: [
        {
          type: 'line',
          showAllSymbol: true,
          symbolSize: 1,
          large: true,
          sampling: 'average',
        },
      ],
    };
  }, [title, modelData]);

  const allLabel = useMemo(() => {
    return chartData?.[0]?.data?.map?.((item) => item.label);
  }, [chartData]);

  const onFinish = useCallback(
    (formData: Searchtype) => {
      if (keys && keys.length) {
        return run({
          devices: [{ deviceId, keys }],
          startTime: formData.date[0] + ' 00:00:00',
          endTime: formData.date[1] + ' 23:59:59',
          current: 1,
          pageSize: 2147483647,
        }).then((data) => {
          if (
            moment(formData.date[0]).format('YYYY-MM-DD') ==
            moment(formData.date[1]).format('YYYY-MM-DD')
          ) {
            setChartType(chartTypeEnum.Day);
            const result: TypeChartDataType = {
              name: title,
              data: [],
            };
            data?.details?.forEach((device) => {
              device?.data?.forEach((row) => {
                row?.collection?.forEach((collection) => {
                  if (modelData.type == DeviceModelTypeEnum.Enum) {
                    const index = modelData.keys.findIndex(
                      (item) => item == (collection?.value as any),
                    );
                    result?.data?.push?.({
                      label: row?.time || '',
                      value: index,
                    });
                  } else {
                    result?.data?.push?.({
                      label: row?.time || '',
                      value: collection?.value,
                    });
                  }
                });
              });
            });
            setChartData([result]);
          } else {
            setChartType(chartTypeEnum.Label);
            const resultData = {
              dataset: {
                source: [['product', title]],
              },
            };
            data?.details?.forEach((device) => {
              device?.data?.forEach((row) => {
                row?.collection?.forEach((collection) => {
                  if (modelData.type == DeviceModelTypeEnum.Enum) {
                    const index = modelData.keys.findIndex(
                      (item) => item == (collection?.value as any),
                    );
                    resultData.dataset.source.push([row?.time || '', index as any]);
                  } else {
                    resultData.dataset.source.push([row?.time || '', collection?.value as any]);
                  }
                });
              });
            });
            setTimeout(() => {
              chartRef?.current?.getEchartsInstance().setOption(resultData);
            }, 300);
          }
          return true;
        });
      } else {
        return Promise.resolve(true);
      }
    },
    [deviceId, keys, modelData],
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
        initialValue: [moment(), moment()],
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
        />
        <TypeChart
          chartRef={chartRef}
          type={chartType}
          option={chartOption}
          style={{ height: 400 }}
          data={chartData}
          allLabel={allLabel}
          max={modelData.type == DeviceModelTypeEnum.Enum ? modelData.keys.length - 1 : 0}
        />
      </Modal>
    </>
  );
};

export default CollectionModal;
