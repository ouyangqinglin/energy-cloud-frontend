import { get as requestGet, post as requestPost } from '@/utils/request';
import type { ProTableProps } from '@ant-design/pro-components';
import { get, isEmpty } from 'lodash';
import type { EmitType, YTProColumns, YTProTableCustomProps } from './typing';

export const normalizeRequestOption = <D, V>(
  columns: YTProColumns<D & EmitType, V>[] | undefined,
  onEvent: YTProTableCustomProps<D, V>['onEvent'],
) => {
  if (!Array.isArray(columns) || !columns.length) {
    return [];
  }

  let hasEmptyWidth = false;

  const result = columns.map((col) => {
    if (!col.width) {
      hasEmptyWidth = true;
    }
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
    if (col.renderWithEmit) {
      col.render = (...params) => {
        params[1].emit = (...emitParams) => {
          onEvent?.(...emitParams);
        };
        return col?.renderWithEmit?.(...params);
      };
    }
    return col;
  });

  if (!hasEmptyWidth) {
    // delete result[result.length - 1].width;
  }
  return result;
};

export const standardRequestTableData = <D, P>(
  request?: YTProTableCustomProps<D, P>['request'],
) => {
  if (!request) {
    return;
  }
  const simpleRequest: ProTableProps<D, P>['request'] = async (...props) => {
    if (props[1]) {
      const sortParams = props[1] || {};
      const searchParams: any = { ...props[0], sortMode: {} };
      Object.entries(sortParams)?.forEach?.(([key, value]) => {
        searchParams.sortMode[key] = value == 'ascend' ? 0 : 1;
      });
      props[0] = searchParams;
    }
    const { data } = await request(...props);
    return {
      data: data?.list,
      total: data?.total,
    };
  };
  return simpleRequest;
};

export const calculateColumns = <D, P>(
  columns: YTProColumns<D, P>[],
  contain: React.MutableRefObject<HTMLDivElement | undefined>,
) => {
  const cols = contain?.current
    ?.querySelector?.('table:first-child')
    ?.querySelectorAll?.('col:not(.ant-table-selection-col):not(.ant-table-expand-icon-col)');

  let effectColumnIndex = 0;
  let lastNotFixedColumnIndex = 0;
  let hasEmptyWidth = false;
  columns?.forEach?.((item, index) => {
    if (!item.hideInTable) {
      if (item.width) {
        const width = (cols?.[effectColumnIndex] as HTMLTableColElement)?.style?.width;
        item.width = width && parseInt(width);
      } else {
        hasEmptyWidth = true;
      }
      effectColumnIndex++;
      if (!item.fixed) {
        lastNotFixedColumnIndex = index;
      }
    }
  });

  if (!hasEmptyWidth) {
    delete columns[lastNotFixedColumnIndex].width;
  }
};
