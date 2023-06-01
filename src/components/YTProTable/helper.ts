import { get as requestGet, post as requestPost } from '@/utils/request';
import type { ProTableProps } from '@ant-design/pro-components';
import { get, isEmpty } from 'lodash';
import type { YTProColumns, YTProTableCustomProps } from './typing';

export const normalizeRequestOption = <D, V>(columns: YTProColumns<D, V>[] | undefined) => {
  if (!Array.isArray(columns) || !columns.length) {
    return [];
  }

  return columns.map((col) => {
    if (!isEmpty(col.requestOption) && !col.request) {
      const {
        url,
        mapKey = { label: '', value: '' },
        dataIndex = '',
        methods = 'get',
      } = col.requestOption;
      const request = methods === 'get' ? requestGet : requestPost;
      col.request = async (params) => {
        try {
          const { data } = await request(url, params);
          let rawData: Record<string, string>[] = [];
          if (dataIndex) {
            rawData = get(data, dataIndex);
          }

          if (isEmpty(rawData)) {
            throw new Error('path解析失败 或 返回数据为空');
          }

          if (!Array.isArray(rawData)) {
            rawData = [rawData];
          }

          return rawData.map((item) => {
            return {
              label: item[mapKey.label],
              value: item[mapKey.value],
            };
          });
        } catch (error) {
          console.log('[YTProTable]: 请求数据解析异常 ', error);
          return [];
        }
      };
    }

    return col;
  });
};

export const standardRequestTableData = <D, P>(
  request?: YTProTableCustomProps<D, P>['request'],
) => {
  if (!request) {
    return;
  }
  const simpleRequest: ProTableProps<D, P>['request'] = async (...props) => {
    const { data } = await request(...props);
    return {
      data: data?.list,
      total: data?.total,
    };
  };
  return simpleRequest;
};
